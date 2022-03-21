import jenkins from "../config/jenkinsConfig"
import { Response, Request } from 'express';
import xmljs from "xml2js"
import jobJson from "../../jobs-json/job.json"
import fs from "fs"



class JobController {

  async getAllJobs(_, res: Response) {
    jenkins.job.list(function (err, data) {
      if (err) return res.send(400)
      return res.send(data)
    });
  }

  async jobStart(req: Request, res: Response) {
    jenkins.job.build({ name: req.body.name }, function (err, data) {
      if (err) return res.send(400)
      return res.send(200)
    })
  }

  async getJobConfigXml(req: Request, res: Response) {
    jenkins.job.config(req.params.name, function (err, data) {
      if (err) return res.send(400)
      xmljs.parseString(data, { mergeAttrs: false }, (err, result) => {
        if (err) return res.send(400)
        const json = JSON.stringify(result, null, 2);
        return res.send(json)
      });
    });
  }

  async updateJob(req: Request, res: Response) {
    // const builder = new xmljs.Builder();
    // const xml = builder.buildObject(jobJson);

    fs.readFile('/Users/pablosantos/nodejs/jenkins-api/jenkinsfile', 'utf8', (err, data) => {
      if (err) return res.send(400)

      const xml = `<?xml version='1.1' encoding='UTF-8'?>
            <flow-definition plugin="workflow-job@1174.vdcb_d054cf74a_">
              <keepDependencies>false</keepDependencies>
              <properties>
                <org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
                  <triggers>
                    <hudson.triggers.TimerTrigger>
                      <spec>@midnight</spec>
                    </hudson.triggers.TimerTrigger>
                  </triggers>
                </org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
              </properties>
              <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition" plugin="workflow-cps@2680.vf642ed4fa_d55">
                <script>${data}</script>
                <sandbox>false</sandbox>
              </definition>
              <triggers />
              <disabled>false</disabled>
            </flow-definition>`

      jenkins.job.config(req.body.name, xml, function (err) {
        if (err) return res.send(400)
        return res.send(200)
      });

    })

  }

  async creteJob(req: Request, res: Response) {

    fs.readFile('/Users/pablosantos/nodejs/jenkins-api/jenkinsfile', 'utf8', (err, data) => {
      if (err) return res.send(400)

      const xml = `<?xml version='1.1' encoding='UTF-8'?>
            <flow-definition plugin="workflow-job@1174.vdcb_d054cf74a_">
              <keepDependencies>false</keepDependencies>
              <properties>
                <org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
                  <triggers>
                    <hudson.triggers.TimerTrigger>
                      <spec>@midnight</spec>
                    </hudson.triggers.TimerTrigger>
                  </triggers>
                </org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
              </properties>
              <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition" plugin="workflow-cps@2680.vf642ed4fa_d55">
                <script>${data}</script>
                <sandbox>false</sandbox>
              </definition>
              <triggers />
              <disabled>false</disabled>
            </flow-definition>`

      jenkins.job.create(req.body.name, xml, function (err) {
        if (err) return res.send(400)
        return res.send(201)
      });

    })

  }

  async deleteJob(req: Request, res: Response) {
    jenkins.job.destroy(req.params.name, function (err) {
      if (err) return res.send(400)
      return res.send(204)
    });
  }

  async findJob(req: Request, res: Response) {
    jenkins.job.get(req.params.name, function (err, data) {
      if (err) return res.send(400)
      return res.send(data)
    });
  }
}


export default new JobController()