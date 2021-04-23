var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/// <reference path='weatherApiResponse.ts'/>
var CityWeather = /** @class */ (function () {
    function CityWeather(weatherData, parentElement, deleteCallback, forecastCallback) {
        this.deleteCallback = deleteCallback;
        this.forecastCallback = forecastCallback;
        this.setValues(weatherData);
        this.createHtmlElements(parentElement);
        this.updateValuesOnHtmlElements();
    }
    CityWeather.prototype.updateValuesOnHtmlElements = function () {
        this.cityNameElement.innerText = this.cityName;
        this.descriptionElement.innerText = this.weather;
        this.temperatureElement.innerText = this.temperature.toFixed(0).toString();
        this.pressureElement.innerText = this.pressure.toFixed(0).toString();
        this.humidityElement.innerText = this.humidity.toFixed(0).toString();
        this.imgElement.src = "./images/" + this.weatherIcon + ".png";
    };
    CityWeather.prototype.refreshData = function (weatherData) {
        this.setValues(weatherData);
    };
    CityWeather.prototype.setValues = function (weatherData) {
        this.cityName = weatherData.name;
        this.weatherIcon = weatherData.weather[0].icon;
        this.weather = weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1);
        this.temperature = weatherData.main.temp;
        this.pressure = weatherData.main.pressure;
        this.humidity = weatherData.main.humidity;
        this.cords = weatherData.coord;
    };
    CityWeather.prototype.getCityName = function () {
        return this.cityName;
    };
    CityWeather.prototype.createHtmlElements = function (parentElement) {
        this.mainElement = document.createElement("div");
        this.mainElement.className = "column is-half-tablet is-two-fifths-desktop is-one-third-widescreen";
        var cardElement = document.createElement("div");
        cardElement.className = "card";
        this.mainElement.appendChild(cardElement);
        this.createCardHeader(cardElement);
        this.createCardContent(cardElement);
        this.createCardFooter(cardElement);
        this.createForecastCardFooter(cardElement);
        parentElement.appendChild(this.mainElement);
    };
    CityWeather.prototype.createForecastCardFooter = function (cardElement) {
        var cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";
        cardElement.appendChild(cardFooter);
        this.createForecastFooterItem(cardFooter);
    };
    CityWeather.prototype.createForecastFooterItem = function (cardElement) {
        var _this = this;
        var forecastCardFooterItem = document.createElement("div");
        forecastCardFooterItem.className = "card-footer-item is-half";
        cardElement.appendChild(forecastCardFooterItem);
        var cardFooterItemContainer = document.createElement("div");
        cardFooterItemContainer.className = "container";
        forecastCardFooterItem.appendChild(cardFooterItemContainer);
        var cardFooterItemContent = document.createElement("div");
        cardFooterItemContent.className = "content has-text-centered";
        cardFooterItemContainer.appendChild(cardFooterItemContent);
        this.forecastButtonElement = document.createElement("button");
        this.forecastButtonElement.className = "button is-info";
        this.forecastButtonElement.innerText = "Prognoza 48h";
        this.forecastButtonElement.addEventListener("click", function () { return _this.showForecast(); });
        cardFooterItemContent.appendChild(this.forecastButtonElement);
    };
    CityWeather.prototype.createCardFooter = function (cardElement) {
        var cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";
        cardElement.appendChild(cardFooter);
        this.createLeftFooterItem(cardFooter);
        this.createRightFooterItem(cardFooter);
    };
    CityWeather.prototype.createRightFooterItem = function (cardElement) {
        var cardFooterItemRight = document.createElement("div");
        cardFooterItemRight.className = "card-footer-item is-half";
        cardElement.appendChild(cardFooterItemRight);
        var cardFooterItemContainer = document.createElement("div");
        cardFooterItemContainer.className = "container";
        cardFooterItemRight.appendChild(cardFooterItemContainer);
        var cardFooterItemContent = document.createElement("div");
        cardFooterItemContent.className = "content has-text-centered";
        cardFooterItemContainer.appendChild(cardFooterItemContent);
        this.createRightFooterPressureItem(cardFooterItemContent);
        this.createRightFooterHumidityItem(cardFooterItemContent);
    };
    CityWeather.prototype.createRightFooterPressureItem = function (cardFooterItemContent) {
        var cardFooterItemPressureText = document.createElement("div");
        cardFooterItemPressureText.className = "py-2 px-0 has-text-weight-medium";
        cardFooterItemContent.appendChild(cardFooterItemPressureText);
        var pressurePrefix = document.createElement("span");
        pressurePrefix.innerHTML = "Ciśnienie: ";
        cardFooterItemPressureText.appendChild(pressurePrefix);
        this.pressureElement = document.createElement("span");
        cardFooterItemPressureText.appendChild(this.pressureElement);
        var pressureSufix = document.createElement("span");
        pressureSufix.innerHTML = "&nbsp;hPa";
        cardFooterItemPressureText.appendChild(pressureSufix);
    };
    CityWeather.prototype.createRightFooterHumidityItem = function (cardFooterItemContent) {
        var cardFooterItemHumidityText = document.createElement("div");
        cardFooterItemHumidityText.className = "py-2 px-0 has-text-weight-medium";
        cardFooterItemContent.appendChild(cardFooterItemHumidityText);
        var humidityPrefix = document.createElement("span");
        humidityPrefix.innerHTML = "Wilgotność: ";
        cardFooterItemHumidityText.appendChild(humidityPrefix);
        this.humidityElement = document.createElement("span");
        cardFooterItemHumidityText.appendChild(this.humidityElement);
        var humiditySufix = document.createElement("span");
        humiditySufix.innerHTML = "%";
        cardFooterItemHumidityText.appendChild(humiditySufix);
    };
    CityWeather.prototype.createLeftFooterItem = function (cardElement) {
        var cardFooterItemLeft = document.createElement("div");
        cardFooterItemLeft.className = "card-footer-item is-half is-flex is-justify-content-center is-align-items-center";
        cardElement.appendChild(cardFooterItemLeft);
        var cardFooterItemLeftText = document.createElement("div");
        cardFooterItemLeftText.className = "is-size-3";
        cardFooterItemLeft.appendChild(cardFooterItemLeftText);
        this.temperatureElement = document.createElement("span");
        cardFooterItemLeftText.appendChild(this.temperatureElement);
        var temperatureSufix = document.createElement("span");
        temperatureSufix.innerHTML = "&nbsp;&deg;C";
        cardFooterItemLeftText.appendChild(temperatureSufix);
    };
    CityWeather.prototype.createCardContent = function (cardElement) {
        var cardContent = document.createElement("div");
        cardContent.className = "card-content pt-2";
        cardElement.appendChild(cardContent);
        var container = document.createElement("div");
        container.className = "container";
        cardContent.appendChild(container);
        var imgColumns = document.createElement("div");
        imgColumns.className = "columns is-centered";
        container.appendChild(imgColumns);
        var imgColumn = document.createElement("div");
        imgColumn.className = "column is-narrow p-0";
        imgColumns.appendChild(imgColumn);
        this.imgElement = document.createElement("img");
        this.imgElement.className = "image is-128x128";
        imgColumn.appendChild(this.imgElement);
        this.descriptionElement = document.createElement("div");
        this.descriptionElement.className = "subtitle has-text-centered";
        cardContent.appendChild(this.descriptionElement);
    };
    CityWeather.prototype.createCardHeader = function (cardElement) {
        var _this = this;
        var cardHeader = document.createElement("div");
        cardHeader.className = "card-header";
        cardElement.appendChild(cardHeader);
        var cardHeaderTitle = document.createElement("div");
        cardHeaderTitle.className = "card-header-title";
        cardHeader.appendChild(cardHeaderTitle);
        this.cityNameElement = document.createElement("div");
        this.cityNameElement.className = "container has-text-centered";
        cardHeaderTitle.appendChild(this.cityNameElement);
        var cardHeaderClose = document.createElement("div");
        cardHeaderClose.className = "p-3";
        cardHeader.appendChild(cardHeaderClose);
        var cardHeaderCloseButton = document.createElement("button");
        cardHeaderCloseButton.className = "has-background-info delete is-medium";
        cardHeaderCloseButton.addEventListener("click", function () { return _this.delete(); });
        cardHeaderClose.appendChild(cardHeaderCloseButton);
    };
    CityWeather.prototype.delete = function () {
        this.deleteCallback(this);
        this.mainElement.parentElement.removeChild(this.mainElement);
    };
    CityWeather.prototype.showForecast = function () {
        this.forecastCallback(this.cityName, this.cords);
    };
    return CityWeather;
}());
/// <reference path='cityWeather.ts'/>
var AllWeathers = /** @class */ (function () {
    function AllWeathers(forecastCallback) {
        var _this = this;
        this.weatherApi = new WeatherApi();
        this.weathersCollection = [];
        this.refreshTime = 120000;
        this.forecastCallback = forecastCallback;
        this.allWeathersSectionElement = document.getElementById("all-weathers-section");
        this.refreshInterval = setInterval(function () { return _this.refreshAllWeathers(); }, this.refreshTime);
        this.loadDataFromStorage();
    }
    AllWeathers.prototype.showForecast = function (cityName, cords) {
        this.forecastCallback(cityName, cords);
    };
    AllWeathers.prototype.refreshAllWeathers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.weathersCollection.forEach(function (x) { return __awaiter(_this, void 0, void 0, function () {
                    var weather;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.weatherApi.getWeatherByCity(x.getCityName())];
                            case 1:
                                weather = _a.sent();
                                x.refreshData(weather);
                                return [2 /*return*/];
                        }
                    });
                }); });
                console.log(this.weathersCollection);
                return [2 /*return*/];
            });
        });
    };
    AllWeathers.prototype.addCityWeather = function (cityName) {
        return __awaiter(this, void 0, void 0, function () {
            var weather, cityWeather;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (cityName.trim().length == 0) {
                            // show notification that field is empty
                            return [2 /*return*/];
                        }
                        if (!!this.checkCityExistInCollection(cityName)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.weatherApi.getWeatherByCity(cityName)];
                    case 1:
                        weather = _a.sent();
                        if (weather == null) {
                            // show notification that city not exist
                            return [2 /*return*/];
                        }
                        if (!this.checkCityExistInCollection(weather.name)) {
                            cityWeather = new CityWeather(weather, this.allWeathersSectionElement, function (ob) { return _this.removeWeatherFromCollection(ob); }, function (cityName, cords) { return _this.showForecast(cityName, cords); });
                            this.weathersCollection.push(cityWeather);
                            this.saveDataToStorage();
                        }
                        else {
                            // Show notification that city already shown
                        }
                        return [3 /*break*/, 2];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AllWeathers.prototype.checkCityExistInCollection = function (cityName) {
        var cityExist = false;
        this.weathersCollection.forEach(function (x) {
            if (x.getCityName().toLowerCase() == cityName.toLowerCase())
                cityExist = true;
        });
        return cityExist;
    };
    AllWeathers.prototype.removeWeatherFromCollection = function (ob) {
        this.weathersCollection = this.weathersCollection.filter(function (x) { return x != ob; });
        this.saveDataToStorage();
    };
    AllWeathers.prototype.saveDataToStorage = function () {
        var cities = [];
        this.weathersCollection.forEach(function (x) { return cities.push(x.getCityName()); });
        localStorage.setItem("cities", JSON.stringify(cities));
    };
    AllWeathers.prototype.loadDataFromStorage = function () {
        var _this = this;
        var data = localStorage.getItem("cities");
        if (data) {
            var cities = JSON.parse(data);
            cities.forEach(function (x) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addCityWeather(x)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
        }
    };
    return AllWeathers;
}());
/// <reference path='weatherApiResponse.ts'/>
/// <reference path='forecastApiResponse.ts'/>
var WeatherApi = /** @class */ (function () {
    function WeatherApi() {
        this.apiKeyValue = '3c9297d4bffa510f74b3d44806e88662';
        this.weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric&lang=pl';
        this.forecastUrl = 'http://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}&units=metric&lang=pl';
        this.cityKey = '{city name}';
        this.apiKey = '{API key}';
        this.latKey = '{lat}';
        this.lonKey = '{lon}';
    }
    WeatherApi.prototype.getWeatherByCity = function (city) {
        return __awaiter(this, void 0, void 0, function () {
            var validUrl, response, jsonResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validUrl = this.weatherUrl.replace(this.cityKey, city).replace(this.apiKey, this.apiKeyValue);
                        return [4 /*yield*/, fetch(validUrl)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        jsonResponse = (_a.sent());
                        return [2 /*return*/, jsonResponse];
                    case 3:
                        console.log("fetch data error");
                        return [2 /*return*/, null];
                }
            });
        });
    };
    WeatherApi.prototype.getForecastByCity = function (city, cords) {
        return __awaiter(this, void 0, void 0, function () {
            var validUrl, response, jsonResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validUrl = this.forecastUrl.replace(this.apiKey, this.apiKeyValue).replace(this.latKey, cords.lat.toString()).replace(this.lonKey, cords.lon.toString());
                        return [4 /*yield*/, fetch(validUrl)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        jsonResponse = (_a.sent());
                        return [2 /*return*/, jsonResponse];
                    case 3:
                        console.log("fetch data error");
                        return [2 /*return*/, null];
                }
            });
        });
    };
    return WeatherApi;
}());
/// <reference path='weatherApi.ts'/>
var Forecast = /** @class */ (function () {
    function Forecast() {
        var _this = this;
        this.weatherApi = new WeatherApi();
        this.modalElement = document.getElementById("forecast-modal");
        this.forecastElementsSection = document.getElementById("forecast-elements-section");
        this.closeModalButton = document.getElementById("close-forecast-button");
        this.closeModalButton.addEventListener('click', function () { return _this.hideForecast(); });
        this.forecastCityNameElement = document.getElementById("forecast-city");
    }
    Forecast.prototype.hideForecast = function () {
        this.modalElement.classList.remove("is-active");
        this.forecastCityNameElement.innerText = '';
        this.forecastElementsSection.innerHTML = '';
    };
    Forecast.prototype.showForecast = function (cityName, cords) {
        return __awaiter(this, void 0, void 0, function () {
            var forecast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.weatherApi.getForecastByCity(cityName, cords)];
                    case 1:
                        forecast = _a.sent();
                        if (forecast == null) {
                            // show notification error
                            return [2 /*return*/];
                        }
                        this.buildForecastElements(forecast.hourly);
                        this.forecastCityNameElement.innerText = cityName;
                        this.modalElement.classList.add("is-active");
                        return [2 /*return*/];
                }
            });
        });
    };
    Forecast.prototype.buildForecastElements = function (forecastCollection) {
        var _this = this;
        forecastCollection.forEach(function (x) { return _this.buildMainElement(x); });
    };
    Forecast.prototype.buildMainElement = function (forecast) {
        var mainElement = document.createElement("div");
        mainElement.className = "column p-1 is-full";
        var subElement1 = document.createElement("div");
        subElement1.className = "box p-3";
        mainElement.appendChild(subElement1);
        var subElement2 = document.createElement("div");
        subElement2.className = "container";
        subElement1.appendChild(subElement2);
        var subElement3 = document.createElement("div");
        subElement3.className = "columns is-mobile";
        subElement2.appendChild(subElement3);
        this.createMobileImageElement(subElement3, forecast);
        this.createFullSizeElement(subElement3, forecast);
        this.forecastElementsSection.appendChild(mainElement);
    };
    Forecast.prototype.createMobileImageElement = function (parentElement, forecast) {
        var mainElement = document.createElement("div");
        mainElement.className = "column is-half-mobile is-hidden-tablet is-flex is-justify-content-center is-align-items-center";
        var subElement1 = document.createElement("figure");
        subElement1.className = "image is-96x96 p-0";
        mainElement.appendChild(subElement1);
        var subElement2 = document.createElement("img");
        subElement2.src = "./images/" + forecast.weather[0].icon + ".png";
        subElement1.appendChild(subElement2);
        parentElement.appendChild(mainElement);
    };
    Forecast.prototype.createFullSizeElement = function (parentElement, forecast) {
        var mainElement = document.createElement("div");
        mainElement.className = "column is-half-mobile";
        var subElement1 = document.createElement("div");
        subElement1.className = "container";
        mainElement.appendChild(subElement1);
        var subElement2 = document.createElement("div");
        subElement2.className = "columns p-0";
        subElement1.appendChild(subElement2);
        this.createFullSizeImageElement(subElement2, forecast);
        this.createTemperatureElement(subElement2, forecast);
        this.createPressureElement(subElement2, forecast);
        this.createHumidityElement(subElement2, forecast);
        this.createDateTimeElement(subElement2, forecast);
        parentElement.appendChild(mainElement);
    };
    Forecast.prototype.createFullSizeImageElement = function (parentElement, forecast) {
        var mainElement = document.createElement("div");
        mainElement.className = "column is-hidden-mobile p-0 is-1 is-flex is-justify-content-center is-align-items-center";
        var subElement1 = document.createElement("figure");
        subElement1.className = "image is-48x48 p-0";
        mainElement.appendChild(subElement1);
        var subElement2 = document.createElement("img");
        subElement2.src = "./images/" + forecast.weather[0].icon + ".png";
        subElement1.appendChild(subElement2);
        parentElement.appendChild(mainElement);
    };
    Forecast.prototype.createTemperatureElement = function (parentElement, forecast) {
        var mainElement = document.createElement("div");
        mainElement.className = "column p-1 is-1 is-flex is-justify-content-center is-align-items-center";
        var subElement1 = document.createElement("div");
        subElement1.className = "subtitle is-6";
        mainElement.appendChild(subElement1);
        var subElement2 = document.createElement("span");
        subElement2.innerText = forecast.temp.toFixed(0).toString();
        subElement1.appendChild(subElement2);
        var subElement3 = document.createElement("span");
        subElement3.innerHTML = "&nbsp;&deg;C";
        subElement2.appendChild(subElement3);
        parentElement.appendChild(mainElement);
    };
    Forecast.prototype.createPressureElement = function (parentElement, forecast) {
        var mainElement = document.createElement("div");
        mainElement.className = "column p-1 is-3 is-flex is-justify-content-center is-align-items-center";
        var subElement1 = document.createElement("div");
        subElement1.className = "subtitle is-6";
        mainElement.appendChild(subElement1);
        var subElement2 = document.createElement("span");
        subElement2.innerText = "Ciś. ";
        subElement1.appendChild(subElement2);
        var subElement3 = document.createElement("span");
        subElement3.innerText = forecast.pressure.toFixed(0).toString();
        subElement2.appendChild(subElement3);
        var subElement4 = document.createElement("span");
        subElement4.innerHTML = "&nbsp;hPa";
        subElement3.appendChild(subElement4);
        parentElement.appendChild(mainElement);
    };
    Forecast.prototype.createHumidityElement = function (parentElement, forecast) {
        var mainElement = document.createElement("div");
        mainElement.className = "column p-1 is-3 is-flex is-justify-content-center is-align-items-center";
        var subElement1 = document.createElement("div");
        subElement1.className = "subtitle is-6";
        mainElement.appendChild(subElement1);
        var subElement2 = document.createElement("span");
        subElement2.innerText = "Wilg. ";
        subElement1.appendChild(subElement2);
        var subElement3 = document.createElement("span");
        subElement3.innerText = forecast.humidity.toFixed(0).toString();
        subElement2.appendChild(subElement3);
        var subElement4 = document.createElement("span");
        subElement4.innerHTML = "%";
        subElement3.appendChild(subElement4);
        parentElement.appendChild(mainElement);
    };
    Forecast.prototype.createDateTimeElement = function (parentElement, forecast) {
        var mainElement = document.createElement("div");
        mainElement.className = "column p-1 is-4 is-flex is-justify-content-center is-align-items-center";
        var subElement1 = document.createElement("div");
        subElement1.className = "subtitle is-6";
        mainElement.appendChild(subElement1);
        var subElement2 = document.createElement("span");
        subElement2.innerText = this.timeConverter(forecast.dt);
        subElement1.appendChild(subElement2);
        parentElement.appendChild(mainElement);
    };
    Forecast.prototype.timeConverter = function (UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' g. ' + hour + ':00';
        return time;
    };
    return Forecast;
}());
/// <reference path='allWeathers.ts'/>
/// <reference path='forecast.ts'/>
var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        this.allWeathers = new AllWeathers(function (cityName, cords) { return _this.showForecast(cityName, cords); });
        this.forecast = new Forecast();
        this.initDocumentElements();
    }
    Main.prototype.showForecast = function (cityName, cords) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.forecast.showForecast(cityName, cords)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.initDocumentElements = function () {
        var _this = this;
        this.addButton = document.getElementById("add-city-button");
        this.addButton.addEventListener('click', function () { return _this.addNewCity(); });
        this.addInput = document.getElementById("add-city-input");
        this.addInput.addEventListener('change', function () { return _this.addNewCity(); });
    };
    Main.prototype.addNewCity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cityName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cityName = this.addInput.value;
                        return [4 /*yield*/, this.allWeathers.addCityWeather(cityName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Main;
}());
/// <reference path='main.ts'/>
var main = new Main();
