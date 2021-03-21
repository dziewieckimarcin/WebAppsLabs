/// <reference path='singleInputRow.ts'/>

class InputRows{

    private removeCheckedRowsButton: HTMLButtonElement;
    private addSingleRowButton: HTMLButtonElement;
    private addMultipleRowsButton: HTMLButtonElement;
    private inputRowsNumber: HTMLInputElement;
    private inputRowsSectionElement: HTMLElement;
    private rowsColection: SingleInputRow[] = [];

    public onInputUpdate: () => void;

    constructor(){
        this.SetHtmlElements();
        this.SetButttonsEvents();
    }

    public addInitialRows(numberOfRows: number){
        this.addInputRows(numberOfRows);
    }

    private SetButttonsEvents() {
        this.removeCheckedRowsButton.addEventListener('click', () => this.removeCheckedRows());
        this.addSingleRowButton.addEventListener('click', () => this.addInputRows(1));
        this.addMultipleRowsButton.addEventListener('click', () => this.addInputRowsByInputValue());
    }

    private SetHtmlElements() {
        this.removeCheckedRowsButton = document.querySelector('#remove-checked');
        this.addSingleRowButton = document.querySelector('#add-single-row');
        this.addMultipleRowsButton = document.querySelector('#add-multiple-rows');
        this.inputRowsNumber = document.querySelector('#add-multiple-rows-input-value');
        this.inputRowsSectionElement = document.querySelector('#inputs-section');
    }

    private removeCheckedRows(){
        this.rowsColection.forEach(x => {
            if (x.isChecked)
                x.remove();
        })
    }

    private addInputRowsByInputValue(){
        let x = parseInt(this.inputRowsNumber.value);
        if (x > 0)
            this.addInputRows(x);
    }

    private addInputRows(numberOfRows: number){
        for(let i = 0; i< numberOfRows; i++){
            let x = new SingleInputRow(this.inputRowsSectionElement);
            x.onInputUpdate = () => this.inputValueCahnged();
            x.onRemoveElement = (element) => this.inputRowRemoved(element);
            this.rowsColection.push(x);
            this.inputValueCahnged();
        }
    }

    private inputValueCahnged(){
        this.onInputUpdate();
    }

    private inputRowRemoved(element: SingleInputRow){
        this.rowsColection = this.rowsColection.filter(x => x != element);
        this.inputValueCahnged();
    }

    getValues(): number[]{
        let returnArray: number[] = [];
        this.rowsColection.forEach(x => returnArray.push(x.getCurrentValue()));
        return returnArray;
    } 

}