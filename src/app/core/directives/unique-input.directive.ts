import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class UniqueInputDirective implements Validator, OnChanges {

  @Input('appUniqueInput') values: string[] = [];
  private control: AbstractControl | null = null;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    this.control = control;
    const hashmap = new Set<string>();
    for (const value of this.values) {
      if (!hashmap.has(value)) {
        hashmap.add(value);
      } else {
        console.log(`${value} is repeated!`);
        return { forbidden: true };
      }
    }
    return null;

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['values'] && this.control) {
      this.control.updateValueAndValidity({ onlySelf: true }); // Force validation re-run
    }
  }


}
