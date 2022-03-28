import Ingredients from "./Ingredients.js";
import Ustensils from "./Ustensils.js";

export default class Recipe
{
    constructor(recipe)
    {
        this.id = recipe.id;
        this.name = recipe.name;
        this.servings = recipe.servings;
        this.ingredients = [];
        this.hydrateIngredients(recipe);
        this.time = recipe.time;
        this.description = recipe.description;
        this.appliance = recipe.appliance;
        this.ustensils = [];
        this.hydrateUstensils(recipe);
    }

    displayRecipe()
    {
        return `
                <div class="recipe-card card">
                    <div src="#" class="recipe-card__img">skljfsd</div>
                    <div class="recipe-card__body">
                        <div class="recipe-card__row1">
                            <span class="recipe-card__title">${this.name}</span>
                            <span>
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                <span>${this.time} min</span>
                            </span>
                        </div>
                        <div class="recipe-card__row2">
                            <div class="recipe-card__ingredients">${this.ingredients}</div>
                            <div class="recipe-card__description .text-truncate.text-truncate--5">${this.description}</div>
                        </div>
                    </div>
                </div>
            `
    }

    hydrateIngredients(recipe)
    {
        recipe.ingredients.forEach((element) => {
            let data = new Ingredients(element);
            this.ingredients.push(data);
        });
    }
    hydrateUstensils(recipe)
    {
        recipe.ustensils.forEach((element) => {
            let data = new Ustensils(element);
            this.ustensils.push(data);
        });
    }
}

// Object.assign(Recipe.prototype, Ingredients, Ustensils);
