import express from 'express';
import routes from './routes';

export default function () {
  const app = express();

  app.set('json spaces', 2);
  routes.forEach((route) => {
    app.use(route.mountPoint, route.router);
  });
  return app;
}
