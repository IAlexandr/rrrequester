import { Router } from 'express';
import { version, name } from './../../../package.json';
const router = new Router();

export default router;

router.get('/', (req, res) => {
  res.json({
    name,
    version,
  });
});
