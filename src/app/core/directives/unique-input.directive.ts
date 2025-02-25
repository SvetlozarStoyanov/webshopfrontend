import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appUniqueInput]',
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: UniqueInputDirective
    }
  ],
  standalone: true
})
export class UniqueInputDirective implements Validator {
  @Input('appUniqueInput') numbers: string[] = [];
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const nameTaken = this.numbers.includes(control.value);

    return nameTaken ? { forbidden: true } : null;
  }


}
