import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'ba-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  title: string = '';

  @Input()
  headerTemplate!: TemplateRef<any> | null;
}
