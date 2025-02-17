import { Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { EmailCreateModel } from '../../../../models/emails/email-create-model';

@Component({
  selector: 'app-register-emails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-emails.component.html',
  styleUrl: './register-emails.component.css',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class RegisterEmailsComponent {
  @Input('emails') emails: EmailCreateModel[] = [];

}
