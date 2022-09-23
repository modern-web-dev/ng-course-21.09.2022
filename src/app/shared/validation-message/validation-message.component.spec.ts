import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { ValidationMessageComponent } from './validation-message.component';

describe('ValidationMessageComponent', () => {
  describe('[HTML Test]', () => {
    let component: ValidationMessageComponent;
    let fixture: ComponentFixture<ValidationMessageComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ValidationMessageComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ValidationMessageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show one error', () => {
      //given
      const control = new FormControl('');
      component.control = control;
      //when
      control.setErrors({ required: true });

      fixture.detectChanges();
      //then
      expect(control.invalid).toBeTrue();
      const componentNativeElement = fixture.nativeElement as HTMLElement;
      const spans =
        componentNativeElement.querySelectorAll<HTMLElement>('span');
      expect(spans.length).toBe(1);
      expect(spans[0].innerText).toBe(' Required ');
    });

    it('should show real error', () => {
      //given
      const control = new FormControl('');
      component.control = control;
      //when
      control.addValidators(Validators.required);
      control.updateValueAndValidity();

      fixture.detectChanges();
      //then
      expect(control.invalid).toBeTrue();
      const componentNativeElement = fixture.nativeElement as HTMLElement;
      const spans =
        componentNativeElement.querySelectorAll<HTMLElement>('span');
      expect(spans.length).toBe(1);
      expect(spans[0].innerText).toBe(' Required ');
    });
  });
});
