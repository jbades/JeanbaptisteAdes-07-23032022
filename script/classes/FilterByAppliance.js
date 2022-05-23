export default class FilterByAppliance
{
    constructor(gallery)
    {
        this.gallery = gallery;
        this.all = new Set();
        this.filtered = [];
        this.selection = [];
        // this.filteredRecipe = this.gallery.recipeList;
        this.item =
        {
            name: 'appliance',
            heading: 'Appareil',
            placeholder: 'Rechercher un appareil'
        };
        // this.searchedIngredient = [];
    }

    bringBackItemToList(ingr)
    {
        this.filtered.push(ingr);
        this.filtered =  this.filtered.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    }

    buildDropdownList()
    {
        let html = '';
        this.filtered.forEach(item => 
        {
            html += `<button class="filter__item border-0 bg-transparent" data-id="${item}">${item}</button>`;
        });
        return html;
    }

    displayItems()
    {
        document.querySelector('.filter__item-list').innerHTML = this.buildDropdownList();
        // this.listenForSelect();
    }

    escapeFilter(event)
    {
        if (event.key === "Escape")
        {
            this.showClosedDropdown();
            this.listenForDropdownOpening();
            document.removeEventListener('keydown', this.escapeFilter.bind(this));
        };
    }

    filterItems(e)
    {
        const needle = e.target.value;
        const haystack = [...(this.all)];

        let result = haystack.filter(item => 
            {
                return (item.toLowerCase()).includes(needle.toLowerCase());
            });
        this.filtered = result;
    }

    filterRecipe(recipes)
    {
        return [...(recipes)].filter((recipe) =>
        {
            let countMatch = 0;
            this.matchSelection(recipe).filter((matchObj) => 
            {
                if (matchObj == true)
                {
                    countMatch++;
                };
            });
            
            return (countMatch == this.selection.length)
        });
    }

    listenEscToExitFilter()
    {
        document.addEventListener('keydown', this.escapeFilter.bind(this));
    }

    listenExitButton()
    {
        // document.querySelector('.exit-filter').addEventListener('click', this.escapeFilter());
        
        document.querySelector('.exit-filter').addEventListener('click', () => 
        {
            this.showClosedDropdown();
            this.filtered = this.all;
            this.listenForDropdownOpening();
            this.listenForSelect();
        });
    }

    listenForClickOutsideDropdown()
    {
        // document.querySelector(`.filter__blocker`).addEventListener('click', this.escapeFilter());

        document.querySelector('.filter__blocker').addEventListener('click', () => 
        {
            this.showClosedDropdown();
            this.filtered = this.all;
            this.listenForDropdownOpening();
            this.listenForSelect();
        });
    }

    listenForDropdownOpening()
    {
        document.querySelector('.filter__welcome').addEventListener('click', () => 
        {
            this.openDropdown();
            this.filtered = this.all;
            this.displayItems();
            document.querySelector(`#search-${this.item.name}`).focus();
            this.listenExitButton();
            this.listenEscToExitFilter();
            this.listenForFilterSearch();
            this.listenForClickOutsideDropdown();
            this.listenForSelect();
        });
    }

    listenForFilterSearch()
    {
        document.querySelector(`#search-${this.item.name}`).addEventListener('input', (e) => 
        {
            this.filterItems(e);
            this.displayItems();
            this.listenForSelect();
            // this.removeEscToExitFilterListener();
        });
    }

    // listenForSearchedIngredient()
    // {
    //     document.querySelector('#searchzone').addEventListener('input', (el) =>
    //     {
    //         this.gallery.filtered.forEach((recipe) =>
    //         {
    //             recipe.ingredient.forEach((ingredient) =>
    //             {
    //                 this.searchedIngredient.push(ingredient.ingredient);
    //             });
    //         });
    //     });
    // }
    
    listenForSelect()
    {
        document.querySelectorAll('.filter__item').forEach(el =>
        {
            el.addEventListener('click', (e) =>
            {
                const needle = e.target.getAttribute('data-id');
                this.select(needle);
                this.showSelection();
                this.listenForUnselect();
                this.gallery.filtered = this.filterRecipe(this.gallery.filtered);
                this.gallery.display();
                this.sort();
                this.showClosedDropdown();
                this.listenForDropdownOpening();
            });
        });
    }

    listenForUnselect()
    {
        this.selection.forEach(item =>
            {
                document.querySelector(`div[data-id="${item}"] .tag__icon`).addEventListener('click', () =>
                {
                    this.removeItemFromSelection(item);
                    this.showSelection();
                    this.gallery.filtered = this.filterRecipe(this.gallery.all);
                    this.gallery.display();
                    this.sort();
                    this.showClosedDropdown();
                    this.listenForDropdownOpening();
                    this.listenForUnselect();
                });
            });
    }

    matchSelection(recipe)
    {
        let applMatchList = [];
        console.log(recipe);
        recipe.ingredientList.filter((appliance) =>
        {
            let applMatchTest = this.selection.some((selection) => appliance.ingredient.includes(selection));
            // let ingrMatchTest = ingredient.ingredient.includes((selection) => this.selection == selection );
            applMatchList.push(applMatchTest);
            // console.log(this.selection, ingredient.ingredient, ingrMatchTest, applMatchList);
        });
        return applMatchList;
    }

    openDropdown()
    {
        let html = 
        `
            <div class="filter__blocker"></div>
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

    // removeEscToExitFilterListener()
    // {
    //    document.removeEventListener('keydown', this.listenEscToExitFilter());
    // }

    removeItemFromList(e)
    {
        this.filtered.splice(this.filtered.indexOf(e), 1);
        this.displayItems();
    }

    removeItemFromSelection(e)
    {
        this.selection.splice(this.selection.indexOf(e), 1);
    }

    removeTag(ingr)
    {
        let div = document.querySelector(`div[data-id="${ingr}"]`);
        div.parentNode.removeChild(div);
    }

    select(el)
    {
        if (!this.selection.includes(el))
        {
            this.selection.push(el);
        }
    }

    showClosedDropdown()
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

    showSelection()
    {
        let html = '';
        this.selection.forEach(item =>
            {
                html +=
                `
                    <div class="tag__wrapper d-flex flex-row flex-nowrap align-items-center bg-primary rounded p-3" data-id='${item}'>
                        <div class="tag__text text-white bg-transparent border-0">${item}</div>
                        <i class="tag__icon text-white fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                `
            });
        document.querySelector('.filter__tag').innerHTML = html;
    }

    sort()
    {
        this.all = new Set();

        this.gallery.filtered.forEach(recipe => 
        {
            this.all.add(recipe.appliance.toLowerCase());
        });
    }

   start()
    {
        // this.gallery.listenForSearch();
        this.sort();
        this.showClosedDropdown();
        this.listenForDropdownOpening();
        this.listenEscToExitFilter();
    }
}