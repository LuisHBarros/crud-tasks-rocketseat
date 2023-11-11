import http from "http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const port = 3333;
const server = http.createServer(async (req, res) => {
  await json(req, res);
  const { method, url } = req;
  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });
  if (route) {
    const routeParams = req.url.match(route.path);
    req.params = { ...routeParams.groups };
    const { query, ...params } = routeParams.groups;
    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(port, () => console.log("server is listening in port 3333"));
