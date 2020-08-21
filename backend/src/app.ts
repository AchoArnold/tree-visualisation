import express from 'express'
import {Container} from './Container/Container'

const app = express();
const port = process.env.PORT || "8000";
const container = new Container();

/**
 * Routes Definitions
 */
app.get("/", container.ItemsController().index());


/**
 * Server Activation
 */
app.listen(port, () => {
    const val:number = 1+2
});