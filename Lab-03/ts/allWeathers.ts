/// <reference path='cityWeather.ts'/>


class AllWeathers{

    private weatherApi = new WeatherApi();
    private weathersCollection : CityWeather[] = [];
    private refreshInterval;
    private refreshTime = 120000;

    private allWeathersSectionElement: HTMLElement;

    constructor(){
        this.allWeathersSectionElement = document.getElementById("all-weathers-section");
        this.refreshInterval = setInterval(() => this.refreshAllWeathers(), this.refreshTime)
    }

    async refreshAllWeathers(){
        this.weathersCollection.forEach(async (x) => {
            let weather = await this.weatherApi.getWeatherByCity(x.getCityName());
            x.refreshData(weather);
        });

        console.log(this.weathersCollection);
    }

    async addCityWeather(cityName: string){
        if (cityName.trim().length == 0){
            // show notification that field is empty
            return;
        }

        if (!this.checkCityExistInCollection(cityName)){
            let weather = await this.weatherApi.getWeatherByCity(cityName);
            if (weather == null){
                // show notification that city not exist
                return;
            }

            if (!this.checkCityExistInCollection(weather.name)){
                let cityWeather = new CityWeather(weather, this.allWeathersSectionElement, (ob) => this.removeWeatherFromCollection(ob));
                this.weathersCollection.push(cityWeather);
            }
            else{
                // Show notification that city already shown
            }
        }
        else{
            // Show notification that city already shown
        }
    }

    private checkCityExistInCollection(cityName: string) {
        let cityExist = false;
        this.weathersCollection.forEach((x) => {
            if (x.getCityName().toLowerCase() == cityName.toLowerCase())
                cityExist = true;
        });
        return cityExist;
    }

    private removeWeatherFromCollection(ob: CityWeather){
        this.weathersCollection = this.weathersCollection.filter(x => x != ob);
    }
}