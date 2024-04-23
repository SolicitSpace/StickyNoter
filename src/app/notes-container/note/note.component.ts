import { Component, Input } from '@angular/core';
import { NoteData } from '../../../models/data';
import { NoteDataService } from '../../services/note-data.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { EditNoteComponent } from '../../dialog-boxes/edit-note/edit-note.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'note',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input() noteData!: NoteData;

  constructor(public dialog: MatDialog, private noteDataService: NoteDataService) {}

  deleteNote(noteId: number) {
    this.noteDataService.deleteNoteFromLS(noteId);
  }

  openEditNote() {
    const dialogReg = this.dialog.open(EditNoteComponent, {
      height: '400px',
      width: '400px',
      data: this.noteData,
    });

    dialogReg.afterClosed().subscribe((res: NoteData) => {
      console.log('The dialog closed', res);
      if (res && res.content) {
        this.noteDataService.updateNoteDataToLS(res);
      }
    });
  }
}
