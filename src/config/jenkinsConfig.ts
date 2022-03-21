import jenkinsApi from "jenkins"

const jenkins = jenkinsApi({ baseUrl: `http://${process.env.JENKINS_USER}:${process.env.JENKINS_PASSWORD}@${process.env.JENKINS_URL}`, crumbIssuer: true });


export default jenkins