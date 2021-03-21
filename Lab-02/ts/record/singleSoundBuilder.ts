/// <reference path='singleSound.ts'/>
/// <reference path='soundTypeEnum.ts'/>

class SingleSoundBuilder{

    private readonly soundsPath = '.././sounds/';

    constructor(){

    }

    createSound(soundType: SoundTypeEnum): SingleSound{
        
    }

    private getFileNameWithPath(fileName: string): string{
        return this.soundsPath + fileName;
    }

    private getFileName(soundType: SoundTypeEnum): string{
        switch (soundType) {
            case SoundTypeEnum.boom:
                return 'boom.wav';
            case SoundTypeEnum.clap:
                return 'clap.wav';
            case SoundTypeEnum.hihat:
                return 'hihat.wav';
            case SoundTypeEnum.kick:
                return 'kick.wav';
            case SoundTypeEnum.openhat:
                return 'openhat.wav';
            case SoundTypeEnum.ride:
                return 'ride.wav';
            case SoundTypeEnum.snare:
                return 'snare.wav';
            case SoundTypeEnum.tink:
                return 'tink.wav';
            case SoundTypeEnum.tom:
                return 'tom.wav';
            default:
                console.log("No sound assigned");
                return 'boom.wav';
        }
    }

}