/// <reference path='soundTypeEnum.ts'/>

class Sounds{

    public playSound(soundType: SoundTypeEnum){
        let audioElement: HTMLAudioElement;

        switch (soundType) {
            case SoundTypeEnum.boom:
                audioElement = document.getElementById("boomSoundId") as HTMLAudioElement;
                break;
            case SoundTypeEnum.clap:
                audioElement = document.getElementById("clapSoundId") as HTMLAudioElement;
                break;
            case SoundTypeEnum.hihat:
                audioElement = document.getElementById("hihatSoundId") as HTMLAudioElement;
                break;
            case SoundTypeEnum.kick:
                audioElement = document.getElementById("kickSoundId") as HTMLAudioElement;
                break;
            case SoundTypeEnum.openhat:
                audioElement = document.getElementById("openhatSoundId") as HTMLAudioElement;
                break;
            case SoundTypeEnum.ride:
                audioElement = document.getElementById("rideSoundId") as HTMLAudioElement;
                break;
            case SoundTypeEnum.snare:
                audioElement = document.getElementById("snareSoundId") as HTMLAudioElement;
                break;
            case SoundTypeEnum.tink:
                audioElement = document.getElementById("tinkSoundId") as HTMLAudioElement;
                break;
            case SoundTypeEnum.tom:
                audioElement = document.getElementById("tomSoundId") as HTMLAudioElement;
                break;
            default:
                audioElement = document.getElementById("boomSoundId") as HTMLAudioElement;
                break;
        }

        audioElement.currentTime = 0;
        audioElement.play();
    }

}