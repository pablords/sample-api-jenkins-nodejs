import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes';
import { version } from '../package.json'


const app = express();
app.use(cors())
app.use(express.json());




app.use(`/v${version.substring(0, 1)}`, router);

const { APP_HOST, APP_PORT } = process.env;
app.listen(APP_PORT, () => {
    console.log(`Server start in ${APP_HOST}:${APP_PORT}/v${version.substring(0, 1)}`);
});
