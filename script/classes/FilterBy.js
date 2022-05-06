export default class FilterBy
{
    constructor(gallery)
    {
        this.gallery = gallery;
        this.filteredItems = [];
        this.filteredRecipe = this.gallery.recipeList;
        this.item =
        {
            name: 'ingredient',
            heading: 'Ingrédients',
            placeholder: 'Rechercher un ingrédient'
        };
        this.itemList = new Set();
        this.matchingRecipe = [];
    }

    bringBackItemToList(ingr)
    {
        this.filteredItems.push(ingr);
        this.filteredItems =  this.filteredItems.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    }

    closeDropdown()
    {
        let html = 
        `
            <button class="filter__welcome d-flex flex-row flex-nowrap justify-content-between align-items-center filter__btn bg-primary text-white rounded">
                <span class="h5">${this.item.heading}</span>
                <i class="fa fa-chevron-down" aria-hidden="true"></i> 
            </button>
        `;
        document.querySelector('.filter__bar').innerHTML = html;
    }

    openDropdown()
    {
        let html = 
        `
            <div class="filter__clicked d-flex flex-column flex-nowrap bg-primary text-white rounded p-3">
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

    displayItems()
    {
        document.querySelector('.filter__item-list').innerHTML = this.buildDropdownList();
        this.listenForSelect();
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
                this.closeDropdown();
                this.listenForDropdownOpening();
                console.log(this.gallery);
                this.gallery.filtered = this.filteredRecipe;
                this.gallery.display();
            };
        };
        return callback;
    }

    filterRecipe()
    {
        this.filteredRecipe = [];
        this.gallery.recipeList.filter((recipe) =>
        {
            let countMatch = 0;
            this.matchSelection(recipe).filter((matchObj) => 
            {
                if (matchObj == true)
                {
                    countMatch++;
                };
            });
            
            if (countMatch == this.matchingRecipe.length)
            {
                this.filteredRecipe.push(recipe);
                // console.log(this.matchingRecipe, this.matchSelection(recipe), recipe.name);
            }
        });
    }

    filterItems(e)
    {
        const needle = e.target.value;
        const haystack = [...(this.itemList)];

        let result = haystack.filter(ingredient => 
            {
                return (ingredient.toLowerCase()).includes(needle.toLowerCase());
            });
        this.filteredItems = result;
    }

    listenExitButton()
    {
        document.querySelector('.exit-filter').addEventListener('click', () => 
        {
            this.closeDropdown();
            this.filteredItems = this.itemList;
            this.listenForDropdownOpening();
            this.listenForSelect();
        });
    }

    listenEscToExitFilter()
    {
        document.addEventListener('keydown', (event) =>
        {
            if (event.key === "Escape")
            {
                this.closeDropdown();
                this.listenForDropdownOpening();
                this.gallery.filtered = this.filteredRecipe;
                this.gallery.display();
            };
        });
    }

    listenForClickOutsideDropdown()
    {
        document.querySelector(`body *:not(.filter__clicked)`).addEventListener('click', () =>
        {
            console.log("coucou");
        });
    }

    listenForDropdownOpening()
    {
        document.querySelector('.filter__welcome').addEventListener('click', () => 
        {
            this.openDropdown();
            this.filteredItems = this.itemList;
            this.displayItems();
            document.querySelector(`#search-${this.item.name}`).focus();
            this.listenExitButton();
            this.listenEscToExitFilter();
            this.listenForFilterSearch();
            this.listenForClickOutsideDropdown();
        });
    }

    listenForFilterSearch()
    {
        document.querySelector(`#search-${this.item.name}`).addEventListener('input', (e) => 
        {
            this.filterItems(e);
            this.displayItems();
            // this.removeEscToExitFilterListener();
        });
    }

    listenForSelect()
    {
        document.querySelectorAll('.filter__item').forEach(el =>
        {
            el.addEventListener('click', (e) =>
            {
                const needle = e.target.getAttribute('data-id');
                this.removeItemFromList(needle);
                this.displayTag(needle);
                this.listenForUnselect(needle);
                this.matchingRecipe.push(needle);
                this.filterRecipe();
                this.gallery.filtered = [];
                this.gallery.filtered = this.filteredRecipe;
                this.gallery.display();
                });
        });
    }

    listenForUnselect(el)
    {
        document.querySelector(`div[data-id="${el}"] .tag__icon`).addEventListener('click', () =>
        {
            this.removeTag(el);
            this.bringBackItemToList(el);
            this.removeIngredientFromMatchList(el);
            this.filterRecipe();
            this.gallery.filtered = this.filteredRecipe;
            this.gallery.display();
        });
    }

    matchSelection(recipe)
    {
        let ingrMatchList = [];
        recipe.ingredientList.filter((ingredient) =>
        {
            let ingrMatchTest = this.matchingRecipe.some((selection) => ingredient.ingredient.includes(selection));
            // let ingrMatchTest = ingredient.ingredient.includes((selection) => this.matchingRecipe == selection );
            ingrMatchList.push(ingrMatchTest);
            // console.log(this.matchingRecipe, ingredient.ingredient, ingrMatchTest, ingrMatchList);
        });
        return ingrMatchList;
    }

    removeEscToExitFilterListener()
    {
       document.removeEventListener('keydown', this.listenEscToExitFilter());
    }

    removeItemFromList(e)
    {
        this.filteredItems.splice(this.filteredItems.indexOf(e), 1);
        this.displayItems();
    }

    removeIngredientFromMatchList(e)
    {
        this.matchingRecipe.splice(this.matchingRecipe.indexOf(e), 1);
    }

    removeTag(ingr)
    {
        let div = document.querySelector(`div[data-id="${ingr}"]`);
        div.parentNode.removeChild(div);
    }

    start()
    {
        this.collect();
        this.closeDropdown();
        this.listenForDropdownOpening();
    }
}