import { Coord, WeatherApiResponse } from "./weatherApiResponse";

class CityWeather{

    private cityName: string;
    private weatherIcon: string;
    private weather: string;
    private temperature: number;
    private pressure: number;
    private humidity: number;
    private cords: Coord;

    private mainElement : HTMLElement;
    private cityNameElement : HTMLElement;
    private imgElement: HTMLImageElement;
    private descriptionElement : HTMLElement;
    private temperatureElement : HTMLElement;
    private pressureElement : HTMLElement;
    private humidityElement : HTMLElement;
    private forecastButtonElement : HTMLButtonElement;

    private deleteCallback: (ob: CityWeather) => void;
    private forecastCallback: (cityName: string, cords: Coord) => void;

    constructor(weatherData: WeatherApiResponse, parentElement: HTMLElement, deleteCallback: (ob: CityWeather) => void, forecastCallback: (cityName: string, cords: Coord) => void){
        this.deleteCallback = deleteCallback;
        this.forecastCallback = forecastCallback;
        this.setValues(weatherData);
        this.createHtmlElements(parentElement);
        this.updateValuesOnHtmlElements();
    }

    private updateValuesOnHtmlElements(){
        this.cityNameElement.innerText = this.cityName;
        this.descriptionElement.innerText = this.weather;
        this.temperatureElement.innerText = this.temperature.toFixed(0).toString();
        this.pressureElement.innerText = this.pressure.toFixed(0).toString();
        this.humidityElement.innerText = this.humidity.toFixed(0).toString();
        this.imgElement.src = `./images/${this.weatherIcon}.png`;
    }

    refreshData(weatherData: WeatherApiResponse){
        this.setValues(weatherData);
    }

    private setValues(weatherData: WeatherApiResponse) {
        this.cityName = weatherData.name;
        this.weatherIcon = weatherData.weather[0].icon;
        this.weather = weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1);
        this.temperature = weatherData.main.temp;
        this.pressure = weatherData.main.pressure;
        this.humidity = weatherData.main.humidity;
        this.cords = weatherData.coord;
    }

    getCityName():string{
        return this.cityName;
    }

    createHtmlElements(parentElement: HTMLElement){
        this.mainElement = document.createElement("div");
        this.mainElement.className = "column is-half-tablet is-two-fifths-desktop is-one-third-widescreen";

        let cardElement = document.createElement("div");
        cardElement.className = "card";
        this.mainElement.appendChild(cardElement);

        this.createCardHeader(cardElement);
        this.createCardContent(cardElement);
        this.createCardFooter(cardElement);
        this.createForecastCardFooter(cardElement);

        parentElement.appendChild(this.mainElement);
    }

    private createForecastCardFooter(cardElement: HTMLDivElement) {
        let cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";
        cardElement.appendChild(cardFooter);

        this.createForecastFooterItem(cardFooter);
    }

    private createForecastFooterItem(cardElement: HTMLDivElement) {
        let forecastCardFooterItem = document.createElement("div");
        forecastCardFooterItem.className = "card-footer-item is-half";
        cardElement.appendChild(forecastCardFooterItem);

        let cardFooterItemContainer = document.createElement("div");
        cardFooterItemContainer.className = "container";
        forecastCardFooterItem.appendChild(cardFooterItemContainer);

        let cardFooterItemContent = document.createElement("div");
        cardFooterItemContent.className = "content has-text-centered";
        cardFooterItemContainer.appendChild(cardFooterItemContent);

        this.forecastButtonElement = document.createElement("button");
        this.forecastButtonElement.className = "button is-info";
        this.forecastButtonElement.innerText = "Prognoza 48h";
        this.forecastButtonElement.addEventListener("click", () => this.showForecast())
        cardFooterItemContent.appendChild(this.forecastButtonElement);
    }

    private createCardFooter(cardElement: HTMLDivElement) {
        let cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";
        cardElement.appendChild(cardFooter);

        this.createLeftFooterItem(cardFooter);
        this.createRightFooterItem(cardFooter);
    }

    private createRightFooterItem(cardElement: HTMLDivElement) {
        let cardFooterItemRight = document.createElement("div");
        cardFooterItemRight.className = "card-footer-item is-half";
        cardElement.appendChild(cardFooterItemRight);

        let cardFooterItemContainer = document.createElement("div");
        cardFooterItemContainer.className = "container";
        cardFooterItemRight.appendChild(cardFooterItemContainer);

        let cardFooterItemContent = document.createElement("div");
        cardFooterItemContent.className = "content has-text-centered";
        cardFooterItemContainer.appendChild(cardFooterItemContent);

        this.createRightFooterPressureItem(cardFooterItemContent);
        this.createRightFooterHumidityItem(cardFooterItemContent);
    }

    private createRightFooterPressureItem(cardFooterItemContent: HTMLDivElement) {
        let cardFooterItemPressureText = document.createElement("div");
        cardFooterItemPressureText.className = "py-2 px-0 has-text-weight-medium";
        cardFooterItemContent.appendChild(cardFooterItemPressureText);

        let pressurePrefix = document.createElement("span");
        pressurePrefix.innerHTML = "Ciśnienie: ";
        cardFooterItemPressureText.appendChild(pressurePrefix);

        this.pressureElement = document.createElement("span");
        cardFooterItemPressureText.appendChild(this.pressureElement);

        let pressureSufix = document.createElement("span");
        pressureSufix.innerHTML = "&nbsp;hPa";
        cardFooterItemPressureText.appendChild(pressureSufix);
    }

    private createRightFooterHumidityItem(cardFooterItemContent: HTMLDivElement) {
        let cardFooterItemHumidityText = document.createElement("div");
        cardFooterItemHumidityText.className = "py-2 px-0 has-text-weight-medium";
        cardFooterItemContent.appendChild(cardFooterItemHumidityText);

        let humidityPrefix = document.createElement("span");
        humidityPrefix.innerHTML = "Wilgotność: ";
        cardFooterItemHumidityText.appendChild(humidityPrefix);

        this.humidityElement = document.createElement("span");
        cardFooterItemHumidityText.appendChild(this.humidityElement);

        let humiditySufix = document.createElement("span");
        humiditySufix.innerHTML = "%";
        cardFooterItemHumidityText.appendChild(humiditySufix);
    }

    private createLeftFooterItem(cardElement: HTMLDivElement) {
        let cardFooterItemLeft = document.createElement("div");
        cardFooterItemLeft.className = "card-footer-item is-half is-flex is-justify-content-center is-align-items-center";
        cardElement.appendChild(cardFooterItemLeft);

        let cardFooterItemLeftText = document.createElement("div");
        cardFooterItemLeftText.className = "is-size-3";
        cardFooterItemLeft.appendChild(cardFooterItemLeftText);

        this.temperatureElement = document.createElement("span");
        cardFooterItemLeftText.appendChild(this.temperatureElement);

        let temperatureSufix = document.createElement("span");
        temperatureSufix.innerHTML = "&nbsp;&deg;C"
        cardFooterItemLeftText.appendChild(temperatureSufix);
    }

    private createCardContent(cardElement: HTMLDivElement) {
        let cardContent = document.createElement("div");
        cardContent.className = "card-content pt-2";
        cardElement.appendChild(cardContent);

        let container = document.createElement("div");
        container.className = "container";
        cardContent.appendChild(container);

        let imgColumns = document.createElement("div");
        imgColumns.className = "columns is-centered is-mobile";
        container.appendChild(imgColumns);

        let imgColumn = document.createElement("div");
        imgColumn.className = "column is-narrow p-0";
        imgColumns.appendChild(imgColumn);

        this.imgElement = document.createElement("img");
        this.imgElement.className = "image is-128x128";
        imgColumn.appendChild(this.imgElement);

        this.descriptionElement = document.createElement("div");
        this.descriptionElement.className = "subtitle has-text-centered";
        cardContent.appendChild(this.descriptionElement);
    }

    private createCardHeader(cardElement: HTMLElement) {
        let cardHeader = document.createElement("div");
        cardHeader.className = "card-header";
        cardElement.appendChild(cardHeader);

        let cardHeaderTitle = document.createElement("div");
        cardHeaderTitle.className = "card-header-title";
        cardHeader.appendChild(cardHeaderTitle);

        this.cityNameElement = document.createElement("div");
        this.cityNameElement.className = "container has-text-centered";
        cardHeaderTitle.appendChild(this.cityNameElement);

        let cardHeaderClose = document.createElement("div");
        cardHeaderClose.className = "p-3";
        cardHeader.appendChild(cardHeaderClose);

        let cardHeaderCloseButton = document.createElement("button");
        cardHeaderCloseButton.className = "has-background-info delete is-medium";
        cardHeaderCloseButton.addEventListener("click", () => this.delete());
        cardHeaderClose.appendChild(cardHeaderCloseButton);
    }

    private delete(){
        this.deleteCallback(this);
        this.mainElement.parentElement.removeChild(this.mainElement);
    }

    private showForecast(){
        this.forecastCallback(this.cityName, this.cords);
    }
}

export {CityWeather}