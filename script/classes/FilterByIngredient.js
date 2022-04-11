export default class FilterByIngredient
{
    constructor(gallery)
    {
        this.gallery = gallery;
        this.all = new Set();
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