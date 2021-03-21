class Stats{

    private sumElement: HTMLElement;
    private avgElement: HTMLElement;
    private minElement: HTMLElement;
    private maxElement: HTMLElement;

    private sumValue: string;
    private avgValue: string;
    private minValue: string;
    private maxValue: string;

    private readonly noValue = 'Wprowadź dane...';

    constructor(){
        this.SetHtmlElements();
        this.updateStats([]);
    }

    private SetHtmlElements() {
        this.sumElement = document.querySelector('#sum-value');
        this.avgElement = document.querySelector('#avg-value');
        this.minElement = document.querySelector('#min-value');
        this.maxElement = document.querySelector('#max-value');
    }

    updateStats(values: number[]){
        if (this.checkIfArrayIsInvalid(values)){
            this.sumValue = this.noValue;
            this.avgValue = this.noValue;
            this.minValue = this.noValue;
            this.maxValue = this.noValue;

            this.updateDocumentValues();
        }
        else{
            this.sumValue = this.getSum(values).toString();
            this.avgValue = this.getAvg(values).toString();
            this.minValue = this.getMin(values).toString();
            this.maxValue = this.getMax(values).toString();

            this.updateDocumentValues();
        }
    }

    private checkIfArrayIsInvalid(values: number[]):Boolean{
        return values.some(x => isNaN(x)) || values.length == 0;
    }

    private updateDocumentValues(){
        this.sumElement.innerHTML = this.sumValue;
        this.avgElement.innerHTML = this.avgValue;
        this.minElement.innerHTML = this.minValue;
        this.maxElement.innerHTML = this.maxValue;
    }

    private getSum(values: number[]) :number{
        let returnValue = 0;
        for (let v of values){
            returnValue += v;
        }
        return returnValue;
    }

    private getAvg(values: number[]) :number{
        return this.getSum(values) / values.length;
    }

    private getMin(values: number[]) :number{
        let returnValue = values[0];
        for (let v of values){
            if (v < returnValue)
                returnValue = v;
        }
        return returnValue;
    }

    private getMax(values: number[]) :number{
        let returnValue = values[0];
        for (let v of values){
            if (v > returnValue)
                returnValue = v;
        }
        return returnValue;
    }
}