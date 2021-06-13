import { Note } from "./note";
import { NoteData } from "./noteData";
import { Storage } from "./storage";

class AllNotes{

    private notesCollection : Note[] = [];
    private notesDataCollection : NoteData[] = [];

    private allNotesSectionElement: HTMLElement;

    private editNoteCallback: (note: NoteData) => void;

    constructor(editNoteCallback: (note: NoteData) => void){
        this.editNoteCallback = editNoteCallback;
        this.allNotesSectionElement = document.getElementById("all-notes-section");
    }

    public addOrUpdateNote(noteData: NoteData){
        this.removeNoteData(noteData.Id);
        this.notesDataCollection.push(noteData);

        this.notesCollection.forEach(element => {
            element.forceDelete();
        });
        this.notesCollection = [];
        
        for (let index = 0; index < this.notesDataCollection.length; index++) {
            let noteToAdd = new Note(this.notesDataCollection[index],this.allNotesSectionElement, (id) => this.removeNoteData(id), (note) => this.editNote(note))
        this.notesCollection.push(noteToAdd)  
        }
    }

    private removeNoteData(id: string){
        this.notesDataCollection = this.notesDataCollection.filter(x => x.Id != id);
    }

    private editNote(noteData: NoteData){
        this.editNoteCallback(noteData);
    }
}

export {AllNotes}