# node-cryptostream

Duplex stream implementation of Crypto.

## Installation
    $ npm install node-cryptostream
    
## Usage
```js
var cryptostream = require('node-cryptostream'),
    EncryptStream = new cryptostream.EncryptStream({ algorithm: 'aes-256-cbc', key: 'key123' }),
    DecryptStream = new cryptostream.DecryptStream({ algorithm: 'aes-256-cbc', key: 'key123' });

var textStream = fs.createReadStream('file.txt');
    
textStream.pipe(EncryptStream).pipe(DecryptStream);
```
