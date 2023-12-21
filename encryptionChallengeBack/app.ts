import express from 'express';
import cors from 'cors';
import {Encrypter} from "./service/ecnrypter";
import {InputDTO} from "./model/inputDTO";
import {Controller} from "./controller/controller";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/endpoint', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

const encrypterService = new Encrypter();
const encrypterController = new Controller(encrypterService);

app.post('/endpoint2', (req, res) => {
    const input = new InputDTO(req.body.idNumber, req.body.name);
    console.log(input);
    const answer = encrypterController.getEncrypter(input, res);
    res.json({
        answer
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});