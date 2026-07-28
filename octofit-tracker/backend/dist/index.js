"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const apiUrl_1 = require("./config/apiUrl");
const database_1 = __importDefault(require("./config/database"));
exports.db = database_1.default;
const api_1 = __importDefault(require("./routes/api"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = Number(process.env.PORT) || 8000;
app.use((0, cors_1.default)({
    origin: [apiUrl_1.frontendBaseUrl, 'http://localhost:5173'],
}));
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl: apiUrl_1.apiBaseUrl });
});
app.use('/api', api_1.default);
app.use((error, _request, response, _next) => {
    response.status(500).json({ message: error.message });
});
app.listen(port, () => {
    console.log(`Octofit backend listening at ${apiUrl_1.apiBaseUrl}`);
});
