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

    filterRecipe(recipes)
    {
        return [...(recipes)].filter((recipe) =>
        {
            let count = 0;
            recipe.ingredientList.forEach((objIngr) =>
            {
                // console.log(this.selection, objIngr.ingredient);
                if(this.selection.includes(objIngr.ingredient))
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