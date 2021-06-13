import { Note } from "./note";
import { NoteData } from "./noteData";
import { Storage } from "./storage";

class AllNotes{

    private notesCollection : Note[] = [];
    private notesDataCollection : NoteData[] = [];

    private filterText: string = '';

    private allNotesSectionElement: HTMLElement;

    private editNoteCallback: (note: NoteData) => void;

    constructor(editNoteCallback: (note: NoteData) => void){
        this.editNoteCallback = editNoteCallback;
        this.allNotesSectionElement = document.getElementById("all-notes-section");
    }

    public addOrUpdateNote(noteData: NoteData){
        this.removeNoteData(noteData.Id);
        this.notesDataCollection.push(noteData);

        this.refreshNotesCollection();
    }

    public refreshNotesCollection(filter: string = null) {
        
        this.notesCollection.forEach(element => {
            element.forceDelete();
        });
        this.notesCollection = [];

        if (filter != null){
            this.filterText = filter;
        }

        let filteredNotesDataCollection = this.notesDataCollection;

        if (this.filterText.length > 0){
            filteredNotesDataCollection = this.notesDataCollection.filter(x => x.Title.toLocaleLowerCase().includes(this.filterText.toLowerCase()) || x.Note.toLowerCase().includes(this.filterText.toLowerCase()))
        }

        let orderedNotesDataCollection = filteredNotesDataCollection.sort((a, b) => {
            if (a.IsPinned == b.IsPinned) {
                if (a.CreateDate > b.CreateDate)
                    return -1;
                else
                    return 1;
            }
            else if (a.IsPinned)
                return -1;
            else
                return 1;
        });

        for (let index = 0; index < orderedNotesDataCollection.length; index++) {
            let noteToAdd = new Note(orderedNotesDataCollection[index], this.allNotesSectionElement, (id) => this.removeNoteData(id), (note) => this.editNote(note));
            this.notesCollection.push(noteToAdd);
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