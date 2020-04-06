import express from "express";
import compression from 'compression';
import cors from "cors";
import React from "react";
import "isomorphic-fetch";
import { renderToStaticNodeStream } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter, matchPath } from "react-router-dom";
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
    .then((response) => {
      const context = {};
      let storeValue = {};
      if(response[0].hits) {
        let news = response[0].hits.map((data) => {
          return {
             objectID: data.objectID,
             title: data.title,
             url: data.url,
             createdAt: data['created_at'],
             points: data.points,
             author: data.author,
             commentsCount: data['num_comments'],
             isUpvoted: false,
          }
       });
       storeValue = {
         news,
       }
      } else {
        storeValue = response[0];
      }
      const store = configureStore(storeValue);
      const markup = renderToStaticNodeStream(
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
            <meta name="Description" content="This clone of Hackers news app.">
            <title>Hacker News</title>
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
            <script>window.__initialData__ = ${JSON.stringify(initialData)}</script>
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


