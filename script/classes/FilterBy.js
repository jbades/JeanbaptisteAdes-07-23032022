export default class FilterBy
{
    constructor(gallery)
    {
        this.filteredItems = [];
        this.gallery = gallery;
        this.item =
        {
            name: 'ingredient',
            heading: 'Ingrédients',
            placeholder: 'Rechercher un ingrédient'
        };
        this.itemList = new Set();
        this.selection = [];
    }

    bringBackItemToList(ingr)
    {
        this.filteredItems.push(ingr);
        this.filteredItems =  this.filteredItems.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        this.displayItems();
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
            html += `<button class="filter__item border-0 bg-transparent" data-id="${item}">${item}</button>`;
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

    contractDropdown ()
    {
        document.querySelector('.filter__welcome').classList.remove('d-none');
        document.querySelector('.filter__clicked').classList.add('d-none');
    }

    displayItems()
    {
        document.querySelector('.filter__item-list').innerHTML = this.buildDropdownList();
        this.listenItemToBeSelected();
    }

    displayTag(e)
    {
        let html =
        `
                <div class="tag__text text-white bg-transparent border-0">${e}</div>
                <i class="tag__icon text-white fa fa-times-circle-o" aria-hidden="true"></i>
        `
        let div = document.createElement('div');
        div.setAttribute('data-id', `${e}`);
        div.classList.add('tag__wrapper', 'd-flex', 'flex-row', 'flex-nowrap', 'align-items-center', 'bg-primary', 'rounded', 'p-3');
        div.innerHTML = html;
        document.querySelector('.filter__tag').appendChild(div);
    }

   escapeFilter()
    {
        const callback = (event) =>
        {
            if (event.key === "Escape")
            {
                this.contractDropdown();
                this.resetList();
            };
        };
        return callback;
    }

    expandDropdown ()
    {
        document.querySelector('.filter__welcome').classList.add('d-none');
        document.querySelector('.filter__clicked').classList.remove('d-none');
    }

    filter(){
        let list = [];
        // list = this.gallery.recipeList.filter((recipe) =>
        // {
        //     recipe.
        // });
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

    listenExitButton()
    {
        document.querySelector('.exit-filter').addEventListener('click', () => 
        {
            this.contractDropdown();
            this.resetList();
        });
    }

    listenEscToExitFilter()
    {
        document.addEventListener('keydown', this.escapeFilter());
    }

    listenForDropdownToExpand()
    {
        document.querySelector('.filter__welcome').addEventListener('click', () => 
        {
            this.expandDropdown();
            document.querySelector(`#search-${this.item.name}`).focus();
            this.listenExitButton()
            this.listenEscToExitFilter();
            this.listenForFilterSearch();
        });
    }

    listenForFilterSearch()
    {
        document.querySelector(`#search-${this.item.name}`).addEventListener('input', (e) => 
        {
            console.log(e);
            this.filterItems(e);
            this.displayItems();
            this.removeEscToExitFilterListener();
        });
    }

    listenItemToBeSelected()
    {
        document.querySelectorAll('.filter__item').forEach(el =>
        {
            el.addEventListener('click', (e) =>
            {
                const needle = e.target.getAttribute('data-id');
                this.removeItemFromList(needle);
                this.displayTag(needle);
                this.listenForUnselect(needle);
                this.selection.push(needle);
                this.filter();
                });
        });
    }

    listenForUnselect(e)
    {
        console.log(e);
        document.querySelector(`div[data-id="${e}"] .tag__icon`).addEventListener('click', () =>
        {
            console.log("coucou");
            this.removeTag(e);
            this.bringBackItemToList(e);
        });
    }

    removeEscToExitFilterListener()
    {
       document.removeEventListener('keydown', this.listenEscToExitFilter());
    }

    resetList()
    {
        document.querySelector(`#search-${this.item.name}`).value = '';
        this.filteredItems = this.itemList;
        this.displayItems();
    }

    removeItemFromList(e)
    {
        this.filteredItems.splice(this.filteredItems.indexOf(e), 1);
        this.displayItems();
    }

    removeTag(ingr)
    {
        let div = document.querySelector(`div[data-id="${ingr}"]`);
        div.parentNode.removeChild(div);
    }

    start()
    {
        this.collect();
        this.buildDropdown();
        this.displayItems();
        this.listenForDropdownToExpand();
    }
}