/// <reference path='./record/allTracks.ts'/>

class Main{

    private allTracks = new AllTracks();
    private drums = new Drums();

    constructor(){
        let addButton = document.getElementById("addTrackId");
        addButton.addEventListener('click', () => this.addTrack());

        this.drums.onDrumEvent = (e) => this.recordDrum(e)
    }

    private addTrack(){
        this.allTracks.addTrack();
    }

    private recordDrum(soundType: SoundTypeEnum){
        this.allTracks.recordDrum(soundType);
    }

}