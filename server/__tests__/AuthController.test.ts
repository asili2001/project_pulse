import {app} from '../src/app';
import jwt from 'jsonwebtoken';
import AuthController from '../src/controllers/auth.controller';
import DbConnection from '../src/db/connections/db-connection';
import request from 'supertest';
import CryptoHelper from '../src/utils/CryptoHelper';
import statusCodes from "../src/utils/HttpStatusCodes";
import util from "util";
import {exec} from "child_process";

if (!process.env.DB_NAME_MAIN) {
    throw new Error("Inviroment Variable DB_NAME_MAIN needs to be defined");
}

const db = new DbConnection(process.env.DB_NAME_MAIN);
const authController = new AuthController(db);

const userData = [
    {
        "name": "Test User1",
        "personal_number": "200107158271",
        "phone_number": "0739777777",
        "email": "ahmad@asiliunique.com"
    },
    {
        "name": "Test User2",
        "personal_number": "200107158277",
        "phone_number": "0739777877",
        "email": "ahmad@asiliunique1.com"
    }
];

const userPass = "mysecretpass";


beforeAll(async ()=> {
    const promiseExec = util.promisify(exec);
    const {stderr} = await promiseExec("cd ../db && mariadb -h $(hostname).local -udbadm -pP@ssw0rd < ../db/reset_dev.sql && cd ../server/");
    if (stderr) {
        console.log('stderr:', stderr);
    }
});

test("Create JWT Token and verify it.", ()=> {
    const data = {data: "HelloWorld"};
    const token = authController.createToken(data);
    expect(typeof token).toBe("string");

    if (!process.env.JWT_SECRET) {
        throw new Error("Inviroment Variable JWT_SECRET needs to be defined");
    }

    const jwtData: any = jwt.verify(token, process.env.JWT_SECRET);
    
    expect(jwtData.data).toBe(data.data)
});

test("Invite new users:", async ()=> {
    const inviteUsers = await request(app).post('/auth/register').send(userData);

    console.log(inviteUsers.body);
    
    expect(inviteUsers.body.result[0].message).toBe("success");
    expect(inviteUsers.body.result[1].message).toBe("success");
    

    // check if user exists in database
    const [user1Data] = await db.query("SELECT COUNT(email) as total FROM users WHERE email=?", [userData[0].email]);
    const [user2Data] = await db.query("SELECT COUNT(email) as total FROM users WHERE email=?", [userData[0].email]);
    expect(user1Data.total).toBe(1);
    expect(user2Data.total).toBe(1);
});

test("Validate activation token:", async ()=> {
    // get email and token from db
    const [data] = await db.query("SELECT email, token FROM users WHERE email=?", [userData[0].email]);
    // encrypt the token
    const encryptedToken = CryptoHelper.encrypt(JSON.stringify({ email: data.email, token: data.token }));
    const encryptedTokenFake = CryptoHelper.encrypt(JSON.stringify({ email: "xyzfake@fake.com", token: data.token }));
    // validate token
    const validateToken = await request(app).post('/auth/validatetoken').send({token: encryptedToken});
    const validateTokenFakeEmail = await request(app).post('/auth/validatetoken').send({token: encryptedTokenFake});
    expect(validateToken.body.code).toBe(statusCodes.OK);
    expect(validateTokenFakeEmail.body.code).toBe(statusCodes.BAD_REQUEST);
});

test("Activate Account:", async ()=> {
    // get token from db
    const [data] = await db.query("SELECT email, token FROM users WHERE email=?", [userData[0].email]);
    // encrypt the token
    const encryptedToken = CryptoHelper.encrypt(JSON.stringify({ email: data.email, token: data.token }));
    // activate account
    const activateAccount = await request(app).post('/auth/activate').send({token: encryptedToken, password: userPass});
    const activateAccountMissingData = await request(app).post('/auth/activate');
    expect(activateAccountMissingData.body.code).toBe(statusCodes.BAD_REQUEST);
    expect(activateAccount.body.code).toBe(statusCodes.OK);

    // Check if account is active and password is set and encrypted in database
    const [data1] = await db.query("SELECT email, activated, password FROM users WHERE email=?", [userData[0].email]);
    expect(data1.activated).toBe(1);
    expect(data1.password).not.toBe(userPass);
    expect(data1.password.length).toBeGreaterThan(1);
});

test("Login:", async ()=> {
    // login to user
    const login = await request(app).post('/auth/login').send({email: userData[0].email, password: userPass});
    expect(login.body.code).toBe(statusCodes.OK);
    // check if cookie with the JWT Token is sent with the response
    const cookieExists = login.header['set-cookie'].some((cookie: string) => cookie.includes(`key=`));
    expect(cookieExists).toBe(true);

    // try login with inactive user
    // disactive user
    await db.query("UPDATE users SET activated = ? WHERE email = ?", [0, userData[0].email]);

    const loginAgain = await request(app).post('/auth/login').send({email: userData[0].email, password: userPass});
    expect(loginAgain.body.code).toBe(statusCodes.FORBIDDEN);

});
