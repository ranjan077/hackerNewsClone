import express from "express";
import compression from 'compression';
import cors from "cors";
import React from "react";
import "isomorphic-fetch";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import routes from "../shared/routes";
import configureStore from "../shared/configureStore";
import App from "../shared/App";
import "source-map-support/register";

const app = express();
app.use(compression());
app.use(cors());
app.use(express.static("public"));

const handleRequest = (req, res, next) => {
  const promises = routes.reduce((acc, route) => {
    if (matchPath(req.url, route) && route.component && route.component.initialServerFecth) {
      acc.push(Promise.resolve(route.component.initialServerFecth()));
    }
    return acc;
  }, []);

  Promise.all(promises)
    .then((resposne) => {
      const context = {};
      const store = configureStore({news: resposne[0] ? resposne[0].hits : []});
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      );

      const initialData = store.getState();
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hacker News</title>
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
            <script>window.__initialData__ = ${serialize(initialData)}</script>
          </head>

          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
      `);
    })
    .catch(next);
};
app.get("/", handleRequest);
app.get("/news", handleRequest);
app.get('*', function(req, res){
  res.send('Page not found!', 404);
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});

