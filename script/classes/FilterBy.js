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
        this.closeHandler = (e) => 
        {
            this.closeDropdown(e);
        }
    }

    buildDropdownList()
    {
        let html = '';
        this.filtered.forEach(item => 
        {
            html += `
                <li>
                    <button class="filter__item border-0 bg-transparent" data-item-id="${item}">${item}</button>
                </li>
            `;
        });
        return html;
    }

    closeDropdown(event)
    {
        if((event.type == 'keydown' && event.key === "Escape") || event.type != 'keydown')
        {
            this.hideDropdown();
            this.listenForDropdownOpening();
            this.filtered = this.all;
            this.listenForSelect();
            document.querySelector(`:not([data-filter=${this.item.name}])`).removeEventListener('click', this.closeHandler);
            document.removeEventListener('keydown', this.closeHandler);
            document.querySelector(`[data-filter=${this.item.name}] .filter__exit`).removeEventListener('click', this.closeHandler);
        }
    }

    createTag()
    {
        document.querySelector(`.tag__filter-wrapper[data-filter="${this.item.name}"]`).innerHTML = '';
        let html = '';
        this.selection.forEach(item =>
            {
                html +=
                `
                    <div class="tag__button ${this.item.bgcolor} d-flex flex-row flex-nowrap align-items-center rounded" data-item-id='${item}'>
                        <div class="tag__text text-white bg-transparent border-0">${item}</div>
                        <i class="tag__icon text-white fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                `
            });
        document.querySelector(`.tag__filter-wrapper[data-filter="${this.item.name}"]`).innerHTML += html;
    }

    displayItems()
    {
        document.querySelector(`[data-filter=${this.item.name}] .filter__item-list`).innerHTML = this.buildDropdownList();
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
        document.addEventListener('keydown', this.closeHandler);
    }

    listenExitButton()
    {
        document.querySelector(`[data-filter=${this.item.name}] .filter__exit`).addEventListener('click', this.closeHandler);
    }

    listenForClickOutsideDropdown()
    {
        document.querySelector(`:not([data-filter=${this.item.name}])`).addEventListener('click', this.closeHandler);
    }

    listenForDropdownOpening()
    {
        document.querySelector(`[data-filter=${this.item.name}] .filter__welcome`).addEventListener('click', (e) => 
        {
            e.stopPropagation();
            this.showDropdown();
            this.listenForFilterSearch();
            document.querySelector(`#search-${this.item.name}`).focus();
            this.listenExitButton();
            this.listenEscToExitFilter();
            this.listenForClickOutsideDropdown();
            this.filtered = this.all;
            this.displayItems();
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
        });
    }

    listenForSelect()
    {
       document.querySelectorAll(`[data-filter=${this.item.name}] .filter__item`).forEach(el =>
        {
            el.addEventListener('click', (e) =>
            {
                const needle = e.target.getAttribute('data-item-id');
                console.log(this.selection);
                this.select(needle);
                console.log(this.selection);
                this.createTag();
                this.listenForUnselect();
                this.gallery.filter();
            });
        });
    }

    listenForUnselect()
    {
        this.selection.forEach(item =>
            {
                document.querySelector(`.tag__button[data-item-id="${item}"] .tag__icon`).addEventListener('click', () =>
                {
                    console.log(this.selection);
                    this.removeItemFromSelection(item);
                    console.log(this.selection);
                    this.createTag();
                    this.listenForUnselect();
                    this.gallery.filter();
               });
            });
    }

    select(el)
    {
        if (!this.selection.includes(el))
        {
            this.selection.push(el.toLowerCase());
        }
    }

    showDropdown()
    {
        document.querySelector(`[data-filter=${this.item.name}] .filter__welcome`).style.display = 'none';
        document.querySelector(`[data-filter=${this.item.name}] .filter__clicked`).style.display = 'flex';
    }

    hideDropdown()
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
                    <ul class="filter__item-list d-flex flex-column flex-wrap"></ul>
                </div>
            </div>
        `;
        document.querySelector('.filter__bar').innerHTML += html;
    }

    async start()
    {
        this.collect();
        await this.showButton();
        this.listenForDropdownOpening();
    }
}