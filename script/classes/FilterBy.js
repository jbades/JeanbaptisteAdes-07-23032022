export default class FilterBy
{
    constructor(gallery, settings)
    {
        this.gallery = gallery;
        this.all = new Set();
        this.filtered = [];
        this.selection = [];
        this.item =
        {
            name: settings.name,
            heading: settings.heading,
            placeholder: settings.placeholder,
            bgcolor: settings.bgcolor
        };
    }

    buildDropdownList()
    {
        let html = '';
        this.filtered.forEach(item => 
        {
            html += `<button class="filter__item border-0 bg-transparent" data-item-id="${item}">${item}</button>`;
        });
        return html;
    }

    displayItems()
    {
        document.querySelector(`[data-filter=${this.item.name}] .filter__item-list`).innerHTML = this.buildDropdownList();
    }

    escapeFilter(event)
    {
        if (event.key === "Escape")
        {
            this.closeDropdown();
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

    listenEscToExitFilter()
    {
        document.addEventListener('keydown', this.escapeFilter.bind(this));
    }

    listenExitButton()
    {
        document.querySelector(`[data-filter=${this.item.name}] .filter__exit`).addEventListener('click', () => 
        {
            this.closeDropdown();
            this.filtered = this.all;
            this.listenForDropdownOpening();
            this.listenForSelect();
        });
    }

    listenForClickOutsideDropdown()
    {
        document.querySelector(`:not([data-filter=${this.item.name}])`).addEventListener('click', () => 
        {
            console.log("coucou");
            this.closeDropdown();
            this.filtered = this.all;
            this.listenForDropdownOpening();
            this.listenForSelect();
        });
    }

    listenForDropdownOpening()
    {
        document.querySelector(`[data-filter=${this.item.name}] .filter__welcome`).addEventListener('click', () => 
        {
            this.openDropdown();
            this.filtered = this.all;
            this.displayItems();
            document.querySelector(`#search-${this.item.name}`).focus();
            this.listenExitButton();
            this.listenEscToExitFilter();
            // this.listenForClickOutsideDropdown();
            this.listenForSelect();
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
            this.listenForSelect();
        });
    }

    listenForSelect()
    {
       document.querySelectorAll(`[data-filter=${this.item.name}] .filter__item`).forEach(el =>
        {
            el.addEventListener('click', (e) =>
            {
                const needle = e.target.getAttribute('data-item-id');
                this.select(needle);
                this.showSelection();
                this.listenForUnselect();
                this.gallery.filter();
                this.collect();
                this.listenForDropdownOpening();
            });
        });
    }

    listenForUnselect()
    {
        this.selection.forEach(item =>
            {
                document.querySelector(`div[data-item-id="${item}"] .tag__icon`).addEventListener('click', () =>
                {
                    this.removeItemFromSelection(item);
                    this.showSelection();
                    this.gallery.filtered = this.filterRecipe(this.gallery.all);
                    this.gallery.display();
                    this.collect();
                    this.listenForDropdownOpening();
                    this.listenForUnselect();
                });
            });
    }

    openDropdown()
    {
        document.querySelector(`[data-filter=${this.item.name}] .filter__welcome`).style.display = 'none';
        document.querySelector(`[data-filter=${this.item.name}] .filter__clicked`).style.display = 'flex';
    }

    closeDropdown()
    {
        document.querySelector(`[data-filter=${this.item.name}] .filter__welcome`).style.display = 'flex';
        document.querySelector(`[data-filter=${this.item.name}] .filter__clicked`).style.display = 'none';
    }

    removeItemFromList(e)
    {
        this.filtered.splice(this.filtered.indexOf(e), 1);
        this.displayItems();
    }

    removeItemFromSelection(e)
    {
        this.selection.splice(this.selection.indexOf(e), 1);
    }

    select(el)
    {
        if (!this.selection.includes(el))
        {
            this.selection.push(el.toLowerCase());
        }
    }

    async showButton()
    {
        let html = 
        `
            <div class="filter__wrapper" data-filter=${this.item.name}>
                <button class="filter__welcome ${this.item.bgcolor} flex-row flex-nowrap justify-content-between align-items-center filter__btn text-white rounded">
                    <span class="h5">${this.item.heading}</span>
                    <i class="fa fa-chevron-down" aria-hidden="true"></i> 
                </button>
                <div class="filter__clicked ${this.item.bgcolor} flex-column flex-nowrap text-white rounded p-3">
                    <div class="d-flex flex-row flex-nowrap justify-content-between align-items-center">
                        <input
                        id="search-${this.item.name}"
                        name="search-${this.item.name}"
                        class="forced-placeholder text-light w-75 bg-transparent border-0"
                        placeholder="${this.item.placeholder}"
                        >
                        <i class="filter__exit fa fa-chevron-up" aria-hidden="true"></i> 
                    </div>
                    <div class="filter__item-list d-flex flex-column flex-wrap"></div>
                </div>
            </div>
        `;
        document.querySelector('.filter__bar').innerHTML += html;
    }

    showSelection()
    {
        let html = '';
        this.selection.forEach(item =>
            {
                html +=
                `
                    <div class="tag__wrapper ${this.item.bgcolor} d-flex flex-row flex-nowrap align-items-center rounded p-3" data-item-id='${item}'>
                        <div class="tag__text text-white bg-transparent border-0">${item}</div>
                        <i class="tag__icon text-white fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                `
            });
        document.querySelector('.filter__tag').innerHTML = html;
    }

    async start()
    {
        this.collect();
        await this.showButton();
        this.listenForDropdownOpening();
        // window.setTimeout(() =>
        // {
        //     this.listenForDropdownOpening();
        // }, 500);
        // this.listenEscToExitFilter();
    }
}