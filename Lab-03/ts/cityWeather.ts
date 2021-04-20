/// <reference path='weatherApiResponse.ts'/>

class CityWeather{

    private cityName: string;
    private weather: string;
    private temperature: number;
    private pressure: number;
    private humidity: number;


    constructor(weatherData: WeatherApiResponse){
        this.setValues(weatherData);
    }

    refreshData(weatherData: WeatherApiResponse){
        this.setValues(weatherData);
    }

    private setValues(weatherData: WeatherApiResponse) {
        this.cityName = weatherData.name;
        this.weather = weatherData.weather[0].description.toUpperCase();
        this.temperature = weatherData.main.temp;
        this.pressure = weatherData.main.pressure;
        this.humidity = weatherData.main.humidity;
    }

    getCityName():string{
        return this.cityName;
    }

}