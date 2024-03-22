'use strict';

//Source: https://github.com/tc39/ecma262/issues/2770

async function returnDirectPrimitive() {
  return 1;
}

async function returnAwaitPrimitive() {
  return await 1;
}

async function returnDirectPromisePrimitive() {
  return Promise.resolve(1);
}

async function returnAwaitPromisePrimitive() {
  return await Promise.resolve(1);
}

async function returnDirectNewPromise() { // 3 ticks w/async, 1 tick w/o
  return new Promise((resolve) => {
    resolve(1);
  });
}

async function returnAwaitNewPromise() {
  return await new Promise((resolve) => {
    resolve(1);
  });
}

const thenable = {
  then(resolve) {
    resolve(1);
  }
};

function returnDirectThenable() {
  return thenable;
}

async function returnAwaitThenable() {
  return await thenable;
}


async function returnAsyncThenable() {
  return thenable;
}

const resolved = Promise.resolve();

async function test(fn) {
  let done = false;
  let count = 0;
  fn().then(() => { done = true; });

  function counter() {
    if (done) {
      const s = count === 1 ? 'tick' : 'ticks';
      console.log(`${fn.name} took ${count} ${s}`);
    } else {
      resolved.then(() => {
        count++;
        counter();
      });
    }
  }
  counter();
}

async function tests() {
  await resolved;

  await test(returnDirectPrimitive);
  await test(returnAwaitPrimitive);

  await test(returnDirectPromisePrimitive);
  await test(returnAwaitPromisePrimitive);

  await test(returnDirectNewPromise);
  await test(returnAwaitNewPromise);

  await test(returnDirectThenable);
  await test(returnAwaitThenable);
  await test(returnAsyncThenable);
}

tests();
