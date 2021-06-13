import { AllNotes } from "./allNotes";
import { Note } from "./note";
import { NoteData } from "./noteData";
import { NoteEditor } from "./noteEditor";

class App{

    private addNewNoteButton : HTMLButtonElement;

    private noteEditor: NoteEditor;
    // private addInput : HTMLInputElement;

    // private allNotes = new AllNotes((cityName, cords) => this.showForecast(cityName, cords));
    // private forecast = new Note();
    
    constructor(){
        this.initDocumentElements();

        this.noteEditor = new NoteEditor((note: NoteData) => this.addOrUpdateNote(note))
    }

    addOrUpdateNote(note: NoteData){
        // toDo: implement pass event
        console.log(note);
    }

    // private async showForecast(cityName: string, cords: Coord){
    //     await this.forecast.showForecast(cityName, cords);
    // }

    private initDocumentElements() {
        this.addNewNoteButton = document.getElementById("add-new-note-button") as HTMLButtonElement;
        this.addNewNoteButton.addEventListener('click', () => this.noteEditor.show());

    }

    // private async addNewNote(){
    //     let cityName = this.addInput.value;
    //     await this.allNotes.addCityWeather(cityName);
    // }
}

export {App}