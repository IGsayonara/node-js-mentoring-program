const childProcess = require('child_process');
const fs = require('fs');

const state = {lastFetchedData: null}

function formatData(data) {
    return data
        .replaceAll('\n', ' ')
        .replaceAll('\r', ' ')
        .replaceAll('  ', ' ')
}

function execProcess(commands) {
    return commands.map((command) => {
        return new Promise((resolve, reject) => {
            childProcess.exec(command, (error, stdout, stderr) => {
                if (error) reject({error, stderr});

                resolve(stdout)
            });
        })
    })
}

function getSystemInsightsCommands() {
    const windowsCommands = ['powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"'];
    const unixCommands = [`ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`]

    return process.platform === 'win32' ? windowsCommands : unixCommands;
}

async function fetchDataFromSystem() {
    const fetchedData = await Promise.all(execProcess(getSystemInsightsCommands()))
        .catch(({error, stderr}) => {
            console.error(error, stderr);
            process.exit(500);
        });
    state.lastFetchedData = formatData(fetchedData.join(' '));

    setTimeout(fetchDataFromSystem, 100);
}

const printToConsole = async () => {
    process.stdout.write('\r');
    process.stdout.write(state.lastFetchedData);

    setTimeout(printToConsole, 100);
}

const printToFile = async () => {
    const logData = `${new Date()} : ${state.lastFetchedData} \n`;
    await fs.appendFileSync('activityMonitor.log', logData)

    setTimeout(printToFile, 60000);
}

async function main() {
    await fetchDataFromSystem();
    printToConsole().catch((err)=> {
        console.error('something wrong with printToConsole', err);
        process.exit(500);
    });
    printToFile().catch((err)=> {
        console.error('something wrong with printToFile', err);
        process.exit(500);
    });
}

main();
