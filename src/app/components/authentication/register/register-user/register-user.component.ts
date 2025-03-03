import { NgClass } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NameNotTakenDirective } from '../../../../core/directives/name-not-taken.directive';
import { UserRegisterModel } from '../../../../models/users/user-register-model';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [NameNotTakenDirective, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RegisterUserComponent {
  @Input('userNames') userNames: string[] = [];
  @Input() registerForm!: FormGroup;
}
