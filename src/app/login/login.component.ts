import { FormGroup, FormControl } from '@angular/forms';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  cpf:string;
  password:string;
  constructor(
    private _snackBar: MatSnackBar,
    public router: Router,
    private authService:  AuthService
    )
    {
    if (this.authService.currentUserValue) {
        this.router.navigate(['/']);
    }
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    grant_type: new FormControl('password')
  });


  login() {
    this.cpf = this.form.get('username').value;
    this.password =  this.form.get('password').value;
    this.authService.login(this.cpf ,this.password).subscribe( result => {
      localStorage.setItem('isAuth', 'true');
      // localStorage.setItem
      this.openSnackBar('Logado com Sucesso !', 'X')
      this.router.navigate(['/']);
    },error => {
      this.openSnackBar(error.message, error.status)
    }
    );
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
    if (this.form.valid) {
      console.log(this.form.value);
      this.submitEM.emit(this.form.value);
    }
  }
  ngOnInit(){

  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}
