import { Directive, HostListener, Renderer2, ElementRef, HostBinding } from '@angular/core';


@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isClassAdded: boolean = false;

    constructor(private elRef: ElementRef, private renderer: Renderer2) { }

    @HostListener('click') onToggleOpen(eventData: Event){
        this.isClassAdded = !this.isClassAdded;
    }
}