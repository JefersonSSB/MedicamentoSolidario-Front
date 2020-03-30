import { FormGroup, FormControl } from '@angular/forms';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private loginService: LoginService, private _snackBar: MatSnackBar, public router: Router) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    grant_type: new FormControl('password')
  });


  login() {


    if (this.form.controls.username.value === "admin" && this.form.controls.password.value === "admin") {
      localStorage.setItem("isAuth", "true");
      this.openSnackBar('Logado com Sucesso !', 'X')
      this.router.navigate(['/']);
    }
    else {
      this.openSnackBar('Login ou Senha Invalidos !', 'X')
    }


  }

  public auth(): boolean {
    return localStorage.getItem('isAuth') === "false";
  };

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  submit() {

    this.loginService.login(this.form.value).subscribe(data => { console.log(data); });

    if (this.form.valid) {
      console.log(this.form.value);
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}
