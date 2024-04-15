import { Injectable } from '@angular/core';
import { NoteData } from '../../models/data';

@Injectable({
  providedIn: 'root',
})
export class NoteDataService {
  constructor() {}

  initStickyNotesData() {
    if (!localStorage.getItem('StickyNotesData'))
      localStorage.setItem('StickyNotesData', '[]');
  }

  addNoteDataToLS(noteData: NoteData) {
    let notesData: NoteData[] = this.getNoteDataFromLS();
    noteData.id = Date.now();
    notesData.push(noteData);
    localStorage.setItem('StickyNotesData', JSON.stringify(notesData));

    window.dispatchEvent(new Event('storage'));
  }

  getNoteDataFromLS(): NoteData[] {
    this.initStickyNotesData();
    return JSON.parse(localStorage.getItem('StickyNotesData') as string);
  }

  setNotePlacementFromLS(noteData: NoteData) {
    // get the id
    const notesData = this.getNoteDataFromLS();

    let index = notesData.findIndex(
      (note: NoteData) => note.id === noteData.id
    );

    notesData[index].placement = noteData.placement;
    localStorage.setItem('StickyNotesData', JSON.stringify(notesData));
  }

  deleteNoteFromLS(noteId: number) {
    const notesData = this.getNoteDataFromLS();

    notesData.splice(
      notesData.findIndex((note: NoteData) => note.id === noteId),
      1
    );
    localStorage.setItem('StickyNotesData', JSON.stringify(notesData));

    window.dispatchEvent(new Event('storage'));
  }
}
