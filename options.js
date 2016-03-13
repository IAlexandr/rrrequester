const optionsSpec = {
  port: {
    required: true,
    default: '8099',
    env: 'RRREQ_PORT'
  },
  rrrNodeAddress: {
    required: true,
    default: 'http://10.10.10.148:8080',
    env: 'RRREQ_PORT'
  },
  logLevel: {
    required: true,
    default: 'console', // console, db/ws??
    env: 'RRREQ_LOG_LEVEL'
  },
  debug: {
    required: false,
    default: 'true',
    env: 'RRREQ_DEBUG'
  },
  mongoDbUrl: {
    required: true,
    default: 'mongodb://si-sdsql:27017/parcels',
    env: 'RRREQ_MONGODBURL'
  },
};

export default Object.keys(optionsSpec).map((key) => {
  if (!optionsSpec[key].preprocess) {
    optionsSpec[key].preprocess = function preprocess (str) {
      return str;
    };
  }
  const opt = { name: key };
  if (process.env[optionsSpec[key].env]) {
    opt.value = optionsSpec[key].preprocess(process.env[optionsSpec[key].env]);
  } else if (optionsSpec[key].default) {
    opt.value = optionsSpec[key].preprocess(optionsSpec[key].default);
  } else if (optionsSpec[key].required) {
    throw new Error('!!! REQUIRED OPTION NOT SET: ' + key);
  }
  return opt;
}).reduce((prev, cur) => {
  prev[cur.name] = cur.value;
  return prev;
}, {});
