import Recipe from "./Recipe.js";

export default class RecipesGallery
{
    constructor()
    {
        this.all = []
    }

    display()
    {
        let html = '';
        this.all.forEach((recipe) =>
        {
            html += recipe.displayRecipe();
        });
        document.querySelector('.gallery').innerHTML = html;
    }

    hydrate(data)
    {
        data.forEach((recipe) => 
        {
            let newRecipe = new Recipe(recipe);
            this.all.push(newRecipe);
        });
    }
}