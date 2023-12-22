import {OutputDTO} from "../model/outputDTO";
import {InputDTO} from "../model/inputDTO";
import * as crypto from 'crypto';

import { publicEncrypt, privateDecrypt } from 'crypto';

const PUBLIC_KEY_VALUE = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFziZlz1VnGhqISYCoKet7ED8pEJU5Y3XoZ7Pep8LCFUlKZ+bZTmgq4gawbpVtUCMJlTIDyQcT2zlzyBDLbBPgsDdEw868F9TioOjbQ+l6dfrXIuaRR3n8+IKEx2NIP0HtwtIjwKNv1nhbmEttYau/fAtxi/Xvw2mmAXi+e3kFJPAgMBAAE=
-----END PUBLIC KEY-----`;

// const PUBLIC_KEY_VALUE = `-----BEGIN RSA PUBLIC KEY-----
// MIIBCgKCAQEAvhf9EfHQzEpyIxhUgqB/2UW67p0I7PaEJX0GLGfTG8PLEF7GwXo3nLJaCbyO4j2v9JUftiD/9fN6Ncsw60EJ9JgmyzhqK0jya6sSUYbOuNWNJ8e9n9MXhz18Pnl5V/hSd9yDK/DNGrTfvOX4kMCgN0WZkvhl7lI6+puYml7urS/1rzXZ7ni8QHi5RO6OFER6qP02db27DpKNcaxdVokq8sJb5PMDU3XdSMU2s9EfT14poKEJuczY+jLWdPsEi+hmvpN6LPsHPNHHZmwrB8pJO9MOaSaUaVLqD3DEzFdAfb5DwNwy43yB27dLNBP3wR6mA9eZ4SLKZyKP6CJVLxlWhwIDAQAB
// -----END RSA PUBLIC KEY-----`;

const PRIVATE_KEY_VALUE = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgFziZlz1VnGhqISYCoKet7ED8pEJU5Y3XoZ7Pep8LCFUlKZ+bZTmgq4gawbpVtUCMJlTIDyQcT2zlzyBDLbBPgsDdEw868F9TioOjbQ+l6dfrXIuaRR3n8+IKEx2NIP0HtwtIjwKNv1nhbmEttYau/fAtxi/Xvw2mmAXi+e3kFJPAgMBAAECgYARcIzJrWLSqQisBKQMjGJvAQ+9PaQNE05TL7abXT8n7uqOLDTE/VbR/NI7lPoxulyHnTzzQieQ7zRZLt3FPpk4W612W35aoiusLMY9Tl9+IJTJH/fJWoVTOT6jplljLL87t1R0gbl6a1/8n4hp1X6+qAJxlG3KvEKNU3bxhUhamQJBALGG3qpOTyvS0vp+pkyxPjvV8VwplMu27klS469uByPpIVJ6UVYGbgWhGzUsaPVKmEIEoEbk9mj2VfL3RVBfIDsCQQCF8UwEEXiMeiWogu8kNapnAC6l/6SSiOnuDWrWG4aRXyRiRviTptS6Hd9gZENfZG3wObrBrh0lGN2kQKWPiOj9AkEArshmua5X7IGpDs9a0+89opPFCkQ2J0t31+EwIixmA0kocZfUNKon8IrpyrRqsfY7aeQ8GRCcOkMt5ATnzXWauQJAHvcU2s/rLZbDg/yZKqbZeSx6nFfIhTPv2N/zNgJxDsSPFcVQjFoCTfDABnnHdZMzM1k1Srdk94GTI/jqDY/aRQJASk5i1+D7TWL0YcwWE1wi+rMC1YgBdqJYFjKQF5sy0IbZmkCSJbrZ2RpFY2voX9ZBip8c1O7A4oXn8RvvRbimAA==
-----END RSA PRIVATE KEY-----`;

// const PRIVATE_KEY_VALUE = `-----BEGIN RSA PRIVATE KEY-----
// MIIEpAIBAAKCAQEAvhf9EfHQzEpyIxhUgqB/2UW67p0I7PaEJX0GLGfTG8PLEF7GwXo3nLJaCbyO4j2v9JUftiD/9fN6Ncsw60EJ9JgmyzhqK0jya6sSUYbOuNWNJ8e9n9MXhz18Pnl5V/hSd9yDK/DNGrTfvOX4kMCgN0WZkvhl7lI6+puYml7urS/1rzXZ7ni8QHi5RO6OFER6qP02db27DpKNcaxdVokq8sJb5PMDU3XdSMU2s9EfT14poKEJuczY+jLWdPsEi+hmvpN6LPsHPNHHZmwrB8pJO9MOaSaUaVLqD3DEzFdAfb5DwNwy43yB27dLNBP3wR6mA9eZ4SLKZyKP6CJVLxlWhwIDAQABAoIBAAue/s8mh9u9X13q4lu8ASTgwO1Od1m5NlnuWz7CuCK15Qeiq6bvWFABjUSUHO4S1Ftw9GfXe55nHJ0GR37SUo/77z80OzVbN8rCQhPu2FtvXrpEWUDYkFMpvJs7JOJuYWhHeFNq3LcZwKXVL012ITVP0XQtMFoR994TPhCN5ix7K4/rj5/Kb4TobcXJ6JLdmtRedq97tZ6X95mx5hp/4lPATAVYNr3oX+RmFJIZUX8NkJVE2Gb8pFYICvfBS6GHA55Nx6LUsqVRrdw29fP+J/YffmYUEVs/mYxjba/rMFs0UVdtEZIopo5TmwmtNkljgXZPh/UIQQH253c+aTqq4NUCgYEA7V5NOIkY0/yXn9bbs5LbTlOjB1Awxkao1uJ9T8CGcMqZQHRhkkWuXg6psb5DFswzDOozCzAnByb0Ga/YPhci3bTChCnHJ+W9h1Tox8I97cw0RbbiF1VZC9KWi1jCOuqOEFA2Sja3oNxYndpB+V6AGs8V97yVsBexxlzEFE5aNZUCgYEAzQO/B/2iqLLObhxGZQPPvvoO0K35w8j+XwLeLGPy5FoGCvIJ6Y3iN+bBtxsyXjzAPLQJwx/+Gn75SESwDpMEZlq3Hmt1uAr9bYmNum3T7H6TJ0o/KEyvyyItYWV4DyqMFKiQHtgj8VMQQNZOVoYH8zV1rPgZEJWKUXlbecW+XKsCgYEAlAmxLWZLhsJNKhHNOcSIY+RDk+cOVEpzOHlO3/NZpXSleY5b3+b3ZY/Ng53+p3Q5Dn/tz7d7T7mamX6S5b52L0Fx4w1POPHOb12kRBk/mFQ38ZaqkRTYkUgIPeXgVPA+I6xy/3v6sCdcWS5q4QRv7shikfwaexV7+ROX8nYfSrUCgYAW9HZtRJ7z2KF4fr37DYQzU/hYsUIoA9dHeCC8Q6ysmM/YZeVqOzK7I6FJCUiIeLDlmxsEuA5RlSoAR4CXASsa8slSJKIXq1NY8m/mEeoKrtl3Kr8LmhqM2hTOtPfOausoXP9WFMlhefV17Qj0cylst+2nIlhcHQJRwQ7XAacg5QKBgQDl3F+HlYoNbw2NkJYsagbVzreGVL7uJtUF0Lv+WcyzcLWj6+aK+NNO7Vf9p41R3qGqdX9NilsTrWJSNVwBtJ2LfudekrS9kSXPhVNLB+BMSCl8EJk65IZAwTBkiwZ9rgiczJG6HfBHuz60avMVtWFttm0/Wpke6z3YsGfaRS6ZlA==
// -----END RSA PRIVATE KEY-----`;

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