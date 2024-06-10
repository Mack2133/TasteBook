"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8001;
app.get('/', (req, res) => {
    res.send('tastebook api is running...');
});
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
const errorHandler = (err, req, res) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
};
app.use(errorHandler);
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
