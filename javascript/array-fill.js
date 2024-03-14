'use strict';

const assert = require('node:assert');

const getArray = () => new Array(3).fill(0);
const arr1 = new Array(3).fill(getArray());
const arr2 = new Array(3).fill(null).map(getArray);
console.log({ arr1, arr2 });
assert.deepStrictEqual(arr1, arr2);

arr1[1][1] = 7;
arr2[1][1] = 7;

console.log({ arr1, arr2 });
assert.deepStrictEqual(arr1, arr2);
