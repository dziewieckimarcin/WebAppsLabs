/// <reference path='./record/soundTypeEnum.ts'/>
/// <reference path='./record/sounds.ts'/>

class Drums{

    private sounds = new Sounds();

    constructor(){
        document.addEventListener("keypress", (e) => this.onKeyPress(e));
    }


    private onKeyPress(e: KeyboardEvent){
        switch (e.key.toUpperCase()) {
            case 'Q':
                this.makeDrum(SoundTypeEnum.boom)
                break;
            case 'W':
                this.makeDrum(SoundTypeEnum.clap)
                break;
            case 'E':
                this.makeDrum(SoundTypeEnum.hihat)
                break;
            case 'R':
                this.makeDrum(SoundTypeEnum.kick)
                break;
            case 'T':
                this.makeDrum(SoundTypeEnum.openhat)
                break;
            case 'A':
                this.makeDrum(SoundTypeEnum.ride)
                break;
            case 'S':
                this.makeDrum(SoundTypeEnum.snare)
                break;
            case 'D':
                this.makeDrum(SoundTypeEnum.tink)
                break;
            case 'F':
                this.makeDrum(SoundTypeEnum.tom)
                break;
            case 'G':
                this.makeDrum(SoundTypeEnum.boom)
                break;
            default:
                break;
        }
    }


    private makeDrum(sound: SoundTypeEnum){
        this.sounds.playSound(sound);
    }

}