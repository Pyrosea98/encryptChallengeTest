import {Encrypter} from "../service/ecnrypter";
import {InputDTO} from "../model/inputDTO";
import {OutputDTO} from "../model/outputDTO";

export class Controller {
    constructor(private encrypter: Encrypter) {

    }

    getEncrypter(req: InputDTO, res: any): OutputDTO {
        try {
            return this.encrypter.encryptData(req);
        }catch (error){
            res.status(400);
            return {message: 'Los campos no fueron diligenciados correctamente'}
        }
    }
}