import { LoginService } from "./login.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Input, Component, Output, EventEmitter } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { UserData } from '../models/user.data';
import { CryptoService } from '../auth/crypto.service';

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
  mask = '000.000.000-00'
  userData: UserData;

  constructor(
    private _snackBar: MatSnackBar,
    public router: Router,
    private authService: AuthService,
    private service: LoginService,
    private cryptoService: CryptoService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  form: FormGroup = new FormGroup({
    cpf: new FormControl(""),
    senha: new FormControl(""),
    //grant_type: new FormControl("password"),
  });

  auth() {
    return this.cryptoService?.decrypto(sessionStorage.getItem('isAuth')) !== "true";
  }

  showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: isError ? ['msg-error'] : ['msg-success']

    })
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
      (data) => {
        this.userData = data as UserData;
        sessionStorage.setItem("isAuth", this.cryptoService?.cryptoIn("true"));
        sessionStorage.setItem("id", this.cryptoService?.cryptoIn(this.userData.Id));
        sessionStorage.setItem("nome", this.cryptoService?.cryptoIn(this.userData.Nome));
        sessionStorage.setItem("role", this.cryptoService?.cryptoIn(this.userData.Role));
        this.showMessage("Logado com Sucesso !");
        this.router.navigate(["/"]);
        this.loading = false;
      },
      (error) => {
        if (error.status === 401) {
          this.showMessage("Login ou Senha Incorretos", true);

          this.loading = false;
        } else {
          this.showMessage("Problema Desconhecido", true);
          this.loading = false;
        }
      },
      () => {
        console.log("request completo");
        this.loading = false;
      }
    );
  }
}
