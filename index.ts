import "dotenv/config"
import express from "express"
import 'express-async-errors';
import {appRouter} from "./src/router";
import {errorHandler} from "./src/middleware/error-handler.middleware.ts";

const app = express();
const port = 3000

app.use(express.json());
app.use('/api', appRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})