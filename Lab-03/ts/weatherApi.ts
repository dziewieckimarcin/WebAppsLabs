/// <reference path='weatherApiResponse.ts'/>

class WeatherApi{

    private readonly apiKeyValue = '3c9297d4bffa510f74b3d44806e88662';
    private readonly url = 'http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric&lang=pl';
    private readonly cityKey = '{city name}';
    private readonly apiKey = '{API key}';

    async getWeatherByCity(city: string): Promise<WeatherApiResponse>{
        let validUrl = this.url.replace(this.cityKey, city).replace(this.apiKey, this.apiKeyValue);

        let response = await fetch(validUrl);

        if (response.ok){
            let jsonResponse = (await response.json()) as WeatherApiResponse;
            return jsonResponse;
        }
        else{
            console.log("fetch data error");
            return null;
        }
        
    }

}
