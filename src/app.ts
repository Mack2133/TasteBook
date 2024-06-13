import express, { Application, ErrorRequestHandler, NextFunction, Request, Response} from 'express'
import { Server } from 'http';
import createHttpError from 'http-errors';
import router from './routes/routes';
import cors from 'cors';

const app : Application = express();
const PORT: Number = Number(process.env.PORT) || 8001;

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
}
app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
    res.send('tastebook api is running...');
});

app.use(express.json());

app.use('/api', router);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound());
})

const errorHandler: ErrorRequestHandler = (err, req, res) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
};

app.use(errorHandler);

const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})