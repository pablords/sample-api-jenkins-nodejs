import { Webhooks, createNodeMiddleware } from '@octokit/webhooks'


const webhooks = new Webhooks({
    secret: "mysecret",
});

webhooks.onAny(({ id, name, payload }) => {
    console.log(name, "event received");
});

require("http").createServer(createNodeMiddleware(webhooks)).listen(3005);
  // can now receive webhook events at /api/github/webhooks