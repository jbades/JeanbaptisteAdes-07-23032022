import Recipe from "./Recipe.js";

export default class RecipesGallery
{
    constructor()
    {
        this.recipeList = [];
        this.filteredRecipeList = [];
   }

    display()
    {
        let recipesHTML = '';
        this.filteredRecipeList.forEach((recipe) =>
        {
            recipesHTML += recipe.display();
        });
        document.querySelector('.gallery').innerHTML = recipesHTML;
    }

    hydrate(data)
    {
        data.forEach((recipe) => 
        {
           this.recipeList.push(new Recipe(recipe));
        });
        this.filteredRecipeList = this.recipeList;
    }

    search()
    {
        document.querySelector('#searchzone').addEventListener('input', (el) =>
        {
            this.filteredRecipeList = [];
            this.recipeList.forEach((recipe) =>
            {
                if (recipe.searchName(el) || recipe.searchDescription(el))
                {
                    this.filteredRecipeList.push(recipe);
                };
            });
            this.display();
        });
    }

    start(data)
    {
        this.hydrate(data);
        this.display();
        this.search();
    }
}