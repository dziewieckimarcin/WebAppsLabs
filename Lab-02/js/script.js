var SoundTypeEnum;
(function (SoundTypeEnum) {
    SoundTypeEnum[SoundTypeEnum["boom"] = 0] = "boom";
    SoundTypeEnum[SoundTypeEnum["clap"] = 1] = "clap";
    SoundTypeEnum[SoundTypeEnum["hihat"] = 2] = "hihat";
    SoundTypeEnum[SoundTypeEnum["kick"] = 3] = "kick";
    SoundTypeEnum[SoundTypeEnum["openhat"] = 4] = "openhat";
    SoundTypeEnum[SoundTypeEnum["ride"] = 5] = "ride";
    SoundTypeEnum[SoundTypeEnum["snare"] = 6] = "snare";
    SoundTypeEnum[SoundTypeEnum["tink"] = 7] = "tink";
    SoundTypeEnum[SoundTypeEnum["tom"] = 8] = "tom";
})(SoundTypeEnum || (SoundTypeEnum = {}));
/// <reference path='soundTypeEnum.ts'/>
var Sounds = /** @class */ (function () {
    function Sounds() {
    }
    Sounds.prototype.playSound = function (soundType) {
        var audioElement;
        switch (soundType) {
            case SoundTypeEnum.boom:
                audioElement = document.getElementById("boomSoundId");
                break;
            case SoundTypeEnum.clap:
                audioElement = document.getElementById("clapSoundId");
                break;
            case SoundTypeEnum.hihat:
                audioElement = document.getElementById("hihatSoundId");
                break;
            case SoundTypeEnum.kick:
                audioElement = document.getElementById("kickSoundId");
                break;
            case SoundTypeEnum.openhat:
                audioElement = document.getElementById("openhatSoundId");
                break;
            case SoundTypeEnum.ride:
                audioElement = document.getElementById("rideSoundId");
                break;
            case SoundTypeEnum.snare:
                audioElement = document.getElementById("snareSoundId");
                break;
            case SoundTypeEnum.tink:
                audioElement = document.getElementById("tinkSoundId");
                break;
            case SoundTypeEnum.tom:
                audioElement = document.getElementById("tomSoundId");
                break;
            default:
                audioElement = document.getElementById("boomSoundId");
                break;
        }
        audioElement.currentTime = 0;
        audioElement.play();
    };
    return Sounds;
}());
/// <reference path='./record/soundTypeEnum.ts'/>
/// <reference path='./record/sounds.ts'/>
var Drums = /** @class */ (function () {
    function Drums() {
        var _this = this;
        this.sounds = new Sounds();
        document.addEventListener("keypress", function (e) { return _this.onKeyPress(e); });
        var drumSection = document.getElementById("drumSectionId");
        drumSection.addEventListener("click", function (e) { return _this.onMouseClick(e); });
    }
    Drums.prototype.onMouseClick = function (e) {
        this.selectDrum(e.target.innerText);
    };
    Drums.prototype.onKeyPress = function (e) {
        this.selectDrum(e.key.toUpperCase());
    };
    Drums.prototype.selectDrum = function (option) {
        switch (option) {
            case 'Q':
                this.makeDrum(SoundTypeEnum.boom);
                break;
            case 'W':
                this.makeDrum(SoundTypeEnum.clap);
                break;
            case 'E':
                this.makeDrum(SoundTypeEnum.hihat);
                break;
            case 'R':
                this.makeDrum(SoundTypeEnum.kick);
                break;
            case 'T':
                this.makeDrum(SoundTypeEnum.openhat);
                break;
            case 'A':
                this.makeDrum(SoundTypeEnum.ride);
                break;
            case 'S':
                this.makeDrum(SoundTypeEnum.snare);
                break;
            case 'D':
                this.makeDrum(SoundTypeEnum.tink);
                break;
            case 'F':
                this.makeDrum(SoundTypeEnum.tom);
                break;
            case 'G':
                this.makeDrum(SoundTypeEnum.boom);
                break;
            default:
                break;
        }
    };
    Drums.prototype.makeDrum = function (sound) {
        this.sounds.playSound(sound);
        this.onDrumEvent(sound);
    };
    return Drums;
}());
var TrackElement = /** @class */ (function () {
    function TrackElement(soundType, delayTime) {
        this.type = soundType;
        this.delay = delayTime;
    }
    return TrackElement;
}());
/// <reference path='trackElement.ts'/>
/// <reference path='sounds.ts'/>
/// <reference path='soundTypeEnum.ts'/>
var SingleTrack = /** @class */ (function () {
    function SingleTrack() {
        this.isOn = true;
        this.isRecording = false;
        this.isRecordingWithBackground = false;
        this.isPlaying = false;
        this.elements = [];
        this.sounds = new Sounds();
        this.create(document.getElementById("tracks-section"));
        this.setButtonDefaults();
        this.addButtonListeners();
    }
    SingleTrack.prototype.checkIsPlaying = function () {
        return this.isPlaying;
    };
    SingleTrack.prototype.addTrackElement = function (sound) {
        if (this.isRecording || this.isRecordingWithBackground) {
            var timeNow = performance.now();
            this.elements.push(new TrackElement(sound, timeNow - this.timeVector));
            this.timeVector = timeNow;
        }
    };
    SingleTrack.prototype.playTrack = function () {
        if (this.isOn && !this.isRecording && !this.isRecordingWithBackground) {
            this.togglePlayTrack();
        }
    };
    SingleTrack.prototype.stopPlay = function () {
        if (this.isPlaying) {
            this.togglePlayTrack();
        }
    };
    SingleTrack.prototype.startStopPlayingTrack = function () {
        if (this.isPlaying) {
            if (this.elements.length > 0) {
                this.elementsPlayIndex = 0;
                this.isPlaying = true;
                this.setTimer();
            }
            else {
                this.togglePlayTrack();
            }
        }
        else {
            clearTimeout(this.soundTimer);
        }
    };
    SingleTrack.prototype.playSoundFromTrack = function () {
        clearTimeout(this.soundTimer);
        this.sounds.playSound(this.elements[this.elementsPlayIndex].type);
        this.elementsPlayIndex++;
        if (this.elementsPlayIndex < this.elements.length) {
            this.setTimer();
        }
        else {
            this.togglePlayTrack();
        }
    };
    SingleTrack.prototype.setTimer = function () {
        var _this = this;
        this.soundTimer = setTimeout(function () { return _this.playSoundFromTrack(); }, this.elements[this.elementsPlayIndex].delay);
    };
    SingleTrack.prototype.startRecordingWithBackground = function () {
        this.playAllEvent();
        this.startRecording();
    };
    SingleTrack.prototype.startRecording = function () {
        this.elements = [];
        this.timeVector = performance.now();
        ;
    };
    SingleTrack.prototype.create = function (parentElement) {
        this.currentElement = document.createElement('div');
        this.currentElement.className = 'box py-2 my-2';
        this.progressBar = document.createElement('progress');
        this.progressBar.className = 'progress is-danger my-4';
        this.progressBar.value = 0;
        this.progressBar.max = 100;
        var field = document.createElement('div');
        field.className = 'field is-grouped is-grouped-centered';
        var controlOnOffButton = document.createElement('div');
        controlOnOffButton.className = 'control py-1';
        var controlPlayTrackButton = document.createElement('div');
        controlPlayTrackButton.className = 'control py-1';
        var controlRecordButton = document.createElement('div');
        controlRecordButton.className = 'control py-1';
        var controlRecordWithBackgroundButton = document.createElement('div');
        controlRecordWithBackgroundButton.className = 'control py-1';
        var controlRemoveButton = document.createElement('div');
        controlRemoveButton.className = 'control py-1';
        this.onOffButton = document.createElement('button');
        this.onOffButton.className = 'button';
        this.onOffButton.innerText = "On/Off";
        this.playTrackButton = document.createElement('button');
        this.playTrackButton.className = 'button';
        this.playTrackButton.innerText = "Play/Stop Track";
        this.recordButton = document.createElement('button');
        this.recordButton.className = 'button';
        this.recordButton.innerText = "Start/Stop Record";
        this.recordWithBackgroundButton = document.createElement('button');
        this.recordWithBackgroundButton.className = 'button';
        this.recordWithBackgroundButton.innerText = "Start/Stop Record with Background";
        this.removeButton = document.createElement('button');
        this.removeButton.className = 'button is-danger';
        this.removeButton.innerText = "Remove";
        controlOnOffButton.appendChild(this.onOffButton);
        controlPlayTrackButton.appendChild(this.playTrackButton);
        controlRecordButton.appendChild(this.recordButton);
        controlRecordWithBackgroundButton.appendChild(this.recordWithBackgroundButton);
        controlRemoveButton.appendChild(this.removeButton);
        field.appendChild(controlOnOffButton);
        field.appendChild(controlPlayTrackButton);
        field.appendChild(controlRecordButton);
        field.appendChild(controlRecordWithBackgroundButton);
        field.appendChild(controlRemoveButton);
        this.currentElement.appendChild(this.progressBar);
        this.currentElement.appendChild(field);
        parentElement.appendChild(this.currentElement);
    };
    SingleTrack.prototype.addButtonListeners = function () {
        var _this = this;
        this.removeButton.addEventListener("click", function () { return _this.remove(); });
        this.onOffButton.addEventListener("click", function () { return _this.toggleOnOff(); });
        this.recordButton.addEventListener("click", function () { return _this.toggleRecord(); });
        this.recordWithBackgroundButton.addEventListener("click", function () { return _this.toggleRecordWithBackground(); });
        this.playTrackButton.addEventListener("click", function () { return _this.togglePlayTrack(); });
    };
    SingleTrack.prototype.setButtonDefaults = function () {
        this.setOnOffButtonsStyle();
        this.setRecordButtonsStyle();
        this.setRecordWithBackgroundButtonsStyle();
        this.setPlayTrackButtonsStyle();
    };
    SingleTrack.prototype.remove = function () {
        this.currentElement.parentElement.removeChild(this.currentElement);
    };
    SingleTrack.prototype.toggleOnOff = function () {
        this.isOn = !this.isOn;
        this.setOnOffButtonsStyle();
    };
    SingleTrack.prototype.setOnOffButtonsStyle = function () {
        if (this.isOn) {
            this.onOffButton.classList.add("is-success");
            this.onOffButton.classList.remove("is-danger");
            this.onOffButton.classList.remove("is-light");
            this.playTrackButton.classList.remove("is-static");
            this.recordButton.classList.remove("is-static");
            this.recordWithBackgroundButton.classList.remove("is-static");
        }
        else {
            this.onOffButton.classList.remove("is-success");
            this.onOffButton.classList.add("is-danger");
            this.onOffButton.classList.add("is-light");
            this.playTrackButton.classList.add("is-static");
            this.recordButton.classList.add("is-static");
            this.recordWithBackgroundButton.classList.add("is-static");
        }
    };
    SingleTrack.prototype.toggleRecord = function () {
        this.isRecording = !this.isRecording;
        this.setRecordButtonsStyle();
        if (this.isRecording) {
            this.startRecording();
        }
    };
    SingleTrack.prototype.setRecordButtonsStyle = function () {
        if (this.isRecording) {
            this.recordButton.classList.add("is-danger");
            this.recordButton.classList.remove("is-info");
            this.onOffButton.classList.add("is-static");
            this.playTrackButton.classList.add("is-static");
            this.recordWithBackgroundButton.classList.add("is-static");
            this.removeButton.classList.add("is-static");
        }
        else {
            this.recordButton.classList.remove("is-danger");
            this.recordButton.classList.add("is-info");
            this.onOffButton.classList.remove("is-static");
            this.playTrackButton.classList.remove("is-static");
            this.recordWithBackgroundButton.classList.remove("is-static");
            this.removeButton.classList.remove("is-static");
        }
    };
    SingleTrack.prototype.toggleRecordWithBackground = function () {
        this.isRecordingWithBackground = !this.isRecordingWithBackground;
        this.setRecordWithBackgroundButtonsStyle();
        if (this.isRecordingWithBackground) {
            this.startRecordingWithBackground();
        }
        else {
            this.stopAllEvent();
        }
    };
    SingleTrack.prototype.setRecordWithBackgroundButtonsStyle = function () {
        if (this.isRecordingWithBackground) {
            this.recordWithBackgroundButton.classList.add("is-danger");
            this.recordWithBackgroundButton.classList.remove("is-info");
            this.onOffButton.classList.add("is-static");
            this.playTrackButton.classList.add("is-static");
            this.recordButton.classList.add("is-static");
            this.removeButton.classList.add("is-static");
        }
        else {
            this.recordWithBackgroundButton.classList.remove("is-danger");
            this.recordWithBackgroundButton.classList.add("is-info");
            this.onOffButton.classList.remove("is-static");
            this.playTrackButton.classList.remove("is-static");
            this.recordButton.classList.remove("is-static");
            this.removeButton.classList.remove("is-static");
        }
    };
    SingleTrack.prototype.togglePlayTrack = function () {
        this.isPlaying = !this.isPlaying;
        this.setPlayTrackButtonsStyle();
        this.startStopPlayingTrack();
    };
    SingleTrack.prototype.setPlayTrackButtonsStyle = function () {
        if (this.isPlaying) {
            this.playTrackButton.classList.add("is-danger");
            this.playTrackButton.classList.remove("is-success");
            this.onOffButton.classList.add("is-static");
            this.recordButton.classList.add("is-static");
            this.recordWithBackgroundButton.classList.add("is-static");
            this.removeButton.classList.add("is-static");
        }
        else {
            this.playTrackButton.classList.remove("is-danger");
            this.playTrackButton.classList.add("is-success");
            this.onOffButton.classList.remove("is-static");
            this.recordButton.classList.remove("is-static");
            this.recordWithBackgroundButton.classList.remove("is-static");
            this.removeButton.classList.remove("is-static");
        }
    };
    return SingleTrack;
}());
/// <reference path='singleTrack.ts'/>
/// <reference path='soundTypeEnum.ts'/>
var AllTracks = /** @class */ (function () {
    function AllTracks() {
        this.tracksColection = [];
        this.addTrack();
    }
    AllTracks.prototype.addTrack = function () {
        var _this = this;
        var track = new SingleTrack();
        track.playAllEvent = function () { return _this.playAll(); };
        track.stopAllEvent = function () { return _this.stopAll(); };
        this.tracksColection.push(track);
    };
    AllTracks.prototype.recordDrum = function (soundType) {
        this.tracksColection.forEach(function (element) {
            element.addTrackElement(soundType);
        });
    };
    AllTracks.prototype.toggleAll = function () {
        var flag = false;
        this.tracksColection.forEach(function (element) {
            if (element.checkIsPlaying()) {
                flag = true;
            }
        });
        if (flag) {
            this.stopAll();
        }
        else {
            this.playAll();
        }
    };
    AllTracks.prototype.playAll = function () {
        this.tracksColection.forEach(function (element) {
            element.playTrack();
        });
    };
    AllTracks.prototype.stopAll = function () {
        this.tracksColection.forEach(function (element) {
            element.stopPlay();
        });
    };
    return AllTracks;
}());
/// <reference path='./record/allTracks.ts'/>
var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        this.allTracks = new AllTracks();
        this.drums = new Drums();
        var addButton = document.getElementById("addTrackId");
        addButton.addEventListener('click', function () { return _this.addTrack(); });
        var playAllButton = document.getElementById("playTracksId");
        playAllButton.addEventListener('click', function () { return _this.playAllTracks(); });
        this.drums.onDrumEvent = function (e) { return _this.recordDrum(e); };
    }
    Main.prototype.addTrack = function () {
        this.allTracks.addTrack();
    };
    Main.prototype.recordDrum = function (soundType) {
        this.allTracks.recordDrum(soundType);
    };
    Main.prototype.playAllTracks = function () {
        this.allTracks.toggleAll();
    };
    return Main;
}());
/// <reference path='main.ts'/>
var main = new Main();
