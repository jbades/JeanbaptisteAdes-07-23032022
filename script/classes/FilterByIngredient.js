import FilterBy from "./FilterBy.js";

export default class FilterByIngredient extends FilterBy
{
    constructor(gallery)
    {
        super(gallery, {
            name: 'ingredient',
            heading: 'Ingrédient',
            placeholder: 'Rechercher un ingrédient',
            bgcolor: 'bg-primary'
        });
    }

    collect()
    {
        this.all = new Set();
        this.gallery.filtered.forEach(recipe => 
            {
                recipe.ingredientList.forEach(ingredient => 
                    {
                        this.all.add(ingredient.ingredient.toLowerCase());
                    });
            });
        this.all = [...(this.all)].sort((a, b) => a.localeCompare(b));
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
}