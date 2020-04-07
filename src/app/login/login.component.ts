import { LoginService } from "./login.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Input, Component, Output, EventEmitter } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  cpf: string;
  password: string;
  loading = false;

  constructor(
    private _snackBar: MatSnackBar,
    public router: Router,
    private authService: AuthService,
    private service: LoginService

  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  form: FormGroup = new FormGroup({
    cpf: new FormControl(''),
    senha: new FormControl(''),
    //grant_type: new FormControl("password"),
  });

  auth() {
    return localStorage.getItem('isAuth') === 'false';

  }


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

  // ngOnInit() { }

  login() {
    this.loading = true;
    this.service.login(this.form.value).subscribe(
      result => {
        localStorage.setItem('isAuth', 'true');
        this.openSnackBar('Logado com Sucesso !', 'X');
        this.router.navigate(['/']);
        this.loading = false;
      },
      (error) => {

        if (error.status === 401) {
          this.openSnackBar('Login ou Senha Incorretos', "X")

          this.loading = false;
        }
        else {
          this.openSnackBar('Problema Desconhecido', 'X')
          console.log(error.error.error);
          this.loading = false;
        }
      },
      () => {
        console.log('request completo')
        this.loading = false;
      }

    );

  }
}
