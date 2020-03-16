import { FormGroup, FormControl } from '@angular/forms';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';

const formData = new FormData();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor (private loginService: LoginService){}



  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    grant_type: new FormControl('password')
  });

  submit() {



    this.loginService.login(this.form.value).subscribe(data => {console.log(data); });


    if (this.form.valid) {
      console.log(this.form.value);
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}
