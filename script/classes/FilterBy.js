import Ingredient from "./Ingredient.js";
import Recipe from "./Recipe.js";

export default class FilterBy
{
    constructor(gallery)
    {
        this.gallery = gallery;
        this.all = new Set();
        // this.all2 = [...(this.all)].sort();
        this.item =
        {
            name: 'ingredient',
            heading: 'Ingrédients'
        };
    }

    buildDropdown()
    {
        let html = 
        `
            <div class="filter__welcome d-flex flex-row flex-nowrap justify-content-between align-items-center filter__btn bg-primary text-white rounded">
                <span class="h5">${this.item.heading}</span>
                <i class="fa fa-chevron-down" aria-hidden="true"></i> 
            </div>
            <div class="filter__clicked d-flex flex-column flex-nowrap d-none bg-primary text-white rounded p-3">
                <div class="d-flex flex-row flex-nowrap justify-content-between align-items-center">
                    <input
                        id="search-${this.item.name}>"
                        name="search-${this.item.name}"
                        class="forced-placeholder text-light w-75 bg-transparent border-0"
                        placeholder="Rechercher un ingrédient"
                    />
                    <i class="exit-filter fa fa-chevron-up" aria-hidden="true"></i> 
                </div>
                <div class="filter__item-list d-flex flex-column flex-wrap">${this.buildDropdownList()}</div>
            </div>
        `;
        document.querySelector('.filter__bar').innerHTML = html;
    }

    buildDropdownList()
    {
        let html = '';
        this.all.forEach(item => 
        {
            html += `<div class="filter__item">${item}</div>`;
            this.listenItem(item);
        });
        return html;
    }

    collect()
    {
        console.log(this.gallery);
        this.gallery.gallery.forEach(recipe => 
        {
            recipe.ingredients.forEach(ingObject => 
                {
                    this.all.add(ingObject.ingredient);
                });
        });
    }

    listenFilter()
    {
        document.querySelector('.filter__welcome').addEventListener('click', () => 
        {
            document.querySelector('.filter__welcome').classList.add('d-none');
            document.querySelector('.filter__clicked').classList.remove('d-none');
            this.listenExitFilter();
        });
    }

    listenExitFilter()
    {
        document.querySelector('.exit-filter').addEventListener('click', () => 
        {
            document.querySelector('.filter__welcome').classList.remove('d-none');
            document.querySelector('.filter__clicked').classList.add('d-none');
       });
    }

    listenEsc()
    {
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
              this.listenExitFilter();
            };
          });
    }

    listenItem(item)
    {
        // document.querySelector('.filter__item').addEventListener('click',() => 
        // {
        //     let toto = this.all.ingredientfind();
        // });
    }

    start()
    {
        this.collect();
        this.buildDropdown();
        this.buildDropdownList();
        this.listenFilter();
    }
}