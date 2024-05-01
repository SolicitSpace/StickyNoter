import { Component, Input, OnInit } from '@angular/core';
import { NoteDataService } from '../services/note-data.service';
import { NoteData } from '../../models/data';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';
import { NotePlacementDirective } from '../directives/note-placement.directive';
import { SearchNotesDirective } from '../directives/search-notes.directive';
import _ from 'lodash';
import { NoteDragDirective } from '../directives/note-drag.directive';
import { NoteContainerAdjustGridColDirective } from '../directives/note-container-adjust-grid-col.directive';

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
    NoteContainerAdjustGridColDirective,
    SearchNotesDirective,
  ],
})
export class NotesContainerComponent implements OnInit {
  notesData!: NoteData[];
  @Input() searchValue!: string;
  draggedNote!: NoteData;

  constructor(private noteDataService: NoteDataService) {}

  ngOnInit() {
    this.getAndSetStickyNotesData();
    this.onStorageChangeListener();
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
