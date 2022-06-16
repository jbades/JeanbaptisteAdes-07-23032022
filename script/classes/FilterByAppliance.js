import FilterBy from "./FilterBy.js";

export default class FilterByAppliance extends FilterBy
{
    constructor(gallery)
    {
        super(gallery, {
            name: 'appliance',
            heading: 'Appareil',
            placeholder: 'Rechercher un appareil',
            bgcolor: 'bg-danger'
        });
    }

    collect()
    {
        this.all = new Set();
        this.gallery.filtered.forEach(recipe => 
        {
            this.all.add(recipe.appliance.toLowerCase());
        });
        this.all = [...(this.all)].sort((a, b) => a.localeCompare(b));
    }

    filterRecipe(recipes)
    {
        return [...recipes].filter(recipe =>
        {
            if (this.selection.length === 0)
            {
                return true;
            }

            return this.selection.includes(recipe.appliance.toLowerCase());
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