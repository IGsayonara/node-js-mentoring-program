import {mainController} from "./src/controllers/main.controller.ts";
const http = require('http');

const server = http.createServer(async (req, res) => {
    await mainController.execute(req, res);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
