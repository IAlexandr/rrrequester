import options from './../../options';
const { debug, logLevel } = options;
export default {
  type: logLevel, 
  debugging: debug === 'true',
  log: function (msg, someObject) { // TODO array params [someObject,..]
    const dateTime = new Date().toLocaleTimeString();
    switch (this.type) {
      case 'console':
      default:
        if (someObject) {
          console.log(dateTime, msg, someObject);
        } else {
          console.log(dateTime, msg);
        }
        break;
    }
  },
  debug: function (msg, someObject) {
    if (this.debugging) {
      this.log(msg, someObject);
    }
  }
};
