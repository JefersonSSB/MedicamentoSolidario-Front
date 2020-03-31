import { MatSnackBar } from "@angular/material/snack-bar";
import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-pop-up-delete",
  templateUrl: "./pop-up-delete.component.html",
  styleUrls: ["./pop-up-delete.component.css"]
})
export class PopUpDeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PopUpDeleteComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close(0);
  }
  ok() {
    this.dialogRef.close(1);
  }
  openSnackBar() {
    const message = "Deletado com sucesso";
    const action = "delete";
    this._snackBar.open(message, action, {
      duration: 4100
    });
  }
}
