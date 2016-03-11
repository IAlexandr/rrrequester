import { Server } from 'http';
import options from './../options';
import l from './logger';
import api from './api';

const httpServer = Server(api());
console.log(options);
const port = options.port;
httpServer.listen(port);
l.debugging ? l.log('DEBUG MODE.') : l.log('QUIET MODE.');
l.log('Server listenning on port: ' + port);
