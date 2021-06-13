

class Storage{


    // async getWeatherByCity(city: string): Promise<WeatherApiResponse>{
    //     let validUrl = this.weatherUrl.replace(this.cityKey, city).replace(this.apiKey, this.apiKeyValue);

    //     let response = await fetch(validUrl);

    //     if (response.ok){
    //         let jsonResponse = (await response.json()) as WeatherApiResponse;
    //         return jsonResponse;
    //     }
    //     else{
    //         console.log("fetch data error");
    //         return null;
    //     }
        
    // }

    // async getForecastByCity(city: string, cords: Coord): Promise<ForecastApiResponse>{
    //     let validUrl = this.forecastUrl.replace(this.apiKey, this.apiKeyValue).replace(this.latKey, cords.lat.toString()).replace(this.lonKey, cords.lon.toString());

    //     let response = await fetch(validUrl);

    //     if (response.ok){
    //         let jsonResponse = (await response.json()) as ForecastApiResponse;
    //         return jsonResponse;
    //     }
    //     else{
    //         console.log("fetch data error");
    //         return null;
    //     }   
    // }
}

export {Storage}