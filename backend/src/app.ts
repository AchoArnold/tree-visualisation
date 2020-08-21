import express from 'express'


const app = express();
const port = process.env.PORT || "8000";


/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
});


/**
 * Server Activation
 */

app.listen(port, () => {
    const val:number = 1+2
});