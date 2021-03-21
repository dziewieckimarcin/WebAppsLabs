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
        this.currentElement.className = 'box py-2 my-2';
        let fieldElement = document.createElement('div');
        fieldElement.className = 'field is-grouped';

        this.createRemoveCheckbox(fieldElement);
        this.createInput(fieldElement);       
        this.createRemoveButton(fieldElement);        

        this.currentElement.appendChild(fieldElement);
        parentElement.appendChild(this.currentElement);
    }

    private createRemoveCheckbox(parent: HTMLElement) {
        let checkboxControlElement = document.createElement('div');
        checkboxControlElement.className = 'control py-1';

        let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        let labelElement = document.createElement('label');
        labelElement.htmlFor = id;

        this.checkBoxElement = document.createElement('input');
        this.checkBoxElement.type = 'checkbox';
        this.checkBoxElement.className = 'is-checkradio is-large is-info';
        this.checkBoxElement.id = id;

        this.checkBoxElement.addEventListener('input', () => this.removeCheckBoxValueChanged())

        checkboxControlElement.appendChild(this.checkBoxElement);
        checkboxControlElement.appendChild(labelElement);
        parent.appendChild(checkboxControlElement);
    }

    private removeCheckBoxValueChanged(){
        this.isChecked = this.checkBoxElement.checked;
    }

    private createInput(parent: HTMLElement){
        let inputControlElement = document.createElement('div');
        inputControlElement.className = 'control is-expanded';

        this.inputElement = document.createElement('input');
        this.inputElement.className = 'input is-info';
        this.currentElement.appendChild(this.inputElement);
        this.inputElement.addEventListener('input', () => this.inputValueCahnged());

        inputControlElement.appendChild(this.inputElement);
        parent.appendChild(inputControlElement);
    }

    private inputValueCahnged(){
        this.onInputUpdate();
    }

    private createRemoveButton(parent: HTMLElement){
        let buttonControlElement = document.createElement('div');
        buttonControlElement.className = 'control';

        let removeButton = document.createElement('button');
        removeButton.innerHTML = 'Usuń';
        removeButton.className = 'button is-danger';
        removeButton.addEventListener('click', () => this.remove());

        buttonControlElement.appendChild(removeButton);
        parent.appendChild(buttonControlElement);
    }

    public remove(){
        this.onRemoveElement(this);
        this.currentElement.parentElement.removeChild(this.currentElement);
    }

    getCurrentValue() :(number){
        return parseFloat(this.inputElement.value);
    }
}