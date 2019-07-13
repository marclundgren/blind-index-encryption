/* eslint-disable no-console */
import lib from './index.js';

const { keyFromPassword, encrypt, decrypt, hash } = lib;

const key = keyFromPassword('Our password');
const encryptedTest = encrypt(key, 'This is a test');

console.log(
  // prints 'This is a test', after encrypting it and decrypting it again
  decrypt(key,  encryptedTest)
);
console.log(
  // Prints the hash 120042280565918, generated from 'This is another test'
  hash(key, 'This is another test')
);
