export default class FilterBy
{
    constructor(gallery)
    {
        this.gallery = gallery;
        this.all = new Set();
    }

    buildDropdown(item)
    {
        let html = 
        `
            <div class="btn-wrapper bg-primary text-white">
                <div class="d-flex flex-row flex-nowrap justify-content-between align-items-center filter-btn">
                    <span>Ingrédients</span>
                    <i class="fa fa-chevron-down" aria-hidden="true"></i> 
                </div>
                <div class="d-flex flex-column flex-nowrap hidden-btn">
                    <div class="d-flex flex-row flex-nowrap justify-content-between align-items-center">
                        <input
                            id="search-${item}>"
                            name="search-${item}"
                            class=""
                            placeholder="Rechercher un ingrédient"
                        />
                        <i class="fa fa-chevron-up" aria-hidden="true"></i> 
                    </div>
                    <div class="">lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor</div>
                </div>
            </div>
        `
        
        document.querySelector('.filterbar').innerHTML = html;
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
}