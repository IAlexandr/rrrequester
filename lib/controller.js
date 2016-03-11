import options from './../options';
import Requester from './requester';

export default {
  init() {
    const { rrrNodeAddress } = options;
    this.requester = new Requester({ rrrNodeAddress });
    this.test();
  },
  test() {
  },
};
