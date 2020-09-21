import { PopUpDeleteComponent } from "./Shared/pop-up-delete/pop-up-delete.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS
} from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatNativeDateModule } from "@angular/material/core";
import { HttpClientModule } from "@angular/common/http";
import { HeaderBarComponent } from "./template/header-bar/header-bar.component";
import { MatIconModule } from "@angular/material/icon";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { UsuarioListComponent } from "./usuario/usuario-list/usuario-list.component";
import { MatTableModule } from "@angular/material/table";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { UsuarioInsertComponent } from "./usuario/usuario-insert/usuario-insert.component";
import { CommonModule } from "@angular/common";
import { PontoColetaInsertComponent } from "./ponto-de-coleta/ponto-coleta-insert/ponto-coleta-insert.component";
import { FormDebugComponent } from "./shared/form-debug/form-debug.component";
import { PontoColetaListComponent } from "./ponto-de-coleta/ponto-coleta-list/ponto-coleta-list/ponto-coleta-list.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { FooterComponent } from "./template/footer/footer.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ReceberMedicamentoComponent, FormMedicamentoComponent } from './receber-medicamento/receber-medicamento.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListMedicamentosComponent } from './list-medicamentos/list-medicamentos.component';
import { SolicitarMedicamentosComponent } from './list-medicamentos/solicitar-medicamentos/solicitar-medicamentos.component';
import { MedicamentoFormComponent } from './medicamento/medicamento-form/medicamento-form.component';
import { MedicamentoListComponent } from './medicamento/medicamento-list/medicamento-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ComfirmaCpfComponent } from './receber-medicamento/comfirma-cpf/comfirma-cpf.component';
import { RecuperarSenhaComponent } from './usuario/recuperar-senha/recuperar-senha.component';
import { AddMedDialogComponent } from './list-medicamentos/add-med-dialog/add-med-dialog.component';
import { InfoPontoColetaComponent } from './list-medicamentos/info-ponto-coleta/info-ponto-coleta.component';
import { MyMedicamentosComponent } from './my-medicamentos/my-medicamentos.component';
import { UsuarioPerfilComponent } from './usuario/usuario-perfil/usuario-perfil.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    UsuarioListComponent,
    LoginComponent,
    HomeComponent,
    UsuarioInsertComponent,
    PontoColetaInsertComponent,
    FormDebugComponent,
    PontoColetaListComponent,
    FooterComponent,
    PopUpDeleteComponent,
    ReceberMedicamentoComponent,
    FormMedicamentoComponent,
    ListMedicamentosComponent,
    SolicitarMedicamentosComponent,
    MedicamentoFormComponent,
    MedicamentoListComponent,
    ComfirmaCpfComponent,
    RecuperarSenhaComponent,
    AddMedDialogComponent,
    InfoPontoColetaComponent,
    MyMedicamentosComponent,
    UsuarioPerfilComponent,

  ],
  //entryComponents: [DialogOverviewExample, DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatGridListModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "fill" }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
