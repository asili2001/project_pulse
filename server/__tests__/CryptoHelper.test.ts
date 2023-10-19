import dotenv from 'dotenv';
dotenv.config({ path: './.env.dev' });
import CryptoHelper from '../src/utils/CryptoHelper';

test("Encrypt and decrypt a string", async () => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Inviroment Variable JWT_SECRET needs to be defined");
    }

    const cryptoHelper = CryptoHelper;

    // Test data
    const originalData = 'Hello, World!';

    // Encrypt the data
    const encryptedData = cryptoHelper.encrypt(originalData);

    // Decrypt the data
    const decryptedData = cryptoHelper.decrypt(encryptedData);
    const decryptInvalidData = ()=> {
        return cryptoHelper.decrypt("s" + encryptedData);
    }

    expect(decryptInvalidData).toThrow(Error);

    expect(decryptedData).toBe(originalData);

});