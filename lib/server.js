import { Server } from 'http';
import options from './../options';
import l from './logger';
import api from './api';

const httpServer = new Server(api());
const port = options.port;
httpServer.listen(port);
if (l.debugging) {
  l.log('DEBUG MODE.');
} else {
  l.log('QUIET MODE.');
}
l.log('Server listenning on port: ', port);
