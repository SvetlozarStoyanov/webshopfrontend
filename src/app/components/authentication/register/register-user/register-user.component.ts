import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { NameNotTakenDirective } from '../../../../core/directives/name-not-taken.directive';
import { UserRegisterModel } from '../../../../models/users/user-register-model';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FormsModule, NameNotTakenDirective, NgClass],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class RegisterUserComponent {
  @Input('userNames') userNames: string[] = [];
  @Input('user') user!: UserRegisterModel;
}
