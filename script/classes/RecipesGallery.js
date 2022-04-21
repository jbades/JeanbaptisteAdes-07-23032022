import Recipe from "./Recipe.js";
import FilterBy from "./FilterBy.js";

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

    listenEsc()
    {
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                document.querySelector('#searchzone').value = '';
                this.filteredRecipeList = this.recipeList;
                this.display();
                };
        });
    }

    search()
    {
        document.querySelector('#searchzone').addEventListener('input', (el) =>
        {
            this.filteredRecipeList = [];
            this.recipeList.forEach((recipe) =>
            {
                if (recipe.searchName(el) || recipe.searchDescription(el) || recipe.searchIngredients(el))
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
        this.listenEsc();
    }

}