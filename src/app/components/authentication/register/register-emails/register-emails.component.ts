import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-emails',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-emails.component.html',
  styleUrl: './register-emails.component.css'
})
export class RegisterEmailsComponent {
  emailsAreValid: boolean = true;
  canRemoveEmails: boolean = false;
  @Input('emails') emails!: FormArray;
  @Output() addEmailEvent = new EventEmitter<void>();

  addNewEmail() {
    if (this.emails.invalid) {
      this.emailsAreValid = false;
      console.log(this.emails);
      return;
    }
    this.emailsAreValid = true;
    this.canRemoveEmails = true;
    this.addEmailEvent.emit();
    this.revalidateUniqueness();
  }

  revalidateUniqueness() {
    this.emails.controls.forEach(group => group.get('address')?.updateValueAndValidity());
  }

  selectMain(index: number) {
    this.emails.controls.forEach((control, i) => {
      control.get('isMain')?.setValue(i === index);
    })
  }

  getEmailFormGroup(index: number) {
    return this.emails.at(index) as FormGroup;
  }

  getEmails(): string[] {
    return this.emails.controls.map(x => x.get('address')?.value);
  }

  remove(index: number) {
    if (this.emails.length < 2) {
      return;
    }
    const currIsMain = this.emails.controls[index].get('isMain')?.value;
    this.emails.removeAt(index);
    if (this.emails.length === 1) {
      this.canRemoveEmails = false;
    }
    if (currIsMain) {
      this.selectMain(this.emails.length - 1);
    }

    this.revalidateUniqueness();
  }
}
