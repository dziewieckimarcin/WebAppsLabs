/// <reference path='weatherApi.ts'/>
/// <reference path='allWeathers.ts'/>

class Main{

    private addButton : HTMLButtonElement;
    private addInput : HTMLInputElement;

    private allWeathers = new AllWeathers();
    
    constructor(){
        this.initDocumentElements();
    }

    private initDocumentElements() {
        this.addButton = document.getElementById("add-city-button") as HTMLButtonElement;
        this.addInput = document.getElementById("add-city-input") as HTMLInputElement;
        this.addButton.addEventListener('click', () => this.addNewCity());
        this.addInput.addEventListener('change', () => this.addNewCity());
    }

    private async addNewCity(){
        let cityName = this.addInput.value;
        await this.allWeathers.addCityWeather(cityName);
    }

    
}