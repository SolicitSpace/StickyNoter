import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { NoteData } from '../../models/data';
import { NoteComponent } from '../notes-container/note/note.component';
import { NoteDataService } from '../services/note-data.service';
import _ from 'lodash';

@Directive({
  selector: '[noteDrag]',
  standalone: true,
})
export class NoteDragDirective implements OnInit {
  @Input('notesData') notesData!: NoteData[];
  @Input('noteDrag') draggedNote!: NoteData;
  targetNote!: NoteData;

  constructor(
    private host: NoteComponent,
    private noteDataService: NoteDataService
  ) {}

  ngOnInit() {}

  // This one is written in notes-container.component as we needed it
  // in outer scope
  // @HostListener('dragstart')
  // onNoteDragStart() {
  //   this.draggedNote = this.host.noteData;
  // }

  @HostListener('dragenter', ['$event'])
  onNoteDragEnter(event: any) {
    event.preventDefault();

    // Avoiding note triggering drag enter on self
    if (this.host.noteData.id == this.draggedNote.id) return;

    this.targetNote = this.host.noteData;

    console.log('=> ', this.targetNote);
  }

  @HostListener('dragover', ['$event'])
  onNoteDragOver(event: any) {
    // Required for the drop event to trigger
    event.preventDefault();
  }

  @HostListener('drop')
  onNoteDragDrop() {
    // Avoiding if the note dragged dropped on self
    if (this.host.noteData.id == this.draggedNote.id) return;

    // getting the indexes
    const draggedNoteIndex = _.findIndex(this.notesData, {
      id: this.draggedNote.id,
    });
    const targetNoteIndex = _.findIndex(this.notesData, {
      id: this.targetNote.id,
    });

    // removing the Dragged Note from array to avoid duplication on repos it
    this.notesData.splice(draggedNoteIndex, 1);

    // Appending the dragged note to required pos
    this.notesData.splice(targetNoteIndex, 0, this.draggedNote);

    // If we want notes to swap places
    // // Swapping the pos of dragged notes with the target/dragged-dropped note
    // [this.notesData[draggedNoteIndex], this.notesData[targetNoteIndex]] = [
    //   this.notesData[targetNoteIndex],
    //   this.notesData[draggedNoteIndex],
    // ];

    // this.pushForward(targetNoteIndex)
    // this.notesData[draggedNoteIndex] = this.notesData[targetNoteIndex]

    // saving in localstorage
    this.noteDataService.setNotesDataLS(this.notesData);
  }
}
