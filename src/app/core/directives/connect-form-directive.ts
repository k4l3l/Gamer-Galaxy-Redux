import { Directive, Input } from '@angular/core';
import { FormGroupDirective, FormBuilder, Validators, FormArray } from '@angular/forms';

@Directive({ selector: '[connectForm]' })
export class ConnectFormDirective {
  @Input('connectForm')
  set data(val: any) {
    if (val) {
      const genres = [...val.genres];
      const formArr = this.formGroupDirective.form.get('genres') as FormArray;
      genres.forEach(e => formArr.push(this.fb.group({
        genre: [e , [Validators.required]]
      })));
      this.formGroupDirective.form.patchValue(val);
      this.formGroupDirective.form.markAsPristine();
    }
  }
  constructor(
      private formGroupDirective: FormGroupDirective,
      private fb: FormBuilder
      ) {}
}
