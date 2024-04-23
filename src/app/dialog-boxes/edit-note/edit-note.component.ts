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
import { NoteData } from '../../../models/data';
import { NoteContentValidator } from '../../directives/note-validator.directive';
@Component({
  selector: 'app-edit-note',
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
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss',
})
export class EditNoteComponent {
  noteForm = new FormGroup({
    title: new FormControl(this.removeHlts(this.data.title)),
    content: new FormControl(this.removeHlts(this.data.content), [
      Validators.required,
      Validators.minLength(4),
      NoteContentValidator(/^\s*$/i),
    ]),
    bgColor: new FormControl(this.data.bgColor, [Validators.required]),
    fontColor: new FormControl(this.data.fontColor, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteData
  ) {
    console.log('data ::: ', data);
  }

  removeHlts(txt: string): string {
    const re1 = new RegExp("<span class='search-hlt'>", 'gi');
    const re2 = new RegExp('</span>', 'gi');
    return txt.replace(re1, '').replace(re2, '');
  }

  onCancelClick() {}

  onUpdateClick() {
    this.data.title = this.noteForm.controls.title.value as string;
    this.data.content = this.noteForm.controls.content.value as string;
    this.data.bgColor = this.noteForm.controls.bgColor.value as string;
    this.data.fontColor = this.noteForm.controls.fontColor.value as string;



    this.dialogRef.close(this.data);
  }
}
