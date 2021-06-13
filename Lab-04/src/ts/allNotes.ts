import { Note } from "./note";
import { Storage } from "./storage";

class AllNotes{

    // private storage = new Storage();
    // private notesCollection : Note[] = [];
    // private refreshInterval : NodeJS.Timeout;
    // private refreshTime = 120000;

    // private allWeathersSectionElement: HTMLElement;

    // private forecastCallback: (cityName: string, cords: Coord) => void;

    // constructor(forecastCallback: (cityName: string, cords: Coord) => void){
    //     this.forecastCallback = forecastCallback;
    //     this.allWeathersSectionElement = document.getElementById("all-weathers-section");
    //     this.refreshInterval = setInterval(() => this.refreshAllWeathers(), this.refreshTime);
    //     this.loadDataFromStorage();
    // }

    // private showForecast(cityName: string, cords: Coord){
    //     this.forecastCallback(cityName, cords);
    // }

    // async refreshAllWeathers(){
    //     this.notesCollection.forEach(async (x) => {
    //         let weather = await this.storage.getWeatherByCity(x.getCityName());
    //         x.refreshData(weather);
    //     });

    //     console.log(this.notesCollection);
    // }

    // async addCityWeather(cityName: string){
    //     if (cityName.trim().length == 0){
    //         // show notification that field is empty
    //         return;
    //     }

    //     if (!this.checkCityExistInCollection(cityName)){
    //         let weather = await this.storage.getWeatherByCity(cityName);
    //         if (weather == null){
    //             // show notification that city not exist
    //             return;
    //         }

    //         if (!this.checkCityExistInCollection(weather.name)){
    //             let cityWeather = new CityWeather(weather, this.allWeathersSectionElement, (ob) => this.removeWeatherFromCollection(ob), (cityName, cords) => this.showForecast(cityName, cords));
    //             this.notesCollection.push(cityWeather);
    //             this.saveDataToStorage();
    //         }
    //         else{
    //             // Show notification that city already shown
    //         }
    //     }
    //     else{
    //         // Show notification that city already shown
    //     }
    // }

    // private checkCityExistInCollection(cityName: string) {
    //     let cityExist = false;
    //     this.notesCollection.forEach((x) => {
    //         if (x.getCityName().toLowerCase() == cityName.toLowerCase())
    //             cityExist = true;
    //     });
    //     return cityExist;
    // }

    // private removeWeatherFromCollection(ob: CityWeather){
    //     this.notesCollection = this.notesCollection.filter(x => x != ob);
    //     this.saveDataToStorage();
    // }

    // private saveDataToStorage(){
    //     let cities : string[] = [];
    //     this.notesCollection.forEach(x => cities.push(x.getCityName()));
    //     localStorage.setItem("cities", JSON.stringify(cities));
    // }

    // private loadDataFromStorage(){
    //     let data = localStorage.getItem("cities");
    //     if (data){
    //         let cities = JSON.parse(data) as string[];
    //         cities.forEach(async x => await this.addCityWeather(x) );
    //     }
    // }
}

export {AllNotes}