export default class FilterByIngredient
{
    constructor(gallery)
    {
        this.gallery = gallery;
        // this.all = new Set();
    }

    collect()
    {
        let list = [];
        // let list = new Set();

        this.gallery.all.forEach(recipe => 
        {
            recipe.ingredients.forEach(ingObject => 
                {
                    list.all.push(ingObject.ingredient);
                });
        });
        console.log(list);
    }
}