import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NoteDataService } from '../services/note-data.service';
import { NoteData } from '../../models/data';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';
import { NotePlacementDirective } from '../directives/note-placement.directive';
import { SearchNotesDirective } from '../directives/search-notes.directive';
import _ from 'lodash';
import { NoteDragDirective } from '../directives/note-drag.directive';

@Component({
  selector: 'app-notes-container',
  standalone: true,
  templateUrl: './notes-container.component.html',
  styleUrl: './notes-container.component.scss',
  imports: [
    CommonModule,
    NoteComponent,
    NotePlacementDirective,
    NoteDragDirective,
    SearchNotesDirective,
  ],
})
export class NotesContainerComponent implements OnInit {
  notesData!: NoteData[];
  @Input() searchValue!: string;
  @ViewChild('notesContainer', { static: true }) notesContainer!: ElementRef;
  draggedNote!: NoteData;

  constructor(private noteDataService: NoteDataService) {}

  ngOnInit() {
    this.getAndSetStickyNotesData();
    this.onStorageChangeListener();
  }

  ngAfterViewInit() {
    this.reAdjustGridColumns();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.reAdjustGridColumns();
  }

  /**
   * Function for setting number of columns to be allowed as per screen size
   * @returns
   */
  reAdjustGridColumns() {
    const notesContainer = this.notesContainer.nativeElement;
    if (notesContainer.children.length == 0) return;
    const noteWidth = notesContainer.children[0].offsetWidth;
    const numOfCol = Math.max(
      Math.floor(window.innerWidth / noteWidth - 0.5),
      1
    ); // added 0.5 adjuster to account for the grid gap
    notesContainer.style.gridTemplateColumns = `repeat(${numOfCol}, 1fr)`;
  }

  onStorageChangeListener() {
    window.addEventListener('storage', () => {
      this.getAndSetStickyNotesData();
    });
  }

  getAndSetStickyNotesData() {
    this.notesData = this.noteDataService.getNoteDataFromLS();
  }

  showSearchResults(notesData: NoteData[]) {
    this.notesData = notesData;
  }

  // setting the dragged note
  onNoteDragStart(event: any, noteData: NoteData) {
    this.draggedNote = noteData;
  }
}
