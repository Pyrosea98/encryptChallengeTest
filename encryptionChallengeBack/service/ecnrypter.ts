import {OutputDTO} from "../model/outputDTO";
import {InputDTO} from "../model/inputDTO";
import * as crypto from 'crypto';

import { privateDecrypt } from 'crypto';

const PUBLIC_KEY_VALUE = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFziZlz1VnGhqISYCoKet7ED8pEJU5Y3XoZ7Pep8LCFUlKZ+bZTmgq4gawbpVtUCMJlTIDyQcT2zlzyBDLbBPgsDdEw868F9TioOjbQ+l6dfrXIuaRR3n8+IKEx2NIP0HtwtIjwKNv1nhbmEttYau/fAtxi/Xvw2mmAXi+e3kFJPAgMBAAE=
-----END PUBLIC KEY-----`;

const PRIVATE_KEY_VALUE = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgFziZlz1VnGhqISYCoKet7ED8pEJU5Y3XoZ7Pep8LCFUlKZ+bZTmgq4gawbpVtUCMJlTIDyQcT2zlzyBDLbBPgsDdEw868F9TioOjbQ+l6dfrXIuaRR3n8+IKEx2NIP0HtwtIjwKNv1nhbmEttYau/fAtxi/Xvw2mmAXi+e3kFJPAgMBAAECgYARcIzJrWLSqQisBKQMjGJvAQ+9PaQNE05TL7abXT8n7uqOLDTE/VbR/NI7lPoxulyHnTzzQieQ7zRZLt3FPpk4W612W35aoiusLMY9Tl9+IJTJH/fJWoVTOT6jplljLL87t1R0gbl6a1/8n4hp1X6+qAJxlG3KvEKNU3bxhUhamQJBALGG3qpOTyvS0vp+pkyxPjvV8VwplMu27klS469uByPpIVJ6UVYGbgWhGzUsaPVKmEIEoEbk9mj2VfL3RVBfIDsCQQCF8UwEEXiMeiWogu8kNapnAC6l/6SSiOnuDWrWG4aRXyRiRviTptS6Hd9gZENfZG3wObrBrh0lGN2kQKWPiOj9AkEArshmua5X7IGpDs9a0+89opPFCkQ2J0t31+EwIixmA0kocZfUNKon8IrpyrRqsfY7aeQ8GRCcOkMt5ATnzXWauQJAHvcU2s/rLZbDg/yZKqbZeSx6nFfIhTPv2N/zNgJxDsSPFcVQjFoCTfDABnnHdZMzM1k1Srdk94GTI/jqDY/aRQJASk5i1+D7TWL0YcwWE1wi+rMC1YgBdqJYFjKQF5sy0IbZmkCSJbrZ2RpFY2voX9ZBip8c1O7A4oXn8RvvRbimAA==
-----END RSA PRIVATE KEY-----`;

export class Encrypter {
    saveData(inputDTO: InputDTO) : OutputDTO{
        return new OutputDTO(
            `Correctamente diligenciado por ${inputDTO.name}`
        );
    }

    getEncrypter(): any{
        return PUBLIC_KEY_VALUE;
    }

    decryptData(encryptedDNI: String) : OutputDTO{
        const decryptedDNI = privateDecrypt({
            key: PRIVATE_KEY_VALUE,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        }, Buffer.from(encryptedDNI, 'base64')).toString();
        console.log(`INFO: docuemnto desencriptado ${decryptedDNI}`);

        return new OutputDTO('Información loggeada en consola');
    }
}