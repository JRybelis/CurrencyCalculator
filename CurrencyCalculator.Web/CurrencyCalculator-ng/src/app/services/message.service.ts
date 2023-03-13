import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageComponent } from "../message/message.component";

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  constructor(private snackBar: MatSnackBar) {}

  add(message: string) {
    this.messages.push(message);
  }

  showNotification(): void {
    this.messages.forEach(displayMessage => {
      this.snackBar.openFromComponent(MessageComponent, {
        data: {
          message: displayMessage,
          buttonText: 'OK'
        },
        duration:180000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: ['error']
      });
    });
    this.clear();
  }

  clear(){
    this.messages = [];
  }
}
