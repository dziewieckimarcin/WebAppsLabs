/// <reference path='./record/soundTypeEnum.ts'/>
/// <reference path='./record/sounds.ts'/>

class Drums{

    public onDrumEvent: (soundType: SoundTypeEnum) => void;

    private sounds = new Sounds();

    constructor(){
        document.addEventListener("keypress", (e) => this.onKeyPress(e));

        let drumSection = document.getElementById("drumSectionId");
        drumSection.addEventListener("click", (e) => this.onMouseClick(e));
    }

    private onMouseClick(e: MouseEvent){
        this.selectDrum((e.target as HTMLElement).innerText)
    }


    private onKeyPress(e: KeyboardEvent){
        this.selectDrum(e.key.toUpperCase());
    }

    private selectDrum(option: string){
        switch (option) {
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
        this.onDrumEvent(sound);
    }

}