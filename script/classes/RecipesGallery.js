import Recipe from "./Recipe.js";

export default class RecipesGallery
{
    constructor()
    {
        this.recipes = [];
   }

    display()
    {
        let recipesHTML = '';
        this.recipes.forEach((recipe) =>
        {
            recipesHTML += recipe.display(recipe);
        });
        document.querySelector('.gallery').innerHTML = recipesHTML;
    }

    hydrate(data)
    {
        data.forEach((recipe) => 
        {
           this.recipes.push(new Recipe(recipe));
        });
    }

    start(data)
    {
        this.hydrate(data);
        this.display();
    }
}