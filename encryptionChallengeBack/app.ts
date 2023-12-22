import express from 'express';
import cors from 'cors';
import {Encrypter} from "./service/ecnrypter";
import {InputDTO} from "./model/inputDTO";
import {Controller} from "./controller/controller";
import bodyParser from 'body-parser';


const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const encrypterService = new Encrypter();
const encrypterController = new Controller(encrypterService);

app.post('/saveData', (req, res) => {
    const input = new InputDTO(req.body.idNumber, req.body.name);
    const answer = encrypterController.saveData(input, res);
    res.json({
        answer
    });
});

app.get('/encrypter', (req, res) => {
    const answer = encrypterController.getEncrypter(res);
    res.json({
        answer
    });
});

app.get('/decrypt', (req, res) => {
    const answer = encrypterController.getDecrypter(res);
    res.json({
        answer
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});