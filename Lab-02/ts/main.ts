/// <reference path='./record/allTracks.ts'/>

class Main{

    private allTracks = new AllTracks();
    private drums = new Drums();

    constructor(){
        let addButton = document.getElementById("addTrackId");
        addButton.addEventListener('click', () => this.addTrack());

        let playAllButton = document.getElementById("playTracksId");
        playAllButton.addEventListener('click', () => this.playAllTracks());

        this.drums.onDrumEvent = (e) => this.recordDrum(e)
    }

    private addTrack(){
        this.allTracks.addTrack();
    }

    private recordDrum(soundType: SoundTypeEnum){
        this.allTracks.recordDrum(soundType);
    }

    private playAllTracks(){
        this.allTracks.toggleAll();
    }

}