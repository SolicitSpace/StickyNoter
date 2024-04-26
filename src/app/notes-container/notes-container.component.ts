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

@Component({
  selector: 'app-notes-container',
  standalone: true,
  templateUrl: './notes-container.component.html',
  styleUrl: './notes-container.component.scss',
  imports: [
    CommonModule,
    NoteComponent,
    NotePlacementDirective,
    SearchNotesDirective,
  ],
})
export class NotesContainerComponent implements OnInit {
  notesData!: NoteData[];
  @Input() searchValue!: string;
  @ViewChild('notesContainer', { static: true }) notesContainer!: ElementRef;

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


  ////--------------------------------------------
  ////--------------------------------------------
  draggedNote!: NoteData;

  onNoteDragStart(noteData: NoteData) {
    console.log("Dragging start");    
    this.draggedNote = noteData;

    

//     months.splice(1, 0, months[3]);
// // Inserts at index 1
// console.log(months);

// months.splice(4, 1);

  }
  onNoteDragEnd(noteData: NoteData) {
    // console.log("Dragging end", noteData);    

  }
  onNoteDragEnter(noteData: NoteData) {
    if (noteData.id == this.draggedNote.id) return;
    console.log("Dragging enter", noteData);    

  }
  onNoteDragOver(noteData: NoteData) {
    if (noteData.id == this.draggedNote.id) return;
    console.log("Dragging enter", noteData);    
  }
  onNoteDragLeave(noteData: NoteData, evt: Event, noteTemplateRef: NoteComponent) {
    if (noteData.id == this.draggedNote.id) return;
    // console.log("Dragging Leave", noteData, evt, noteTemplateRef);    

  }
  onNoteDragDrop(noteData: NoteData) {
    if (noteData.id == this.draggedNote.id) return;

  }


}
