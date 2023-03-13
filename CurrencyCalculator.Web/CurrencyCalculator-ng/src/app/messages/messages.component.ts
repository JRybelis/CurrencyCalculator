import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public messageService: MessageService, private _snackBar: MatSnackBar) {}

  showMessages() {
    if (this.messageService.messages.length > 0) {
      this._snackBar.open(this.messageService.messages[0], this.messageService.messages[1], {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      })
    }
  }
}
