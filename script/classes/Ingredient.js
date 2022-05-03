import Recipe from "./Recipe.js";

export default class Ingredient
{
    constructor(ingredient)
    {
        this.ingredient = ingredient.ingredient;
        this.quantity = ingredient.quantity;
        this.unit = ingredient.unit;
    }

    display()
    {
        let html = '';
        if (!!this.quantity && !!this.unit)
        {
            html = this.ingredient + `: ` + this.quantity + ` ` + this.unit;
        } 
        else if (!this.quantity && !!this.unit)
        {
            html = this.ingredient + `: ` + this.unit;
        }
        else if (!!this.quantity && !this.unit)
        {
            html = this.ingredient + `: ` + this.quantity;
        }
        else if (!this.quantity && !this.unit)
        {
            html = this.ingredient;
        }
        return html;
    }

    filter()
    {
        list = [];
        
    }

    searchIngredient(e)
    {
        const needle = e.target.value;
        const haystack = this.ingredient.toLowerCase();

        return haystack.includes(needle.toLowerCase());
    }
}