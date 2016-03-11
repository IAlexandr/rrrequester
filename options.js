const optionsSpec = {
  port: {
    required: true,
    default: '8099',
    env: '_PORT'
  },
  logLevel: {
    required: true,
    default: 'console', // console, db/ws??
    env: '_LOG_LEVEL'
  },
  debug: {
    required: false,
    default: 'true',
    env: '_DEBUG'
  }
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
