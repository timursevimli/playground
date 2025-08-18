'use strict';

// const timeout = (fn, ms) => {
//   return new Promise((resolve, reject) => {
//     let timer = setTimeout(() => {
//       reject(new Error('timeout'));
//       clearTimeout(timer);
//       timer = null;
//     }, ms);
//     fn().then((res) => {
//       if (timer) clearTimeout(timer);
//       resolve(res);
//     }, reject);
//   });
// };

const sleep = (ms) => new Promise((r) => void setTimeout(r, ms));

const timeout = async (promise, ms) => {
  return await Promise.race([
    promise,
    sleep(ms).then(() => {
      throw new Error(`Timeout error after ${ms} ms`);
    }),
  ]);
};

// Usage

const timers = require('node:timers/promises');

(async () => {
  const result = await timeout(async () => {
    await timers.setTimeout(200);
    return 'done';
  }, 100);

  console.log(result);
})();
