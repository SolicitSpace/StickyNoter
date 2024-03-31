import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesContainerComponent } from "./notes-container/notes-container.component";
import { HeaderSectionComponent } from "./header-section/header-section.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, NotesContainerComponent, HeaderSectionComponent]
})
export class AppComponent {
  title = 'StickyNoter';
}
