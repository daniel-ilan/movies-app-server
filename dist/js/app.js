"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./configs/dbConfig"));
const todos_1 = __importDefault(require("./routes/todos"));
const init_1 = __importDefault(require("./routes/init"));
const app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(init_1.default);
app.use(todos_1.default);
const port = process.env.PORT || 8082;
dbConfig_1.default().then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => {
    console.log(err);
});
