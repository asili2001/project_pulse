"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const returner_1 = __importDefault(require("../utils/returner"));
const db_connection_1 = __importDefault(require("../db/connections/db-connection"));
const user_repository_1 = __importDefault(require("../db/repositories/user.repository"));
const router = express_1.default.Router();
// server status
router.get('/', (req, res) => {
    return (0, returner_1.default)(res, 'success', 200, [], 'Server is active');
});
// test create a school db
router.get('/user', async (req, res) => {
    const connection = new db_connection_1.default('project_pulse');
    const UserRepo = new user_repository_1.default(connection);
    // const insert = await UserRepo.insert({
    //     name: "Mikael Johnsson",
    //     personal_number: "200107158255",
    //     phone_number: "07555443233",
    //     email: "ahmadasilic@gmail.com",
    //     role: 1,
    //     password: "sdsdsdsdsd"
    // })
    const getOne = await UserRepo.getOne("users", ["email", "id"], ["ahmadasili1928@gmail.com", "1"]);
    // const getAll = await UserRepo.getAll({email: "ahmadasilic@gmail.com"});
    if (!getOne)
        return;
    return (0, returner_1.default)(res, 'success', 200, [getOne], 'Server is active');
});
exports.default = router;
