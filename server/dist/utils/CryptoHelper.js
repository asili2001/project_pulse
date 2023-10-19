"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
class CryptoHelper {
    key;
    encryptionIV;
    constructor() {
        // Check if the required environment variables are defined.
        if (!process.env.CRYPTO_SECRET || !process.env.CRYPTO_SECRET_IV) {
            throw new Error("Missing required environment variables for decryption.");
        }
        // Derive a 32-character key from the CRYPTO_SECRET using SHA-512 and an IV from CRYPTO_SECRET_IV.
        this.key = crypto.createHash('sha512').update(process.env.CRYPTO_SECRET).digest('hex').substring(0, 32);
        this.encryptionIV = crypto.createHash('sha512').update(process.env.CRYPTO_SECRET_IV).digest('hex').substring(0, 16);
    }
    /**
     * Encrypts a string using the specified encryption algorithm and secret key.
     *
     * @param {string} data - The data to be encrypted as a UTF-8 encoded string.
     * @returns {string} - The encrypted data as a base64-encoded string.
     * @throws {Error} - If any of the required environment variables are missing.
     */
    encrypt(data) {
        const cipher = crypto.createCipheriv("aes-256-cbc", this.key, this.encryptionIV);
        return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64'); // Encrypts data and converts to hex and base64
    }
    /**
     * Decrypts a base64-encoded encrypted string using the specified decryption algorithm and secret key.
     *
     * @param {string} encryptedData - The base64-encoded encrypted data to be decrypted.
     * @returns {string} - The decrypted data as a UTF-8 encoded string.
     * @throws {Error} - If any of the required environment variables are missing.
     */
    decrypt(encryptedData) {
        if (!process.env.CRYPTO_SECRET) {
            throw new Error("Missing required environment variables for decryption.");
        }
        const buff = Buffer.from(encryptedData, 'base64');
        // Converts encrypted data to utf8
        const decipher = crypto.createDecipheriv("aes-256-cbc", this.key, this.encryptionIV);
        return (decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
            decipher.final('utf8')); // Decrypts data and converts to utf8
    }
}
exports.default = new CryptoHelper();
