import { Guid } from "guid-typescript";

class NoteData{

    Id: string = Guid.create().toString();
    Title: string = '';
    Note: string = '';
    CreateDate: number = Date.now();
    IsPinned: boolean = false;
    Color: number = 1;

    static getColorClassName(color: number): string{
        switch (color) {
            case 1:
                return 'has-background-link';
            case 2:
                return 'has-background-primary';
            case 3:
                return 'has-background-success';
            case 4:
                return 'has-background-warning';
            case 5:
                return 'has-background-danger';
            default:
                return 'has-background-link';
        }
    }
}

export {NoteData}