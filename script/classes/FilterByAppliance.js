import FilterBy from "./FilterBy.js";

export default class FilterByAppliance extends FilterBy
{
    constructor(gallery)
    {
        super(gallery, {
            name: 'appliance',
            heading: 'Appareil',
            placeholder: 'Rechercher un appareil',
            bgcolor: 'bg-danger'
        });
    }

    collect()
    {
        this.all = new Set();

        this.gallery.filtered.forEach(recipe => 
        {
            this.all.add(recipe.appliance.toLowerCase());
        });
        this.all = [...(this.all)].sort((a, b) => a.localeCompare(b));
    }

    filterRecipe(recipes)
    {
        return [...recipes].filter(recipe =>
        {
            if (this.selection.length === 0)
            {
                return true;
            }

            return this.selection.includes(recipe.appliance.toLowerCase());
        });
    }
}