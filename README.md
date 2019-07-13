# Blind Index Encryption

This script is a modified version of a pattern by [Rubén Fernández](https://functional.works-hub.com/learn/how-i-encrypted-a-database-without-storing-the-keys-anywhere-9da75?utm_source=reddit&utm_medium=organicsocial&utm_campaign=j.kaplanhttps://nodejs.org/api/buffer.html#buffer_buf_readuintle_offset_bytelength)

## example
```js
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
```
