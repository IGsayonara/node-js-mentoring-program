import express from "express"
import {appRouter} from "./src/router";

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', appRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})