import { Component, OnInit } from '@angular/core';
import { NoteDataService } from '../services/note-data.service';
import { NoteData } from '../../models/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-container.component.html',
  styleUrl: './notes-container.component.scss',
})
export class NotesContainerComponent implements OnInit {
  stickyNotesData!: NoteData[];
  constructor(private noteDataService: NoteDataService) {}

  ngOnInit() {
    console.log(this.noteDataService.getNoteDataFromLS());
    this.stickyNotesData = this.noteDataService.getNoteDataFromLS();
  }
}
