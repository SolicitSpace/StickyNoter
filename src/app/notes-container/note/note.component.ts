import { Component, Input } from '@angular/core';
import { NoteData } from '../../../models/data';
import { NoteDataService } from '../../services/note-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {

  @Input() noteData!: NoteData;

  constructor(private noteDataService: NoteDataService) {}

  deleteNote(noteId: number) {
    this.noteDataService.deleteNoteFromLS(noteId);
  }
}
