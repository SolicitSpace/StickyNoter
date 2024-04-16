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

  reAdjustGridColumns() {
    const noteWidth = this.notesContainer.nativeElement.children[0].offsetWidth;
    const numOfCol = Math.max(
      Math.floor(window.innerWidth / noteWidth - 0.5),
      1
    ); // added 0.5 adjuster to account for the grid gap
    this.notesContainer.nativeElement.style.gridTemplateColumns = `repeat(${numOfCol}, 1fr)`;
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
}
