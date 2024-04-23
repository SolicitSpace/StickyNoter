import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NoteDataService } from '../services/note-data.service';
import { NoteData } from '../../models/data';

@Directive({
  selector: '[searchTerm]',
  standalone: true,
})
export class SearchNotesDirective implements OnChanges {
  @Input() searchTerm!: string;
  @Output() searchOutputEvt = new EventEmitter<NoteData[]>();

  constructor(private noteDataService: NoteDataService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.hasOwnProperty('searchTerm')) return;

    const notesData = this.noteDataService.getNoteDataFromLS();
    if (this.searchTerm.trim() == '') {
      this.searchOutputEvt.emit(notesData);
      return;
    }

    let searchResultData: NoteData[] = [];

    // Checking the searchterm in the title and content
    notesData.forEach((data) => {
      if (
        (data.title &&
          data.title.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        data.content.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) {
        const re = new RegExp(this.searchTerm, 'gi');

        let hltTitle = data.title.replace(
          re,
          `<span class='search-hlt'>$&</span>`
        );
        data.title = hltTitle;

        let hltContent = data.content.replace(
          re,
          `<span class='search-hlt'>$&</span>`
        );
        data.content = hltContent;

        searchResultData.push(data);
      }
    });

    // if (searchResultData.length > 0)
    //   searchResultData[0].content = `<span class='search-hlt'>123</span>`;

    // console.log(this.searchTerm, searchResultData);

    // title & content
    this.searchOutputEvt.emit(searchResultData);
  }
}
