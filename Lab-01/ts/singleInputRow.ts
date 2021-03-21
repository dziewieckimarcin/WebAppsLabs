class SingleInputRow{

    private currentElement: HTMLElement;
    private inputElement: HTMLInputElement;
    private checkBoxElement: HTMLInputElement;

    public isChecked: Boolean = false;
    public onInputUpdate: () => void;
    public onRemoveElement: (element: SingleInputRow) => void;

    constructor(parentElement: HTMLElement){
        this.create(parentElement);
    }

    private create(parentElement: HTMLElement){
        this.currentElement = document.createElement('div');

        this.createRemoveCheckbox();
        this.createInput();       
        this.createRemoveButton();        

        parentElement.appendChild(this.currentElement);
    }

    private createRemoveCheckbox() {
        this.checkBoxElement = document.createElement('input');
        this.checkBoxElement.type = 'checkbox';
        this.checkBoxElement.addEventListener('input', () => this.removeCheckBoxValueChanged())
        this.currentElement.appendChild(this.checkBoxElement);
    }

    private removeCheckBoxValueChanged(){
        this.isChecked = this.checkBoxElement.checked;
    }

    private createInput(){
        this.inputElement = document.createElement('input');
        this.currentElement.appendChild(this.inputElement);
        this.inputElement.addEventListener('input', () => this.inputValueCahnged());
    }

    private inputValueCahnged(){
        this.onInputUpdate();
    }

    private createRemoveButton(){
        let removeButton = document.createElement('button');
        removeButton.innerHTML = 'Usuń';
        removeButton.addEventListener('click', () => this.remove());
        this.currentElement.appendChild(removeButton);
    }

    public remove(){
        this.onRemoveElement(this);
        this.currentElement.parentElement.removeChild(this.currentElement);
    }

    getCurrentValue() :(number){
        return parseFloat(this.inputElement.value);
    }
}