/// <reference path='singleTrack.ts'/>
/// <reference path='soundTypeEnum.ts'/>

class AllTracks{

    private tracksColection: SingleTrack[] = [];

    constructor(){
        this.addTrack();
    }

    public addTrack(){
        this.tracksColection.push(new SingleTrack());
    }

    public recordDrum(soundType: SoundTypeEnum){
        this.tracksColection.forEach(element => {
            element.addTrackElement(soundType);
        });
    }
}