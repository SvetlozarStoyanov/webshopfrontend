import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailEditModel } from '../../../models/emails/email-edit-model';
import { EmailService } from '../../../core/services/email.service';
import { UniqueInputDirective } from '../../../core/directives/unique-input.directive';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-emails',
  standalone: true,
  imports: [ReactiveFormsModule, UniqueInputDirective, RouterLink],
  templateUrl: './update-emails.component.html',
  styleUrl: './update-emails.component.css'
})
export class UpdateEmailsComponent implements OnInit {
  lastEmailIsValid: boolean = true;
  canRemoveEmails: boolean = false;
  editEmailsForm!: FormGroup;
  initialEmails: EmailEditModel[] = [];

  constructor(private readonly emailService: EmailService,
    private readonly fb: FormBuilder,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.editEmailsForm = this.fb.group({
      emails: this.fb.array([])
    });

    this.emailService.getCustomerEmails().subscribe(res => {
      this.initialEmails = res;
      this.addInitialEmailsToForm();
    });
  }

  addInitialEmailsToForm() {
    if (this.initialEmails.length > 1) {
      this.canRemoveEmails = true;
    }

    for (const email of this.initialEmails) {
      this.emails.push(this.fb.group({
        id: email.id,
        address: [email.address, [Validators.required, Validators.email]],
        isMain: [email.isMain],
      }));
    }

    this.lastEmailIsValid = true;
    this.canRemoveEmails = true;
  }

  get emails(): FormArray {
    return this.editEmailsForm.get('emails') as FormArray;
  }

  addEmail() {
    if (this.editEmailsForm.invalid) {
      this.lastEmailIsValid = false;
      return;
    }

    this.emails.push(this.fb.group({
      id: null,
      address: ['', [Validators.required, Validators.email]],
      isMain: [false],
    }));

    this.lastEmailIsValid = true;
    this.canRemoveEmails = true;
  }

  selectMain(index: number) {
    this.emails.controls.forEach((control, i) => {
      control.get('isMain')?.setValue(i === index);
    });
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
  }

  getEmailFormGroup(index: number): FormGroup {
    return this.emails.at(index) as FormGroup;
  }

  getEmails(): string[] {
    return this.emails.controls.map(x => x.get('address')?.value);
  }

  onSubmit() {
    const emailEditModels: EmailEditModel[] = this.editEmailsForm.get('emails')!.value;

    this.emailService.updateEmails(emailEditModels).subscribe(res => {
      this.router.navigate(['/profile']);
    });
  }
}
