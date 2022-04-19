import Ingredient from "./Ingredient.js";
import Recipe from "./Recipe.js";

export default class FilterBy
{
    constructor(gallery)
    {
        this.gallery = gallery;
        this.itemList = new Set();
        this.item =
        {
            name: 'ingredient',
            heading: 'Ingrédients',
            placeholder: 'Rechercher un ingrédient'
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
                        id="search-${this.item.name}"
                        name="search-${this.item.name}"
                        class="forced-placeholder text-light w-75 bg-transparent border-0"
                        placeholder="${this.item.placeholder}"
                    />
                    <i class="exit-filter fa fa-chevron-up" aria-hidden="true"></i> 
                </div>
                <div class="filter__item-list d-flex flex-column flex-wrap"></div>
            </div>
        `;
        document.querySelector('.filter__bar').innerHTML = html;
    }

    buildDropdownList()
    {
        let html = '';
        this.itemList.forEach(item => 
        {
            html += `<div class="filter__item">${item}</div>`;
            // this.listenItem();
        });
        return html;
    }

    collect()
    {
        this.gallery.recipeList.forEach(recipe => 
        {
            recipe.ingredientList.forEach(ingredient => 
                {
                    this.itemList.add(ingredient.ingredient);
                });
        });
        this.itemList = [...(this.itemList)].sort();
    }

    displayItems()
    {
        document.querySelector('.filter__item-list').innerHTML = this.buildDropdownList();
    }

    listenForDropdownOpen()
    {
        document.querySelector('.filter__welcome').addEventListener('click', () => 
        {
            this.showClickedFilter();
            document.querySelector(`#search-${this.item.name}`).focus();
            this.listenExitFilter();
            this.listenEsc();
            this.listenForInput();
            this.buildDropdownList();
        });
    }

    listenForInput()
    {
        document.querySelector(`#search-${this.item.name}`).addEventListener('input', (e) => 
        {
            const needle = e.target.value;
            const haystack = [...(this.itemList)];

            let result = haystack.filter(ingredient => 
                {
                    return (ingredient.toLowerCase()).includes(needle.toLowerCase());
                });
            this.itemList = new Set(result);
            console.log(this.itemList);
        });
    }

    listenEsc()
    {
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
              this.hideClickedFilter();
            };
          });
    }

    listenExitFilter()
    {
        document.querySelector('.exit-filter').addEventListener('click', () => 
        {
            this.hideClickedFilter();
        });
    }

    listenItem()
    {
        document.querySelector('.filter__item').addEventListener('click', (item) => 
        {
            this.itemList.filter(ingredient => ingredient == item.target.value);
            this.buildDropdownList();
        });
    }

    showClickedFilter ()
    {
        document.querySelector('.filter__welcome').classList.add('d-none');
        document.querySelector('.filter__clicked').classList.remove('d-none');
    }

    hideClickedFilter ()
    {
        document.querySelector('.filter__welcome').classList.remove('d-none');
        document.querySelector('.filter__clicked').classList.add('d-none');
    }

    start()
    {
        this.collect();
        this.buildDropdown();
        this.displayItems();
        this.listenForDropdownOpen();
    }
}