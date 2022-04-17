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
            html = this.ingredient + `: ` + this.quantity + ` ` + this.unit + `<br/>`;
        } 
        else if (!this.quantity && !!this.unit)
        {
            html = this.ingredient + `: ` + this.unit + `<br/>`;
        }
        else if (!!this.quantity && !this.unit)
        {
            html = this.ingredient + `: ` + this.quantity + `<br/>`;
        }
        else if (!this.quantity && !this.unit)
        {
            html = this.ingredient + `<br/>`;
        }
        return html;
    }
}