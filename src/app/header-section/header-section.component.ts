import { Component, Inject } from '@angular/core';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddNewComponent } from '../add-new/add-new.component';
import { MatIconModule } from '@angular/material/icon';
import { NoteDataService } from '../services/note-data.service';
import { NoteData } from '../../models/data';

@Component({
  selector: 'app-header-section',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.scss',
})
export class HeaderSectionComponent {
  constructor(
    public dialog: MatDialog,
    private noteDataService: NoteDataService
  ) {}

  open() {
    const dialogReg = this.dialog.open(AddNewComponent, {
      height: '400px',
      width: '400px',
      data: { title: '', content: '' },
    });

    dialogReg.afterClosed().subscribe((res: NoteData) => {
      console.log('The dialog closed', res);
      if (res.content) this.noteDataService.addNoteDataToLS(res);
    });
  }
}
