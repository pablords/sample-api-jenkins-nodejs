import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes';
import { version } from '../package.json'


import { Webhooks, createNodeMiddleware } from '@octokit/webhooks'
import http from "http"


const webhooks = new Webhooks({
    secret: "1q2w3e4r"
});

webhooks.onAny(({ id, name, payload }) => {
    console.log(name, "event received");
});

http.createServer(createNodeMiddleware(webhooks)).listen(3001);


const app = express();
app.use(cors())
app.use(express.json());




app.use(`/v${version.substring(0, 1)}`, router);

const { APP_HOST, APP_PORT } = process.env;
app.listen(APP_PORT, () => {
    console.log(`Server start in ${APP_HOST}:${APP_PORT}/v${version.substring(0, 1)}`);
});
