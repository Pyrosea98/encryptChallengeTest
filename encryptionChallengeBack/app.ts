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
    console.log(input);
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

// import * as crypto from 'crypto';
//
// // Generate RSA key pair with RSAES-PKCS1-v1_5 padding
// const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicExponent: 65537,
// });
//
// // Convert keys to PEM format
// const privateKeyPEM = privateKey.export({
//     type: 'pkcs1',
//     format: 'pem',
// });
//
// const publicKeyPEM = publicKey.export({
//     type: 'pkcs1',
//     format: 'pem',
// });
//
// // Print the keys (In a real scenario, you would store the keys securely)
// console.log('Private Key:');
// console.log(privateKeyPEM);
// console.log('\nPublic Key:');
// console.log(publicKeyPEM);