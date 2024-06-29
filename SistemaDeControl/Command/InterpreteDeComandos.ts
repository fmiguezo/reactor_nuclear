import Command from "./Command";

export default class InterpreteDeComandos{

    private _comando: Command;
  
    public set comando(value: Command) {
        this._comando = value;
    }

    public ejecutarComando( c : Command) : void{
        this.ejecutarComando(c);
    }


}