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
            html += `<button class="filter__item border-0 bg-transparent" data-id="${item}">${item}</button>`;
        });
        return html;
    }

    displayItems()
    {
        document.querySelector('.filter__item-list').innerHTML = this.buildDropdownList();
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

    listenEscToExitFilter()
    {
        document.addEventListener('keydown', this.escapeFilter.bind(this));
    }

    listenExitButton()
    {
        document.querySelector('.exit-filter').addEventListener('click', () => 
        {
            console.log("coucou");
            this.showClosedDropdown();
            this.filtered = this.all;
            this.listenForDropdownOpening();
            this.listenForSelect();
        });
    }

    listenForClickOutsideDropdown()
    {
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
        document.querySelector(`[data-filter=${this.item.heading}]`).addEventListener('click', () => 
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
        });
    }

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
                this.collect();
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
                    this.collect();
                    this.showClosedDropdown();
                    this.listenForDropdownOpening();
                    this.listenForUnselect();
                });
            });
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

    showClosedDropdown()
    {
        // let html = 
        // `
        //     <button class="filter__welcome d-flex flex-row flex-nowrap justify-content-between align-items-center filter__btn bg-primary text-white rounded">
        //         <span class="h5">${this.item.heading}</span>
        //         <i class="fa fa-chevron-down" aria-hidden="true"></i> 
        //     </button>
        // `;
        // document.querySelector('.filter__bar').innerHTML = html;
        
        let button = document.createElement('button');
        button.classList.add('filter__welcome', 'd-flex', 'flex-row', 'flex-nowrap', 'justify-content-between', 'align-items-center', 'filter__btn', `${this.item.bgcolor}`, 'text-white', 'rounded');
        button.setAttribute('data-filter', `${this.item.heading}`);
        document.querySelector('.filter__bar').appendChild(button);
        let html = 
        `
            <span class="h5">${this.item.heading}</span>
            <i class="fa fa-chevron-down" aria-hidden="true"></i> 
        `;
        document.querySelector(`[data-filter=${this.item.heading}]`).innerHTML = html;

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

    start()
    {
        this.collect();
        this.showClosedDropdown();
        this.listenForDropdownOpening();
        this.listenEscToExitFilter();
    }
}