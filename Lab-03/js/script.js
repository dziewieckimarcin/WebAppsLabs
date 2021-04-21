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
    function CityWeather(weatherData, parentElement, deleteCallback) {
        this.deleteCallback = deleteCallback;
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
    };
    CityWeather.prototype.refreshData = function (weatherData) {
        this.setValues(weatherData);
    };
    CityWeather.prototype.setValues = function (weatherData) {
        this.cityName = weatherData.name;
        this.weather = weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1);
        this.temperature = weatherData.main.temp;
        this.pressure = weatherData.main.pressure;
        this.humidity = weatherData.main.humidity;
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
        parentElement.appendChild(this.mainElement);
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
        cardContent.className = "card-content";
        cardElement.appendChild(cardContent);
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
    return CityWeather;
}());
/// <reference path='cityWeather.ts'/>
var AllWeathers = /** @class */ (function () {
    function AllWeathers() {
        var _this = this;
        this.weatherApi = new WeatherApi();
        this.weathersCollection = [];
        this.refreshTime = 600000;
        this.allWeathersSectionElement = document.getElementById("all-weathers-section");
        this.refreshInterval = setInterval(function () { return _this.refreshAllWeathers(); }, this.refreshTime);
    }
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
                        if (!!this.checkCityExistInCollection(cityName)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.weatherApi.getWeatherByCity(cityName)];
                    case 1:
                        weather = _a.sent();
                        if (!this.checkCityExistInCollection(weather.name)) {
                            cityWeather = new CityWeather(weather, this.allWeathersSectionElement, function (ob) { return _this.removeWeatherFromCollection(ob); });
                            this.weathersCollection.push(cityWeather);
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
            if (x.getCityName() == cityName)
                cityExist = true;
        });
        return cityExist;
    };
    AllWeathers.prototype.removeWeatherFromCollection = function (ob) {
        this.weathersCollection = this.weathersCollection.filter(function (x) { return x != ob; });
    };
    return AllWeathers;
}());
/// <reference path='weatherApiResponse.ts'/>
var WeatherApi = /** @class */ (function () {
    function WeatherApi() {
        this.apiKeyValue = '3c9297d4bffa510f74b3d44806e88662';
        this.url = 'http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric&lang=pl';
        this.cityKey = '{city name}';
        this.apiKey = '{API key}';
    }
    WeatherApi.prototype.getWeatherByCity = function (city) {
        return __awaiter(this, void 0, void 0, function () {
            var validUrl, response, jsonResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validUrl = this.url.replace(this.cityKey, city).replace(this.apiKey, this.apiKeyValue);
                        return [4 /*yield*/, fetch(validUrl)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        jsonResponse = (_a.sent());
                        console.log(jsonResponse);
                        return [2 /*return*/, jsonResponse];
                }
            });
        });
    };
    return WeatherApi;
}());
/// <reference path='weatherApi.ts'/>
/// <reference path='allWeathers.ts'/>
var Main = /** @class */ (function () {
    function Main() {
        this.allWeathers = new AllWeathers();
        this.initDocumentElements();
    }
    Main.prototype.initDocumentElements = function () {
        var _this = this;
        this.addButton = document.getElementById("add-city-button");
        this.addInput = document.getElementById("add-city-input");
        this.addButton.addEventListener('click', function () { return _this.addNewCity(); });
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
