import { AllNotes } from "./allNotes";
import { NoteData } from "./noteData";
import { NoteEditor } from "./noteEditor";

class App{

    private addNewNoteButton : HTMLButtonElement;

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

    }
}

export {App}