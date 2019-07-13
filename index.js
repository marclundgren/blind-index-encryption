import crypto from 'crypto';

// Uses the PBKDF2 algorithm to stretch the string 's' to an arbitrary size,
// in a way that is completely deterministic yet impossible to guess without
// knowing the original string
const stretchString = (s, salt, outputLength) => {
  return crypto.pbkdf2Sync(s, salt, 100000, outputLength, 'sha512');
};

// Stretches the password in order to generate a key (for encrypting)
// and a large salt (for hashing)
const keyFromPassword = (password) => {
  // We need 24 bytes for the key, and another 48 bytes for the salt
  const keyPlusHashingSalt = stretchString(password, 'salt', 24 + 48);
  return {
    cipherKey: keyPlusHashingSalt.slice(0,24),
    hashingSalt: keyPlusHashingSalt.slice(24)
  };
};

const initializationVector = () => Buffer.alloc(16, 0);

// Encrypts data using the key generated using the 'keyFromPassword' function
const encrypt = (key, sourceData) => {
  const iv = initializationVector();
  const cipher = crypto.createCipheriv('aes-192-cbc', key.cipherKey, iv);
  let encrypted = cipher.update(sourceData, 'binary', 'binary');
  encrypted += cipher.final('binary');
  return encrypted;
};

// Decrypts data using the key generated using the 'keyFromPassword' function
const decrypt = (key, encryptedData) => {
  const iv = initializationVector();
  const decipher = crypto.createDecipheriv('aes-192-cbc', key.cipherKey, iv);
  let decrypted = decipher.update(encryptedData, 'binary', 'binary');
  decrypted += decipher.final('binary');
  return decrypted;
};

// Computes a unique (integer) hash from the given data, using the salt
// we generated from the password (using 'keyFromPassword')
const hash = (key, sourceData) => {
  const hashBuffer = stretchString(sourceData, key.hashingSalt, 8);
  return hashBuffer.readUIntLE(0, 6);
};

export default {
  keyFromPassword, encrypt, decrypt, hash
};
