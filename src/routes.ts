import express, { Response, Request } from 'express';
import jenkins from './config/jenkinsConfig'
import JobController from "./controllers/JobController"


export const router = express.Router();

router.get('/', (_: Request, res: Response) => res.send({ message: 'jenkins-api is running' }))


router.get('/info', (_: Request, res: Response) => {
    jenkins.info(function (err, data) {
        if (err) return res.status(500)
        return res.send(data)
    });
})


router.get('/jobs', JobController.getAllJobs)
router.post('/jobs/start', JobController.jobStart)
router.get('/jobs/config/:name', JobController.getJobConfigXml)
router.post('/jobs/update', JobController.updateJob)
router.post('/jobs/create', JobController.creteJob)
router.get('/jobs/:name', JobController.findJob)
router.delete('/jobs/delete/:name', JobController.deleteJob)