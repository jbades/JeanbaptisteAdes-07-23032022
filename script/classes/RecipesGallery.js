import Recipe from "./Recipe.js";

export default class RecipesGallery
{
    constructor()
    {
        this.gallery = [];
   }

    display()
    {
        let recipesHTML = '';
        this.gallery.forEach((recipe) =>
        {
            recipesHTML += recipe.display(recipe);
        });
        document.querySelector('.gallery').innerHTML = recipesHTML;
    }

    hydrate(data)
    {
        data.forEach((recipe) => 
        {
           this.gallery.push(new Recipe(recipe));
        });
    }

    start(data)
    {
        this.hydrate(data);
        this.display();
    }
}