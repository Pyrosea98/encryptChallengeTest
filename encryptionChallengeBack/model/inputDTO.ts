export class InputDTO {

    private _idNumber: string;
    private _name: string;

    constructor(idNumber: string, name: string) {
        if (!idNumber) {
            throw new Error("idNumber no puede ser nulo o vacío");
        }

        if (!name) {
            throw new Error("name no puede ser nulo o vacío");
        }

        this._idNumber = idNumber;
        this._name = name;
    }

    get idNumber(): string {
        return this._idNumber;
    }

    set idNumber(value: string) {
        if (!value) {
            throw new Error("idNumber no puede ser nulo o vacío");
        }
        this._idNumber = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (!value) {
            throw new Error("name no puede ser nulo o vacío");
        }
        this._name = value;
    }
}