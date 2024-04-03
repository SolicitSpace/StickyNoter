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
    this.initStickyNotesData();
    let stickyNotesData: Object[] = JSON.parse(
      localStorage.getItem('StickyNotesData') as string
    );

    stickyNotesData.push(noteData);
    localStorage.setItem('StickyNotesData', JSON.stringify(stickyNotesData));
  }

  getNoteDataFromLS(): NoteData[] {
    this.initStickyNotesData();
    return JSON.parse(localStorage.getItem('StickyNotesData') as string);
  }
}
