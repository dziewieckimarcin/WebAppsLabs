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
            const decimalPoints = 2;

            this.sumValue = this.fixStringValue(this.getSum(values), decimalPoints);
            this.avgValue = this.fixStringValue(this.getAvg(values), decimalPoints);
            this.minValue = this.fixStringValue(this.getMin(values), decimalPoints);
            this.maxValue = this.fixStringValue(this.getMax(values), decimalPoints);

            this.updateDocumentValues();
        }
    }

    private fixStringValue(value: number, decimalPoints: number): string{
        if (decimalPoints <= 0)
            return value.toFixed(0);
        
        let x = value.toFixed(decimalPoints);

        for (let index = 0; index < decimalPoints; index++) {
            console.log(x[x.length - decimalPoints]);
            if  (x[x.length - 1] == "0")
                x = x.slice(0, x.length - 1);
        }

        if (x[x.length -1] == "." || x[x.length -1] == ",")
            x = x.slice(0, x.length - 1);

        return x;
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