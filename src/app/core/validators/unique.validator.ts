import { AbstractControl, ValidationErrors, ValidatorFn, FormArray, FormGroup } from '@angular/forms';

/**
 * A universal unique field validator that works inside a FormArray.
 * @param fieldName - The field name inside the FormGroup to check for uniqueness.
 * @returns ValidatorFn - A function that checks for uniqueness.
 */
export function uniqueValidator(fieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent || !control.parent.parent) {
      return null; // Prevent issues when the form initializes
    }

    const formArray = control.parent.parent as FormArray; // Get the parent FormArray
    const currentValue = control.value;

    // Extract values of the specified field from all FormGroups in the FormArray
    const allValues = formArray.controls
      .map(group => (group as FormGroup).get(fieldName)?.value)
      .filter(value => value !== null && value !== undefined && value !== ''); // Remove null/empty values

    // Count occurrences of the current value in the array
    const occurrences = allValues.filter(value => value === currentValue).length;

    return occurrences > 1 ? { notUnique: true } : null; // Return error if duplicate exists
  };
}