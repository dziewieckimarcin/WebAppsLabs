/// <reference path='singleTrack.ts'/>
/// <reference path='soundTypeEnum.ts'/>

class AllTracks{

    private tracksColection: SingleTrack[] = [];

    constructor(){
        this.addTrack();
    }

    public addTrack(){
        let track = new SingleTrack();
        track.playAllEvent = () => this.playAll();
        track.stopAllEvent = () => this.stopAll();
        this.tracksColection.push(track);

    }

    public recordDrum(soundType: SoundTypeEnum){
        this.tracksColection.forEach(element => {
            element.addTrackElement(soundType);
        });
    }



    public toggleAll(){
        let flag = false;
        this.tracksColection.forEach((element) => {
            if (element.checkIsPlaying()){
                flag = true;
            }
        });

        if (flag){
            this.stopAll();
        }
        else{
            this.playAll();
        }
    }

    private playAll(){
        this.tracksColection.forEach((element) => {
            element.playTrack();
        });
    }

    private stopAll(){
        this.tracksColection.forEach((element) => {
            element.stopPlay();
        });
    }
}