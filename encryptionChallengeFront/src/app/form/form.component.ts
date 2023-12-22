import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global.service";

declare function encriptarCampo(nomVar:string, nomVarCrypto:string, publicKey:string, visibles:number): void;
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  name: string = "";
  identifier: string = "";
  identifierCopy: string = "";

  constructor(private http: HttpClient, private globalService: GlobalService) {

  }

  submitForm() {
    console.log((<HTMLInputElement>document.getElementById("identifierCrypto")).value);
    const body = {
      idNumber: (<HTMLInputElement>document.getElementById("identifierCrypto")).value,
      name: this.name };
    this.http.post("http://localhost:3000/saveData", body).subscribe(
      (data) => {
        this.http.get("http://localhost:3000/decrypt").subscribe(
          (data) => console.log(data),
          (err) => console.log(err)
        );
      },
      (err) => console.log(err)
    );
  }


  onInputChanged() {
    return false;
  }

  onInputBlur() {
    encriptarCampo("identifier", 'identifierCrypto', this.globalService.publicKey,2)
  }

  putRealIdentifier() {
    this.identifier = this.identifierCopy;
  }
}
