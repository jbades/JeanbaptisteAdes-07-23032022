import FilterBy from "./FilterBy.js";

export default class FilterByUstensil extends FilterBy
{
    constructor(gallery)
    {
        super(gallery, {
            name: 'ustensil',
            heading: 'Ustensil',
            placeholder: 'Rechercher un ustensil',
            bgcolor: 'bg-success'
        });
    }

    collect()
    {
        this.all = new Set();
        this.gallery.filtered.forEach(recipe => 
        {
            recipe.ustensils.forEach((ustensil) =>
            {
                this.all.add(ustensil.toLowerCase());
            });
        });
        this.all = [...(this.all)].sort((a, b) => a.localeCompare(b));
    }

    filterRecipe(recipes)
    {
        return [...(recipes)].filter((recipe) =>
        {
            let count = 0;
            recipe.ustensils.forEach((objUst) =>
            {
                if(this.selection.includes(objUst))
                {
                    count++;
                }
            });

            if (count == this.selection.length)
            {
                return true;
            }

            return false;
        });
    }
}