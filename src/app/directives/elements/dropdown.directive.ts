import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen:boolean = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    if(this.isOpen)
      this.elRef.nativeElement.querySelector('.dropdown-menu').classList.add('show');
    else
      this.elRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
  }

  
  constructor(private elRef: ElementRef) { }


}
