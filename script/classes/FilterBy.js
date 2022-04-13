export default class FilterBy
{
    constructor(gallery)
    {
        this.gallery = gallery;
        this.all = new Set();
        this.item =
        {
            name: 'ingredient',
            heading: 'Ingrédients'
        };
    }

    buildDropdown(item)
    {
        let html = 
        `
            <div class="filter__welcome d-flex flex-row flex-nowrap justify-content-between align-items-center filter__btn bg-primary text-white rounded">
                <span>${this.item.heading}</span>
                <i class="fa fa-chevron-down" aria-hidden="true"></i> 
            </div>
            <div class="clicked-filter d-flex flex-column flex-nowrap d-none bg-primary text-white rounded p-3">
                <div class="d-flex flex-row flex-nowrap justify-content-between align-items-center">
                    <input
                        id="search-${this.item.name}>"
                        name="search-${this.item.name}"
                        class="forced-placeholder text-light w-75 bg-transparent border-0"
                        placeholder="Rechercher un ingrédient"
                    />
                    <i class="exit-filter fa fa-chevron-up" aria-hidden="true"></i> 
                </div>
                <div class="">lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor</div>
            </div>
        `
        
        document.querySelector('.filter__bar').innerHTML = html;
    }

    collect()
    {
        this.gallery.all.forEach(recipe => 
        {
            recipe.ingredients.forEach(ingObject => 
                {
                    this.all.add(ingObject.ingredient);
                });
            });
        console.log(this.all);
    }

    listenFilter()
    {
        document.querySelector('.filter__welcome').addEventListener('click', () => 
        {
            document.querySelector('.filter__welcome').classList.add('d-none');
            document.querySelector('.clicked-filter').classList.remove('d-none');
            this.listenExitFilter();
        });
    }

    listenExitFilter()
    {
        document.querySelector('.exit-filter').addEventListener('click', () => 
        {
            document.querySelector('.filter__welcome').classList.remove('d-none');
            document.querySelector('.clicked-filter').classList.add('d-none');
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

    start()
    {
        this.collect();
        this.buildDropdown();
        this.listenFilter();
    }
}