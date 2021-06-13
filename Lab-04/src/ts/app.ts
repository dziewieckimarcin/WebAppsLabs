import { AllNotes } from "./allNotes";
import { NoteData } from "./noteData";
import { NoteEditor } from "./noteEditor";

class App{

    private addNewNoteButton : HTMLButtonElement;
    private filterInputElement : HTMLInputElement;
    private clearFilterButton : HTMLButtonElement;

    private noteEditor: NoteEditor;
    private allNotes: AllNotes;
    
    constructor(){
        this.initDocumentElements();

        this.noteEditor = new NoteEditor((note: NoteData) => this.addOrUpdateNote(note))
        this.allNotes = new AllNotes((note: NoteData) => this.editNote(note))
    }
    editNote(note: NoteData) {
        this.noteEditor.show(note);
    }

    addOrUpdateNote(note: NoteData){
        this.allNotes.addOrUpdateNote(note);
    }

    private initDocumentElements() {
        this.addNewNoteButton = document.getElementById("add-new-note-button") as HTMLButtonElement;
        this.addNewNoteButton.addEventListener('click', () => this.noteEditor.show());

        this.filterInputElement = document.getElementById("search-notes-input") as HTMLInputElement;
        this.filterInputElement.addEventListener('input', () => this.filterNotes());

        this.clearFilterButton = document.getElementById("clear-search-button") as HTMLButtonElement;
        this.clearFilterButton.addEventListener('click', () => this.clearFilterInput());
    }

    filterNotes(){
        this.allNotes.refreshNotesCollection(this.filterInputElement.value);
    }

    clearFilterInput(){
        this.filterInputElement.value = '';
        this.filterNotes();
    }
}

export {App}