var crypto = require('crypto'),
  util = require('util'),
  Transform = require('stream').Transform;
 
function CryptoStream(cipher, opts) {
  if (!(this instanceof CryptoStream))
    return new CryptoStream(opts);

  Transform.call(this, opts);

  this._cipher = cipher(opts.algorithm, opts.key, opts.iv);
  this.key = opts.key;
  this.inputEncoding = opts.inputEncoding;
  this.outputEncoding = opts.outputEncoding;

  if (opts.autoPadding)
    this._cipher.setAutoPadding(true);
};

util.inherits(CryptoStream, Transform);

CryptoStream.prototype._transform = function(chunk, encoding, callback) {
  this.push(this._cipher.update(chunk, this.inputEncoding, this.outputEncoding));
  callback();
};

CryptoStream.prototype._flush = function(callback) {
  this.push(this._cipher.final(this.outputEncoding));
  callback();
};

CryptoStream.prototype.parseOptions = function(opts) {
  opts.iv = typeof opts.iv === 'string' ? opts.iv : '';

  return opts;
};

var EncryptStream = function(opts) {
  opts = this.parseOptions(opts);
  CryptoStream.call(this, crypto.createCipheriv, opts);
};

var DecryptStream = function(opts) {
  opts = this.parseOptions(opts);
  CryptoStream.call(this, crypto.createDecipheriv, opts);
};

util.inherits(EncryptStream, CryptoStream);
util.inherits(DecryptStream, CryptoStream);

module.exports.EncryptStream = EncryptStream;
module.exports.DecryptStream = DecryptStream;