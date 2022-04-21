import Ingredient from "./Ingredient.js";

export default class FilterBy
{
    constructor(gallery)
    {
        this.gallery = gallery;
        this.itemList = new Set();
        this.filteredItems = [];
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
            <button class="filter__welcome d-flex flex-row flex-nowrap justify-content-between align-items-center filter__btn bg-primary text-white rounded">
                <span class="h5">${this.item.heading}</span>
                <i class="fa fa-chevron-down" aria-hidden="true"></i> 
            </button>
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
        this.filteredItems.forEach(item => 
        {
            html += `<button class="filter__item">${item}</button>`;
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
        this.itemList = [...(this.itemList)].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        this.filteredItems = this.itemList;
    }

    displayItems()
    {
        document.querySelector('.filter__item-list').innerHTML = this.buildDropdownList();
    }

    filterItems(e)
    {
        const needle = e.target.value;
        const haystack = [...(this.itemList)];

        let result = haystack.filter(ingredient => 
            {
                return (ingredient.toLowerCase()).includes(needle.toLowerCase());
            });
        this.filteredItems = new Set(result);
    }

    async hideClickedFilter ()
    {
        await this.resetList();
        document.querySelector('.filter__welcome').classList.remove('d-none');
        document.querySelector('.filter__clicked').classList.add('d-none');
    }

    listenForDropdownToOpen()
    {
        document.querySelector('.filter__welcome').addEventListener('click', () => 
        {
            this.showClickedFilter();
            document.querySelector(`#search-${this.item.name}`).focus();
            this.listenForFilter();
            this.listenExitFilter();
            this.listenEsc();
        });
    }

    listenForFilter()
    {
        document.querySelector(`#search-${this.item.name}`).addEventListener('input', (e) => 
        {
            this.filterItems(e);
            this.displayItems();
        });
    }

    listenForSearchbar()
    {
        document.querySelector(`#searchzone`).addEventListener('input', (e) => 
        {
            this.filterItems(e);
            this.displayItems();
        });
    }

    listenEsc()
    {
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                this.resetList();
                // this.hideClickedFilter();
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
        document.querySelectorAll('.filter__item').forEach(el =>
        {
            el.addEventListener('click', (e) =>
            {
                console.log(e);
            });
        });
    }

    resetList()
    {
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                document.querySelector(`#search-${this.item.name}`).value = '';
                this.filteredItems = this.itemList;
                this.displayItems();
                };
        });
    }

    showClickedFilter ()
    {
        document.querySelector('.filter__welcome').classList.add('d-none');
        document.querySelector('.filter__clicked').classList.remove('d-none');
    }

    start()
    {
        this.collect();
        this.buildDropdown();
        this.displayItems();
        this.listenForDropdownToOpen();
        this.listenForSearchbar();
        this.listenItem();
    }
}