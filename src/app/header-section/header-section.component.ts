import { Component, EventEmitter, Inject, Output } from '@angular/core';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddNewComponent } from '../dialog-boxes/add-new/add-new.component';
import { MatIconModule } from '@angular/material/icon';
import { NoteDataService } from '../services/note-data.service';
import { NoteData } from '../../models/data';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-section',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.scss',
})
export class HeaderSectionComponent {
  @Output() searchValueEvt = new EventEmitter<string>();
  searchValue!: string;

  constructor(
    public dialog: MatDialog,
    private noteDataService: NoteDataService
  ) {}

  searchValChanged() {    
    this.searchValueEvt.emit(this.searchValue);
  }

  openAddNote() {
    const dialogReg = this.dialog.open(AddNewComponent, {
      height: '400px',
      width: '400px',
      data: { title: '', content: '' },
    });

    dialogReg.afterClosed().subscribe((res: NoteData) => {
      console.log('The dialog closed', res);
      if (res && res.content) {
        this.noteDataService.addNoteDataToLS(res);
      }
    });
  }
}
