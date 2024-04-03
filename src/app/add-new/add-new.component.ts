import { Component, Inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoteData } from '../../models/data';
import { NoteContentValidator } from '../directives/note-validator.directive';

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.scss',
})
export class AddNewComponent {
  noteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      NoteContentValidator(/^\s*$/i)
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteData
  ) {}

  onCancelClick() {
    console.log(this.noteForm.status);
  }

  onPostClick() {
    this.dialogRef.close(this.data);
  }
}
