export default class Ingredient
{
    constructor(ingredient)
    {
        this.ingredient = ingredient.ingredient;
        this.quantity = ingredient.quantity;
        this.unit = ingredient.unit;
    }

    createTag()
    {
        let html =
        `
            <div class="tag__wrapper d-flex flex-row flex-nowrap align-items-center bg-primary text-white rounded p-3">
                <button class="tag__text">${this.ingredient}</button>
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
            <di>
        `
        document.querySelector('.filter__tag').appendChild(html); 
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

    searchIngredient(e)
    {
        const needle = e.target.value;
        const haystack = this.ingredient.toLowerCase();

        return haystack.includes(needle.toLowerCase());
    }
}