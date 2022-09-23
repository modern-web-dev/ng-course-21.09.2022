import { parseHostBindings } from '@angular/compiler';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ba-validation-message[of]',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
  host: {
    class: 'invalid-feedback',
  },
})
export class ValidationMessageComponent {
  errorText: Record<string, string> = {
    required: 'Required',
    isCorrectPage: 'Cannot be parsed',
  };
  @Input('of')
  control!: AbstractControl | null;

  // @HostBinding('class.invalid-feedback')
  // invalidFeedbackClass = true;

  get formErrors() {
    if (this.control) {
      return Object.entries(this.control.errors || {});
    }
    return [];
  }
  getErrorText(errorId: string): string {
    return this.errorText[errorId];
  }
}
