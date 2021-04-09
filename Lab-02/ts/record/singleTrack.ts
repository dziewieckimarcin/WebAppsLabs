/// <reference path='trackElement.ts'/>
/// <reference path='sounds.ts'/>
/// <reference path='soundTypeEnum.ts'/>

class SingleTrack{

    private currentElement: HTMLElement;
    private onOffButton: HTMLButtonElement;
    private playTrackButton: HTMLButtonElement;
    private recordButton: HTMLButtonElement;
    private recordWithBackgroundButton: HTMLButtonElement;
    private removeButton: HTMLButtonElement;
    private progressBar: HTMLProgressElement;

    private isOn: boolean = true;
    private isRecording: boolean = false;
    private isRecordingWithBackground: boolean = false;
    private isPlaying:boolean = false;

    private elements: TrackElement[] = [];
    private timeVector: number;

    private sounds: Sounds

    constructor(){
        this.create(document.getElementById("tracks-section"));
        this.setButtonDefaults();
        this.addButtonListeners();
    }

    public addTrackElement(sound: SoundTypeEnum){
        if (this.isRecording || this.isRecordingWithBackground){
            let timeNow = performance.now();
            this.elements.push(new TrackElement(sound, timeNow - this.timeVector));
            this.timeVector = timeNow;
        }
    }

    private startRecording(){
        this.elements = [];
        this.timeVector = performance.now();;
    }

    private create(parentElement: HTMLElement){
        this.currentElement = document.createElement('div');
        this.currentElement.className = 'box py-2 my-2';

        this.progressBar = document.createElement('progress');
        this.progressBar.className = 'progress is-danger my-4';
        this.progressBar.value = 0;
        this.progressBar.max = 100;

        let field = document.createElement('div');
        field.className = 'field is-grouped is-grouped-centered';

        let controlOnOffButton = document.createElement('div');
        controlOnOffButton.className = 'control py-1';

        let controlPlayTrackButton = document.createElement('div');
        controlPlayTrackButton.className = 'control py-1';

        let controlRecordButton = document.createElement('div');
        controlRecordButton.className = 'control py-1';

        let controlRecordWithBackgroundButton = document.createElement('div');
        controlRecordWithBackgroundButton.className = 'control py-1';

        let controlRemoveButton = document.createElement('div');
        controlRemoveButton.className = 'control py-1';


        this.onOffButton = document.createElement('button');
        this.onOffButton.className = 'button';
        this.onOffButton.innerText = "On/Off";

        this.playTrackButton = document.createElement('button');
        this.playTrackButton.className = 'button';
        this.playTrackButton.innerText = "Play/Stop Track";

        this.recordButton = document.createElement('button');
        this.recordButton.className = 'button';
        this.recordButton.innerText = "Start/Stop Record";

        this.recordWithBackgroundButton = document.createElement('button');
        this.recordWithBackgroundButton.className = 'button';
        this.recordWithBackgroundButton.innerText = "Start/Stop Record with Background";

        this.removeButton = document.createElement('button');
        this.removeButton.className = 'button is-danger';
        this.removeButton.innerText = "Remove";


        controlOnOffButton.appendChild(this.onOffButton);
        controlPlayTrackButton.appendChild(this.playTrackButton);
        controlRecordButton.appendChild(this.recordButton);
        controlRecordWithBackgroundButton.appendChild(this.recordWithBackgroundButton);
        controlRemoveButton.appendChild(this.removeButton);

        field.appendChild(controlOnOffButton);
        field.appendChild(controlPlayTrackButton);
        field.appendChild(controlRecordButton);
        field.appendChild(controlRecordWithBackgroundButton);
        field.appendChild(controlRemoveButton);

        this.currentElement.appendChild(this.progressBar);
        this.currentElement.appendChild(field);

        parentElement.appendChild(this.currentElement);
    }

    private addButtonListeners(){
        this.removeButton.addEventListener("click", () => this.remove());
        this.onOffButton.addEventListener("click", () => this.toggleOnOff());
        this.recordButton.addEventListener("click", () => this.toggleRecord());
        this.recordWithBackgroundButton.addEventListener("click", () => this.toggleRecordWithBackground());
        this.playTrackButton.addEventListener("click", () => this.togglePlayTrack());
    }

    private setButtonDefaults(){
        this.setOnOffButtonsStyle();
        this.setRecordButtonsStyle();
        this.setRecordWithBackgroundButtonsStyle();
        this.setPlayTrackButtonsStyle();
    }

    private remove(){
        this.currentElement.parentElement.removeChild(this.currentElement);
    }

    private toggleOnOff(){
        this.isOn = !this.isOn;
        this.setOnOffButtonsStyle();
    }

    private setOnOffButtonsStyle(){
        if (this.isOn){
            this.onOffButton.classList.add("is-success");
            this.onOffButton.classList.remove("is-danger");
            this.onOffButton.classList.remove("is-light");

            this.playTrackButton.classList.remove("is-static");
            this.recordButton.classList.remove("is-static");
            this.recordWithBackgroundButton.classList.remove("is-static");
        }
        else{
            this.onOffButton.classList.remove("is-success");
            this.onOffButton.classList.add("is-danger");
            this.onOffButton.classList.add("is-light");

            this.playTrackButton.classList.add("is-static");
            this.recordButton.classList.add("is-static");
            this.recordWithBackgroundButton.classList.add("is-static");
        } 
    }

    private toggleRecord(){
        this.isRecording = !this.isRecording;
        this.setRecordButtonsStyle();

        if (this.isRecording)
            this.startRecording();
        else
            console.log(this.elements);

    }

    private setRecordButtonsStyle(){
        if (this.isRecording){
            this.recordButton.classList.add("is-danger");
            this.recordButton.classList.remove("is-info");

            this.onOffButton.classList.add("is-static");
            this.playTrackButton.classList.add("is-static");
            this.recordWithBackgroundButton.classList.add("is-static");
            this.removeButton.classList.add("is-static");
        }
        else{
            this.recordButton.classList.remove("is-danger");
            this.recordButton.classList.add("is-info");

            this.onOffButton.classList.remove("is-static");
            this.playTrackButton.classList.remove("is-static");
            this.recordWithBackgroundButton.classList.remove("is-static");
            this.removeButton.classList.remove("is-static");
        } 
    }

    private toggleRecordWithBackground(){
        this.isRecordingWithBackground = !this.isRecordingWithBackground;
        this.setRecordWithBackgroundButtonsStyle();
    }

    private setRecordWithBackgroundButtonsStyle(){
        if (this.isRecordingWithBackground){
            this.recordWithBackgroundButton.classList.add("is-danger");
            this.recordWithBackgroundButton.classList.remove("is-info");

            this.onOffButton.classList.add("is-static");
            this.playTrackButton.classList.add("is-static");
            this.recordButton.classList.add("is-static");
            this.removeButton.classList.add("is-static");
        }
        else{
            this.recordWithBackgroundButton.classList.remove("is-danger");
            this.recordWithBackgroundButton.classList.add("is-info");

            this.onOffButton.classList.remove("is-static");
            this.playTrackButton.classList.remove("is-static");
            this.recordButton.classList.remove("is-static");
            this.removeButton.classList.remove("is-static");
        } 

    }

    private togglePlayTrack(){
        this.isPlaying = !this.isPlaying;
        this.setPlayTrackButtonsStyle();
    }

    private setPlayTrackButtonsStyle(){
        if (this.isPlaying){
            this.playTrackButton.classList.add("is-danger");
            this.playTrackButton.classList.remove("is-success");

            this.onOffButton.classList.add("is-static");
            this.recordButton.classList.add("is-static");
            this.recordWithBackgroundButton.classList.add("is-static");
            this.removeButton.classList.add("is-static");
        }
        else{
            this.playTrackButton.classList.remove("is-danger");
            this.playTrackButton.classList.add("is-success");

            this.onOffButton.classList.remove("is-static");
            this.recordButton.classList.remove("is-static");
            this.recordWithBackgroundButton.classList.remove("is-static");
            this.removeButton.classList.remove("is-static");
        } 

    }

}