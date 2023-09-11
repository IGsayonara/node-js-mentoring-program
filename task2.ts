import * as fs from "fs";
import * as readline from "readline";
import {Converter} from "csvtojson/v2/Converter";

const csv = require('csvtojson');

const state: {converter: Converter | null} = {converter: null}

const rl = readline.createInterface(
    {
        input: fs.createReadStream('./csvdirectory/nodejs-hw1-ex1.csv'),
    }
)

const ws = fs.createWriteStream('./output.txt');


const lineByLine = async () => {
    let lineIndex = 0;
    let headers = null;
    for await (const line of rl) {
        if (lineIndex === 0) {
            headers = line.split(',');
            lineIndex++;
            continue;
        }
        const converter: Converter = csv({noheader: true, headers});
        converter.fromString(line).then((lines) => {
            const output = JSON.stringify(lines[0]);
            ws.write(output + '\n');
        });
        lineIndex++;
    }
}

lineByLine();