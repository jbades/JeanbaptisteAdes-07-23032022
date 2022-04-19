import Recipe from "./Recipe.js";

export default class RecipesGallery
{
    constructor()
    {
        this.recipeList = [];
   }

    display()
    {
        let recipesHTML = '';
        this.recipeList.forEach((recipe) =>
        {
            recipesHTML += recipe.display(recipe);
        });
        document.querySelector('.gallery').innerHTML = recipesHTML;
    }

    hydrate(data)
    {
        data.forEach((recipe) => 
        {
           this.recipeList.push(new Recipe(recipe));
        });
    }

    start(data)
    {
        this.hydrate(data);
        this.display();
    }
}