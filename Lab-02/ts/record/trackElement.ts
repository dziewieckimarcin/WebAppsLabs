class TrackElement{
    public type: SoundTypeEnum;
    public delay: number;

    constructor(soundType: SoundTypeEnum, delayTime: number){
        this.type = soundType;
        this.delay = delayTime;
    }
}