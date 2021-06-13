import { NoteData } from "./noteData";

class NoteEditor{

    private saveNoteButton : HTMLButtonElement;
    private cancelNoteButton : HTMLButtonElement;
    private notePinButton : HTMLButtonElement;

    private noteTitleInput : HTMLInputElement;
    private noteContentTextArea : HTMLTextAreaElement;

    private setColorButton1 : HTMLButtonElement;
    private setColorButton2 : HTMLButtonElement;
    private setColorButton3 : HTMLButtonElement;
    private setColorButton4 : HTMLButtonElement;
    private setColorButton5 : HTMLButtonElement;

    private modalElement: HTMLElement;
    private modalHeader : HTMLElement;
    private modalFooter : HTMLElement;

    private data: NoteData;

    private saveNoteCallback: (note: NoteData) => void;


    constructor(saveNoteCallback: (note: NoteData) => void){
        this.saveNoteCallback = saveNoteCallback;
        this.initDocumentElements();
    }

    private initDocumentElements() {


        this.saveNoteButton = document.getElementById("save-note-details-button") as HTMLButtonElement;
        this.saveNoteButton.addEventListener('click', () => this.saveChanges());

        this.cancelNoteButton = document.getElementById("cancel-note-details-button") as HTMLButtonElement;
        this.cancelNoteButton.addEventListener('click', () => this.cancelChanges());

        this.notePinButton = document.getElementById("note-details-pin-button") as HTMLButtonElement;
        this.notePinButton.addEventListener('click', () => this.changePinnedStatus());

        this.setColorButton1 = document.getElementById("note-details-color1") as HTMLButtonElement;
        this.setColorButton1.addEventListener('click', () => this.setNewColor(1));

        this.setColorButton2 = document.getElementById("note-details-color2") as HTMLButtonElement;
        this.setColorButton2.addEventListener('click', () => this.setNewColor(2));

        this.setColorButton3 = document.getElementById("note-details-color3") as HTMLButtonElement;
        this.setColorButton3.addEventListener('click', () => this.setNewColor(3));

        this.setColorButton4 = document.getElementById("note-details-color4") as HTMLButtonElement;
        this.setColorButton4.addEventListener('click', () => this.setNewColor(4));

        this.setColorButton5 = document.getElementById("note-details-color5") as HTMLButtonElement;
        this.setColorButton5.addEventListener('click', () => this.setNewColor(5));

        this.noteTitleInput = document.getElementById("note-details-title") as HTMLInputElement;
        this.noteContentTextArea = document.getElementById("note-details-content") as HTMLTextAreaElement;

        this.modalElement = document.getElementById("note-modal") as HTMLElement;
        this.modalHeader = document.getElementById("note-details-header") as HTMLElement;
        this.modalFooter = document.getElementById("note-details-footer") as HTMLElement;
    }

    changePinnedStatus(){
        this.data.IsPinned = !this.data.IsPinned;
        this.updatePinnedStatus();
    }

    public show(noteData: NoteData = new NoteData()){

        this.data = noteData;

        this.noteTitleInput.value = this.data.Title;
        this.noteContentTextArea.value = this.data.Note;

        this.updatePinnedStatus();
        this.updateNoteColor();

        this.modalElement.classList.add('is-active');
    }

    private updatePinnedStatus() {
        if (this.data.IsPinned) {
            this.notePinButton.innerText = 'Odepnij';
        }
        else {
            this.notePinButton.innerText = 'Przypnij';
        }
    }

    private saveChanges(){
        this.data.Title = this.noteTitleInput.value;
        this.data.Note = this.noteContentTextArea.value;

        this.modalElement.classList.remove('is-active');
        this.saveNoteCallback(this.data);
    }

    private cancelChanges(){
        this.modalElement.classList.remove('is-active');
    }

    private setNewColor(colorNumber: number){
        this.data.Color = colorNumber;

        this.updateNoteColor();
    }

    private updateNoteColor(){        

        let classNameToAdd = NoteData.getColorClassName(this.data.Color);

        for (let i=1; i<=5; i++){
            let className = NoteData.getColorClassName(i);

            if (i == this.data.Color){
                this.modalHeader.classList.add(className);
                this.modalFooter.classList.add(className);
            }
            else{
                this.modalHeader.classList.remove(className);
                this.modalFooter.classList.remove(className);
            }
        }
    }
}

export {NoteEditor}