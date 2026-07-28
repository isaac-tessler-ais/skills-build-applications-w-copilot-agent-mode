"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontendBaseUrl = exports.db = exports.apiBaseUrl = exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
exports.db = database_1.default;
const api_1 = __importDefault(require("./routes/api"));
dotenv_1.default.config();
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.apiBaseUrl = apiBaseUrl;
const frontendBaseUrl = codespaceName
    ? `https://${codespaceName}-5173.app.github.dev`
    : 'http://localhost:5173';
exports.frontendBaseUrl = frontendBaseUrl;
const app = (0, express_1.default)();
exports.app = app;
const port = Number(process.env.PORT) || 8000;
app.use((0, cors_1.default)({
    origin: [frontendBaseUrl, 'http://localhost:5173'],
}));
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
app.use('/api', api_1.default);
app.use((error, _request, response, _next) => {
    response.status(500).json({ message: error.message });
});
app.listen(port, () => {
    console.log(`Octofit backend listening at ${apiBaseUrl}`);
});
