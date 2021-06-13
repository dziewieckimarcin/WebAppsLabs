import { NoteData } from "./noteData";

class Note{


    private data: NoteData;

    private mainElement : HTMLElement;
    private titleElement : HTMLElement;
    private contentElement: HTMLTextAreaElement;
    private editButtonElement : HTMLButtonElement;
    private cardHeaderElement : HTMLElement;
    private cardFooterElement : HTMLElement;

    private deleteCallback: (id: string) => void;
    private editCallback: (note: NoteData) => void;

    constructor(note: NoteData, parentElement: HTMLElement, deleteCallback: (id: string) => void, editCallback: (note: NoteData) => void){
        this.deleteCallback = deleteCallback;
        this.editCallback = editCallback;
        this.data = note;
        this.createHtmlElements(parentElement);
        this.updateValuesOnHtmlElements();
    }

    private updateValuesOnHtmlElements(){
        this.titleElement.innerText = this.data.Title;
        this.contentElement.value = this.data.Note;
        this.cardHeaderElement.classList.add(NoteData.getColorClassName(this.data.Color));
        this.cardFooterElement.classList.add(NoteData.getColorClassName(this.data.Color));

    }

    createHtmlElements(parentElement: HTMLElement){
        this.mainElement = document.createElement("div");
        this.mainElement.className = "column is-half-tablet is-two-fifths-desktop is-one-third-widescreen";

        let cardElement = document.createElement("div");
        cardElement.className = "card";
        this.mainElement.appendChild(cardElement);

        this.createCardHeader(cardElement);
        this.createCardContent(cardElement);
        this.createForecastCardFooter(cardElement);

        parentElement.appendChild(this.mainElement);
    }

    private createForecastCardFooter(cardElement: HTMLDivElement) {
        this.cardFooterElement = document.createElement("div");
        this.cardFooterElement.className = "card-footer";
        cardElement.appendChild(this.cardFooterElement);

        this.createForecastFooterItem(this.cardFooterElement);
    }

    private createForecastFooterItem(cardElement: HTMLElement) {
        let forecastCardFooterItem = document.createElement("div");
        forecastCardFooterItem.className = "card-footer-item is-half";
        cardElement.appendChild(forecastCardFooterItem);

        let cardFooterItemContainer = document.createElement("div");
        cardFooterItemContainer.className = "container";
        forecastCardFooterItem.appendChild(cardFooterItemContainer);

        let cardFooterItemContent = document.createElement("div");
        cardFooterItemContent.className = "content has-text-centered";
        cardFooterItemContainer.appendChild(cardFooterItemContent);

        this.editButtonElement = document.createElement("button");
        this.editButtonElement.className = "button is-info";
        this.editButtonElement.innerText = "Edytuj";
        this.editButtonElement.addEventListener("click", () => this.edit())
        cardFooterItemContent.appendChild(this.editButtonElement);
    }

    private createCardContent(cardElement: HTMLDivElement) {
        let cardContent = document.createElement("div");
        cardContent.className = "card-content pt-2";
        cardElement.appendChild(cardContent);

        let container = document.createElement("div");
        container.className = "container pt-4";
        cardContent.appendChild(container);

        this.contentElement  = document.createElement("textarea");
        this.contentElement.className = "textarea is-info has-fixed-size";
        this.contentElement.readOnly = true;
        container.appendChild(this.contentElement);

        
    }

    private createCardHeader(cardElement: HTMLElement) {
        this.cardHeaderElement = document.createElement("div");
        this.cardHeaderElement.className = "card-header";
        cardElement.appendChild(this.cardHeaderElement);

        let cardHeaderTitle = document.createElement("div");
        cardHeaderTitle.className = "card-header-title";
        this.cardHeaderElement.appendChild(cardHeaderTitle);

        this.titleElement = document.createElement("div");
        this.titleElement.className = "container has-text-centered";
        cardHeaderTitle.appendChild(this.titleElement);

        let cardHeaderClose = document.createElement("div");
        cardHeaderClose.className = "p-3";
        this.cardHeaderElement.appendChild(cardHeaderClose);

        let deleteButtonElement = document.createElement("button");
        deleteButtonElement.className = "has-background-info delete is-medium";
        deleteButtonElement.addEventListener("click", () => this.delete());
        cardHeaderClose.appendChild(deleteButtonElement);
    }

    private delete(){
        this.deleteCallback(this.data.Id);
        this.mainElement.parentElement.removeChild(this.mainElement);
    }

    private edit(){
        this.editCallback(this.data);
    }
}

export {Note}