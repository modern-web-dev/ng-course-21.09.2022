import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Book, UpdatedBook } from '../../model/book';
import { ControlsOf } from './book-details.component';

@Injectable()
export class BookFormService {
  constructor(private fb: FormBuilder) {}
  prepareForm() {
    // const form1 = this.fb.nonNullable.group({
    //   author: this.fb.nonNullable.group({
    //     firstName: ['', [tooShort(2), Validators.maxLength(60)]],
    //     lastName: ['', Validators.maxLength(60)],
    //   }),
    //   title: [''],
    //   details: this.fb.nonNullable.group({
    //     pages: [0, [isCorrectPage, Validators.maxLength(60)]],
    //   }),
    // });

    //   const form1 =  new FormGroup<ControlsOf<UpdatedBook>>({
    //     author: new FormGroup({
    //       firstName: new FormControl({ value: '', disabled: true }, { nonNullable: true,validators:[tooShort(2), Validators.maxLength(60)] }),
    //       lastName: new FormControl('', { nonNullable: true,validators:Validators.maxLength(60) }),
    //     }, [max40Chars]),
    //     title: new FormControl('', { nonNullable: true }),
    //     details: new FormGroup({
    //       pages: new FormControl(0, { nonNullable: true,validators:[isCorrectPage, Validators.maxLength(60)] }),
    //     }),
    //   });

    const form = new FormGroup<ControlsOf<UpdatedBook>>({
      author: new FormGroup({
        firstName: new FormControl('', { nonNullable: true }),
        lastName: new FormControl('', { nonNullable: true }),
      }),
      title: new FormControl('', { nonNullable: true }),
      details: new FormGroup({
        pages: new FormControl(0, { nonNullable: true }),
      }),
    });
    return form;
  }
  setValidators(form: FormGroup) {
    form.get('author')!.setValidators([max40Chars]);
    form
      .get('author.firstName')!
      .setValidators([tooShort(2), Validators.maxLength(60)]);
    form.get('author.lastName')!.setValidators(Validators.maxLength(60));
    form
      .get('details.pages')!
      .setValidators([isCorrectPage, Validators.maxLength(60)]);
  }
}
const isCorrectPage: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pages = +control.value;
  if (isNaN(pages)) {
    return { isCorrectPage: true };
  }
  return null;
};

const tooShort =
  (minLength: number): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null =>
    control.value.length < minLength ? { tooShort: true } : null;

const max40Chars = (control: AbstractControl): ValidationErrors | null => {
  const firstNameLength = control.get('firstName')!.value.length;
  const lastNameLength = control.get('lastName')!.value.length;

  return firstNameLength + lastNameLength > 30 ? { tooLong: true } : null;
};
