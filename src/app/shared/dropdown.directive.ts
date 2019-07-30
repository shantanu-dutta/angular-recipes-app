import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') toShow = false;

  @HostListener('click') toggleShow() {
    this.toShow = !this.toShow;
  }
}
