import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})


export class HeaderBarComponent implements OnInit {

  isAuthenticated: boolean;

  public isAuth(bol: boolean): void {

    {
      this.isAuthenticated = bol;
    }
  }


  public menu: HeaderBarComponent


  constructor() {

  }
  ngOnInit() {
    localStorage.setItem("isAuth", "false");
  }

  public auth(): boolean {
    return localStorage.getItem('isAuth') === "false";
  };


  logout() {

    this.ngOnInit();

  }



}
