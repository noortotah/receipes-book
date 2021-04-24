import { v4 as uuidv4 } from 'uuid';

export class Ingredient {
  public _id: string;
    constructor(public name: string, public amount: number, id?: string){
      this._id = (id) ? id : uuidv4();
    }
}
