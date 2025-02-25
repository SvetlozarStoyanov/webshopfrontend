import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UniqueInputDirective } from '../../../../core/directives/unique-input.directive';

@Component({
  selector: 'app-register-emails',
  standalone: true,
  imports: [ReactiveFormsModule, UniqueInputDirective],
  templateUrl: './register-emails.component.html',
  styleUrl: './register-emails.component.css'
})
export class RegisterEmailsComponent {
  emailsAreValid: boolean = true;
  @Input('emails') emails!: FormArray;
  @Output() addEmailEvent = new EventEmitter<void>();

  addNewEmail() {
    if (this.emails.invalid) {
      this.emailsAreValid = false;
      console.log(this.emails);
      return;
    }
    this.emailsAreValid = true;
    this.addEmailEvent.emit();
  }

  getEmailFormGroup(index: number) {
    return this.emails.at(index) as FormGroup;
  }

  getEmails(): string[] {
    return this.emails.controls.map(x => x.get('address')?.value);
  }
}
