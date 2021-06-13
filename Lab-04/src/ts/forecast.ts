import { Hourly } from "./forecastApiResponse";
import { WeatherApi } from "./weatherApi";
import { Coord } from "./weatherApiResponse";

class Forecast{

    private weatherApi = new WeatherApi();

    private modalElement: HTMLElement;
    private closeModalButton: HTMLButtonElement;
    private forecastElementsSection: HTMLElement;
    private forecastCityNameElement: HTMLElement;

    constructor(){
        this.modalElement = document.getElementById("forecast-modal") as HTMLElement;
        this.forecastElementsSection = document.getElementById("forecast-elements-section") as HTMLElement;

        this.closeModalButton = document.getElementById("close-forecast-button") as HTMLButtonElement;
        this.closeModalButton.addEventListener('click', () => this.hideForecast());

        this.forecastCityNameElement = document.getElementById("forecast-city") as HTMLElement;
    }

    private hideForecast(){
        this.modalElement.classList.remove("is-active");
        this.forecastCityNameElement.innerText = '';
        this.forecastElementsSection.innerHTML = '';
    }

    async showForecast(cityName: string, cords: Coord){
        let forecast = await this.weatherApi.getForecastByCity(cityName, cords);

        if (forecast == null){
            // show notification error
            return;
        }
        
        this.buildForecastElements(forecast.hourly);
        this.forecastCityNameElement.innerText = cityName;
        this.modalElement.classList.add("is-active");
    }
    
    private buildForecastElements(forecastCollection: Hourly[]){
        forecastCollection.forEach(x => this.buildMainElement(x));
    }

    private buildMainElement(forecast: Hourly){

        let mainElement = document.createElement("div");
        mainElement.className = "column p-1 is-full";

        let subElement1 = document.createElement("div");
        subElement1.className = "box p-3";
        mainElement.appendChild(subElement1);

        let subElement2 = document.createElement("div");
        subElement2.className = "container";
        subElement1.appendChild(subElement2);

        let subElement3 = document.createElement("div");
        subElement3.className = "columns is-mobile";
        subElement2.appendChild(subElement3);

        this.createMobileImageElement(subElement3, forecast);
        this.createFullSizeElement(subElement3, forecast);

        this.forecastElementsSection.appendChild(mainElement);
    }
    
    private createMobileImageElement(parentElement: HTMLElement, forecast: Hourly){
        let mainElement = document.createElement("div");
        mainElement.className = "column is-half-mobile is-hidden-tablet is-flex is-justify-content-center is-align-items-center";

        let subElement1 = document.createElement("figure");
        subElement1.className = "image is-96x96 p-0";
        mainElement.appendChild(subElement1);

        let subElement2 = document.createElement("img");
        subElement2.src = `./images/${forecast.weather[0].icon}.png`;
        subElement1.appendChild(subElement2);

        parentElement.appendChild(mainElement);
    }

    private createFullSizeElement(parentElement: HTMLElement, forecast: Hourly){
        let mainElement = document.createElement("div");
        mainElement.className = "column is-half-mobile";

        let subElement1 = document.createElement("div");
        subElement1.className = "container";
        mainElement.appendChild(subElement1);

        let subElement2 = document.createElement("div");
        subElement2.className = "columns p-0";
        subElement1.appendChild(subElement2);

        this.createFullSizeImageElement(subElement2, forecast);
        this.createTemperatureElement(subElement2, forecast);
        this.createPressureElement(subElement2, forecast);
        this.createHumidityElement(subElement2, forecast);
        this.createDateTimeElement(subElement2, forecast);

        parentElement.appendChild(mainElement);
    }

    private createFullSizeImageElement(parentElement: HTMLElement, forecast: Hourly){
        let mainElement = document.createElement("div");
        mainElement.className = "column is-hidden-mobile p-0 is-1 is-flex is-justify-content-center is-align-items-center";

        let subElement1 = document.createElement("figure");
        subElement1.className = "image is-48x48 p-0";
        mainElement.appendChild(subElement1);

        let subElement2 = document.createElement("img");
        subElement2.src = `./images/${forecast.weather[0].icon}.png`;
        subElement1.appendChild(subElement2);

        parentElement.appendChild(mainElement);
    }

    private createTemperatureElement(parentElement: HTMLElement, forecast: Hourly){
        let mainElement = document.createElement("div");
        mainElement.className = "column p-1 is-1 is-flex is-justify-content-center is-align-items-center";

        let subElement1 = document.createElement("div");
        subElement1.className = "subtitle is-6";
        mainElement.appendChild(subElement1);

        let subElement2 = document.createElement("span");
        subElement2.innerText = forecast.temp.toFixed(0).toString();
        subElement1.appendChild(subElement2);

        let subElement3 = document.createElement("span");
        subElement3.innerHTML = "&nbsp;&deg;C";
        subElement2.appendChild(subElement3);

        parentElement.appendChild(mainElement);
    }

    private createPressureElement(parentElement: HTMLElement, forecast: Hourly){
        let mainElement = document.createElement("div");
        mainElement.className = "column p-1 is-3 is-flex is-justify-content-center is-align-items-center";

        let subElement1 = document.createElement("div");
        subElement1.className = "subtitle is-6";
        mainElement.appendChild(subElement1);

        let subElement2 = document.createElement("span");
        subElement2.innerText = "Ciś. ";
        subElement1.appendChild(subElement2);

        let subElement3 = document.createElement("span");
        subElement3.innerText = forecast.pressure.toFixed(0).toString();
        subElement2.appendChild(subElement3);

        let subElement4 = document.createElement("span");
        subElement4.innerHTML = "&nbsp;hPa";
        subElement3.appendChild(subElement4);

        parentElement.appendChild(mainElement);
    }

    private createHumidityElement(parentElement: HTMLElement, forecast: Hourly){
        let mainElement = document.createElement("div");
        mainElement.className = "column p-1 is-3 is-flex is-justify-content-center is-align-items-center";

        let subElement1 = document.createElement("div");
        subElement1.className = "subtitle is-6";
        mainElement.appendChild(subElement1);

        let subElement2 = document.createElement("span");
        subElement2.innerText = "Wilg. ";
        subElement1.appendChild(subElement2);

        let subElement3 = document.createElement("span");
        subElement3.innerText = forecast.humidity.toFixed(0).toString();
        subElement2.appendChild(subElement3);

        let subElement4 = document.createElement("span");
        subElement4.innerHTML = "%";
        subElement3.appendChild(subElement4);

        parentElement.appendChild(mainElement);
    }

    private createDateTimeElement(parentElement: HTMLElement, forecast: Hourly){
        let mainElement = document.createElement("div");
        mainElement.className = "column p-1 is-4 is-flex is-justify-content-center is-align-items-center";

        let subElement1 = document.createElement("div");
        subElement1.className = "subtitle is-6";
        mainElement.appendChild(subElement1);

        let subElement2 = document.createElement("span");
        subElement2.innerText = this.timeConverter(forecast.dt);
        subElement1.appendChild(subElement2);

        parentElement.appendChild(mainElement);
    }

    private timeConverter(UNIX_timestamp: number): string{
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' g. ' + hour + ':00';
        return time;
      }
}

export {Forecast}