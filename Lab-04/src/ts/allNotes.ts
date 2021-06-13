import { Note } from "./note";
import { NoteData } from "./noteData";
import { Storage } from "./storage";

class AllNotes{

    private notesCollection : Note[] = [];

    private allNotesSectionElement: HTMLElement;

    private editNoteCallback: (note: NoteData) => void;

    constructor(editNoteCallback: (note: NoteData) => void){
        this.editNoteCallback = editNoteCallback;
        this.allNotesSectionElement = document.getElementById("all-notes-section");
    }

    public addOrUpdateNote(noteData: NoteData){
        this.notesCollection.push(new Note(noteData,this.allNotesSectionElement, (id) => this.removeNote(id), (note) => this.editNote(note)))
    }

    private removeNote(id: string){

    }

    private editNote(noteData: NoteData){
        this.editNoteCallback(noteData);
    }
}

export {AllNotes}