/// <reference path='./record/allTracks.ts'/>

class Main{

    private allTracks = new AllTracks();
    private drums = new Drums();

    constructor(){
        let addButton = document.getElementById("addTrackId");
        addButton.addEventListener('click', () => this.addTrack());
    }

    private addTrack(){
        this.allTracks.addTrack();
    }

}