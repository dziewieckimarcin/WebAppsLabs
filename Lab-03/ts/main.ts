/// <reference path='allWeathers.ts'/>
/// <reference path='forecast.ts'/>

class Main{

    private addButton : HTMLButtonElement;
    private addInput : HTMLInputElement;

    private allWeathers = new AllWeathers((cityName, cords) => this.showForecast(cityName, cords));
    private forecast = new Forecast();
    
    constructor(){
        this.initDocumentElements();
    }

    private async showForecast(cityName: string, cords: Coord){
        await this.forecast.showForecast(cityName, cords);
    }

    private initDocumentElements() {
        this.addButton = document.getElementById("add-city-button") as HTMLButtonElement;
        this.addButton.addEventListener('click', () => this.addNewCity());

        this.addInput = document.getElementById("add-city-input") as HTMLInputElement;
        this.addInput.addEventListener('change', () => this.addNewCity());
    }

    private async addNewCity(){
        let cityName = this.addInput.value;
        await this.allWeathers.addCityWeather(cityName);
    }

    
}