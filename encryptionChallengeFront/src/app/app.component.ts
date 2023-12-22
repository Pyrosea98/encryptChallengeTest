import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FormComponent} from './form/form.component';
import {HttpClient} from '@angular/common/http';
import {AppModule} from "./app.module";
import {ApiKeyResponse} from "./util/ApiKeyResponse";
import {GlobalService} from "./global.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, FormComponent, AppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'encryption_challenge';

  constructor(private http: HttpClient, private globalService: GlobalService) {

  }

  ngOnInit() {
    this.http.get<ApiKeyResponse>('http://localhost:3000/encrypter').subscribe(data => {
      this.globalService.publicKey = data.answer;
    });
  }
}
