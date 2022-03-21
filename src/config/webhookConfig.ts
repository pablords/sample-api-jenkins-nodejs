import { Webhooks, createNodeMiddleware } from '@octokit/webhooks'
import http from "http"


const webhooks = new Webhooks({
    secret: "1q2w3e4r",
});

webhooks.onAny(({ id, name, payload }) => {
    console.log(name, "event received");
});

http.createServer(createNodeMiddleware(webhooks)).listen(3001);
  // can now receive webhook events at /api/github/webhooks