import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appRescuerStatus]',
})
export class RescuerStatusDirective {
  status = input('n/a');
  el = inject(ElementRef);

  stylesEffect = effect(() => {
    switch (this.status().toLowerCase()) {
      case 'alarmed':
        this.el.nativeElement.style.backgroundColor = 'orange';
        break;
      case 'acknowledged':
        this.el.nativeElement.style.backgroundColor = 'green';
        break;
      case 'refused':
        this.el.nativeElement.style.backgroundColor = 'red';
        break;
      default:
        this.el.nativeElement.style.backgroundColor = 'grey';
        break;
    }
  });
}
