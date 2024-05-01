import {
  AfterViewInit,
  Directive,
  HostListener,
  OnInit,
  ViewContainerRef,
  Component,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[noteContainerAdjustGridCol]',
  standalone: true,
})
export class NoteContainerAdjustGridColDirective implements AfterViewInit {
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.adjustGridColumns();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.adjustGridColumns();
  }

  /**
   * Function for setting number of columns to be allowed as per screen size
   * @returns
   */
  adjustGridColumns() {
    const notesContainer = this.elRef.nativeElement;
    if (notesContainer.children.length == 0) return;
    const noteWidth = notesContainer.children[0].offsetWidth;
    const numOfCol = Math.max(
      Math.floor(window.innerWidth / noteWidth - 0.5),
      1
    ); // added 0.5 adjuster to account for the grid gap
    notesContainer.style.gridTemplateColumns = `repeat(${numOfCol}, 1fr)`;
  }
}
