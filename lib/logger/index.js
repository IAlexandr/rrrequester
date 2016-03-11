import options from './../../options';
const { debug, logLevel } = options;
export default {
  type: logLevel,
  debugging: debug === 'true',
  log(msg, someObject) { // TODO array params [someObject,..]
    const dateTime = new Date().toLocaleTimeString();
    switch (this.type) {
      case 'console':
      default:
        if (someObject) {
          /* eslint no-console: 0 */
          console.log(dateTime, msg, someObject);
        } else {
          /* eslint no-console: 0 */
          console.log(dateTime, msg);
        }
        break;
    }
  },
  debug(msg, someObject) {
    if (this.debugging) {
      this.log(msg, someObject);
    }
  },
};
