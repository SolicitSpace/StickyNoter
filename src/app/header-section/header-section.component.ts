import { Component, Inject } from '@angular/core';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddNewComponent } from '../add-new/add-new.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-section',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.scss',
})
export class HeaderSectionComponent {
  constructor(public dialog: MatDialog) {}

  open() {
    this.dialog.open(AddNewComponent);

    // let dialogRef = dialog.open(UserProfileComponent, {
    //   height: '400px',
    //   width: '600px',
    // });
  }
}
