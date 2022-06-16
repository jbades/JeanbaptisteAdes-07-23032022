import FilterBy from "./FilterBy.js";

export default class FilterByIngredient extends FilterBy
{
    constructor(gallery)
    {
        super(gallery, {
            name: 'ingredient',
            heading: 'Ingrédient',
            placeholder: 'Rechercher un ingrédient',
            bgcolor: 'bg-primary'
            });
   }

    collect()
    {
        this.all = new Set();
        this.gallery.filtered.forEach(recipe => 
            {
                recipe.ingredientList.forEach(ingredient => 
                    {
                        this.all.add(ingredient.ingredient.toLowerCase());
                    });
            });
        this.all = [...(this.all)].sort((a, b) => a.localeCompare(b));
    }

    filterRecipe(recipes)
    {
        return [...(recipes)].filter((recipe) =>
        {
            let count = 0;
            recipe.ingredientList.forEach((objIngr) =>
            {
                if(this.selection.includes(objIngr.ingredient))
                {
                    count++;
                }
            });

            if (count == this.selection.length)
            {
                return true;
            }

            return false;
        });
    }

    select(el)
    {
        console.log(this.selection);
        if (!this.selection.includes(el))
        {
            this.selection.push(el.toLowerCase());
        }
        console.log(this.selection);
    }

    createTag()
    {
        document.querySelector(`.tag__filter-wrapper[data-filter="${this.item.name}"]`).innerHTML = '';
        let html = '';
        this.selection.forEach(item =>
            {
                html +=
                `
                    <div class="tag__button ${this.item.bgcolor} d-flex flex-row flex-nowrap align-items-center rounded p-3" data-item-id='${item}'>
                        <div class="tag__text text-white bg-transparent border-0">${item}</div>
                        <i class="tag__icon text-white fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                `
            });
        document.querySelector(`.tag__filter-wrapper[data-filter="${this.item.name}"]`).innerHTML += html;
    }

}