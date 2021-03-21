/// <reference path='inputRows.ts'/>
/// <reference path='stats.ts'/>

class Main{

    private stats: Stats;
    private inputRows: InputRows;

    constructor(){
        this.stats = new Stats();
        this.inputRows = new InputRows();
        this.inputRows.onInputUpdate = () => this.updateStats();
        this.inputRows.addInitialRows(3);
    }

    private updateStats(){
        this.stats.updateStats(this.inputRows.getValues())
    }
}

const main = new Main();

