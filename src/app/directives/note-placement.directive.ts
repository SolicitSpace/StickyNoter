import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { NoteData } from '../../models/data';
import { NoteDataService } from '../services/note-data.service';

@Directive({
  selector: '[notePlacement]',
  standalone: true,
})
export class NotePlacementDirective implements OnInit {
  morphedRotVal!: string;
  @Input() noteData!: NoteData; // used the same one from note.component. Can reuse.

  constructor(
    private elRef: ElementRef,
    private noteDataService: NoteDataService
  ) {}

  @HostListener('mouseover') onMouseOver() {
    this.elRef.nativeElement.style.transform = `rotate(0)`;
    this.elRef.nativeElement.style.overflowY = `auto`;
  }
  @HostListener('mouseout') onMouseOut() {
    this.elRef.nativeElement.style.transform = this.morphedRotVal;
    this.elRef.nativeElement.style.overflowY = `hidden`;
    this.elRef.nativeElement.scrollTop = 0;
  }

  getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  setNoteRandomRotation() {
    const arr = [-1, 1];
    this.elRef.nativeElement.style.transform = `rotate(${
      arr[this.getRandomInt(0, arr.length)]
    }deg)`;
    this.morphedRotVal = this.elRef.nativeElement.style.transform;
    this.noteData.placement = this.morphedRotVal;
  }

  setNoteRotationAsPerPlacement() {
    this.elRef.nativeElement.style.transform = this.noteData.placement;
    this.morphedRotVal = this.elRef.nativeElement.style.transform;
  }

  ngOnInit(): void {
    // If notes placement is not set and generate one randomly and save
    if (!this.noteData.placement) {
      this.setNoteRandomRotation();
      this.noteDataService.setNotePlacementFromLS(this.noteData);
    }
    // Since the note placement is already saved use that instead.
    else this.setNoteRotationAsPerPlacement();
  }
}
