import {Encrypter} from "../service/ecnrypter";
import {InputDTO} from "../model/inputDTO";
import {OutputDTO} from "../model/outputDTO";

export class Controller {

    private _encryptedDNI:String;
    constructor(private encrypter: Encrypter) {
        this._encryptedDNI = "";
    }

    saveData(req: InputDTO, res: any): OutputDTO {
        try {
            const answer = this.encrypter.saveData(req);
            this._encryptedDNI=req.idNumber;
            return answer;
        }catch (error){
            res.status(400);
            return new OutputDTO(
                'Los campos no fueron diligenciados correctamente'
            );
        }
    }
    getEncrypter(res: any): any {
        try {
            return this.encrypter.getEncrypter();
        }catch (error){
            res.status(500);
            return 'No existe la llave';
        }
    }

    getDecrypter(res: any): OutputDTO {
        // try {
            return this.encrypter.decryptData(this._encryptedDNI);
        // }catch (error){
        //     res.status(400);
        //     return new OutputDTO(
        //         'No hay datos de un documento anterior'
        //     );
        // }
    }
}