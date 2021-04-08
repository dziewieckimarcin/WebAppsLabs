/// <reference path='singleTrack.ts'/>

class AllTracks{

    private tracksColection: SingleTrack[] = [];

    constructor(){
        this.addTrack();
    }

    public addTrack(){
        this.tracksColection.push(new SingleTrack());
    }
}