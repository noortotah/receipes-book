import { v4 as uuidv4 } from 'uuid';
import { Ingredient } from './ingredient.model';

export class Recipe {
    public _id: string;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[], id?: string){
        this._id            = (id) ? id : uuidv4();
        this.name           = name;
        this.description    = description;
        this.imagePath      = imagePath;
        this.ingredients    = ingredients;

    }
}
