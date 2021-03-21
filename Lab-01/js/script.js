var SingleInputRow = /** @class */ (function () {
    function SingleInputRow(parentElement) {
        this.isChecked = false;
        this.create(parentElement);
    }
    SingleInputRow.prototype.create = function (parentElement) {
        this.currentElement = document.createElement('div');
        this.createRemoveCheckbox();
        this.createInput();
        this.createRemoveButton();
        parentElement.appendChild(this.currentElement);
    };
    SingleInputRow.prototype.createRemoveCheckbox = function () {
        var _this = this;
        this.checkBoxElement = document.createElement('input');
        this.checkBoxElement.type = 'checkbox';
        this.checkBoxElement.addEventListener('input', function () { return _this.removeCheckBoxValueChanged(); });
        this.currentElement.appendChild(this.checkBoxElement);
    };
    SingleInputRow.prototype.removeCheckBoxValueChanged = function () {
        this.isChecked = this.checkBoxElement.checked;
    };
    SingleInputRow.prototype.createInput = function () {
        var _this = this;
        this.inputElement = document.createElement('input');
        this.currentElement.appendChild(this.inputElement);
        this.inputElement.addEventListener('input', function () { return _this.inputValueCahnged(); });
    };
    SingleInputRow.prototype.inputValueCahnged = function () {
        this.onInputUpdate();
    };
    SingleInputRow.prototype.createRemoveButton = function () {
        var _this = this;
        var removeButton = document.createElement('button');
        removeButton.innerHTML = 'Usuń';
        removeButton.addEventListener('click', function () { return _this.remove(); });
        this.currentElement.appendChild(removeButton);
    };
    SingleInputRow.prototype.remove = function () {
        this.onRemoveElement(this);
        this.currentElement.parentElement.removeChild(this.currentElement);
    };
    SingleInputRow.prototype.getCurrentValue = function () {
        return parseFloat(this.inputElement.value);
    };
    return SingleInputRow;
}());
/// <reference path='singleInputRow.ts'/>
var InputRows = /** @class */ (function () {
    function InputRows() {
        this.rowsColection = [];
        this.SetHtmlElements();
        this.SetButttonsEvents();
    }
    InputRows.prototype.addInitialRows = function (numberOfRows) {
        this.addInputRows(numberOfRows);
    };
    InputRows.prototype.SetButttonsEvents = function () {
        var _this = this;
        this.removeCheckedRowsButton.addEventListener('click', function () { return _this.removeCheckedRows(); });
        this.addSingleRowButton.addEventListener('click', function () { return _this.addInputRows(1); });
        this.addMultipleRowsButton.addEventListener('click', function () { return _this.addInputRowsByInputValue(); });
    };
    InputRows.prototype.SetHtmlElements = function () {
        this.removeCheckedRowsButton = document.querySelector('#remove-checked');
        this.addSingleRowButton = document.querySelector('#add-single-row');
        this.addMultipleRowsButton = document.querySelector('#add-multiple-rows');
        this.inputRowsNumber = document.querySelector('#add-multiple-rows-input-value');
        this.inputRowsSectionElement = document.querySelector('#inputs-section');
    };
    InputRows.prototype.removeCheckedRows = function () {
        this.rowsColection.forEach(function (x) {
            if (x.isChecked)
                x.remove();
        });
    };
    InputRows.prototype.addInputRowsByInputValue = function () {
        var x = parseInt(this.inputRowsNumber.value);
        if (x > 0)
            this.addInputRows(x);
    };
    InputRows.prototype.addInputRows = function (numberOfRows) {
        var _this = this;
        for (var i = 0; i < numberOfRows; i++) {
            var x = new SingleInputRow(this.inputRowsSectionElement);
            x.onInputUpdate = function () { return _this.inputValueCahnged(); };
            x.onRemoveElement = function (element) { return _this.inputRowRemoved(element); };
            this.rowsColection.push(x);
            this.inputValueCahnged();
        }
    };
    InputRows.prototype.inputValueCahnged = function () {
        this.onInputUpdate();
    };
    InputRows.prototype.inputRowRemoved = function (element) {
        this.rowsColection = this.rowsColection.filter(function (x) { return x != element; });
        this.inputValueCahnged();
    };
    InputRows.prototype.getValues = function () {
        var returnArray = [];
        this.rowsColection.forEach(function (x) { return returnArray.push(x.getCurrentValue()); });
        return returnArray;
    };
    return InputRows;
}());
var Stats = /** @class */ (function () {
    function Stats() {
        this.noValue = 'Wprowadź dane...';
        this.SetHtmlElements();
        this.updateStats([]);
    }
    Stats.prototype.SetHtmlElements = function () {
        this.sumElement = document.querySelector('#sum-value');
        this.avgElement = document.querySelector('#avg-value');
        this.minElement = document.querySelector('#min-value');
        this.maxElement = document.querySelector('#max-value');
    };
    Stats.prototype.updateStats = function (values) {
        if (this.checkIfArrayIsInvalid(values)) {
            this.sumValue = this.noValue;
            this.avgValue = this.noValue;
            this.minValue = this.noValue;
            this.maxValue = this.noValue;
            this.updateDocumentValues();
        }
        else {
            this.sumValue = this.getSum(values).toString();
            this.avgValue = this.getAvg(values).toString();
            this.minValue = this.getMin(values).toString();
            this.maxValue = this.getMax(values).toString();
            this.updateDocumentValues();
        }
    };
    Stats.prototype.checkIfArrayIsInvalid = function (values) {
        return values.some(function (x) { return isNaN(x); }) || values.length == 0;
    };
    Stats.prototype.updateDocumentValues = function () {
        this.sumElement.innerHTML = this.sumValue;
        this.avgElement.innerHTML = this.avgValue;
        this.minElement.innerHTML = this.minValue;
        this.maxElement.innerHTML = this.maxValue;
    };
    Stats.prototype.getSum = function (values) {
        var returnValue = 0;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var v = values_1[_i];
            returnValue += v;
        }
        return returnValue;
    };
    Stats.prototype.getAvg = function (values) {
        return this.getSum(values) / values.length;
    };
    Stats.prototype.getMin = function (values) {
        var returnValue = values[0];
        for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
            var v = values_2[_i];
            if (v < returnValue)
                returnValue = v;
        }
        return returnValue;
    };
    Stats.prototype.getMax = function (values) {
        var returnValue = values[0];
        for (var _i = 0, values_3 = values; _i < values_3.length; _i++) {
            var v = values_3[_i];
            if (v > returnValue)
                returnValue = v;
        }
        return returnValue;
    };
    return Stats;
}());
/// <reference path='inputRows.ts'/>
/// <reference path='stats.ts'/>
var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        this.stats = new Stats();
        this.inputRows = new InputRows();
        this.inputRows.onInputUpdate = function () { return _this.updateStats(); };
        this.inputRows.addInitialRows(3);
    }
    Main.prototype.updateStats = function () {
        this.stats.updateStats(this.inputRows.getValues());
    };
    return Main;
}());
var main = new Main();
