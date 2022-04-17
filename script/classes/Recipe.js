import Ingredient from "./Ingredient.js";

export default class Recipe
{
    constructor(recipe)
    {
        this.id = recipe.id;
        this.name = recipe.name;
        this.servings = recipe.servings;
        this.ingredients = [];
        recipe.ingredients.forEach(ingredient =>
        {
            let ingr = new Ingredient(ingredient);
            this.ingredients.push(ingr);
        });
        this.time = recipe.time;
        this.description = recipe.description;
        this.appliance = recipe.appliance;
        this.ustensils = recipe.ustensils;
    }

   display()
    {
        return `
                    <div class="recipe-card card d-flex flex-column flex-nowrap">
                        <div src="#" class="recipe-card__img"></div>
                        <div class="recipe-card__body h-100">
                            <div class="recipe-card__row1 d-flex flex-row flex-nowrap align-items-center">
                                <span class="h4 col-9 recipe-card__title p-0">${this.name}</span>
                                <span class="col-3 d-flex flex-row flex-nowrap align-items-center">
                                    <i class="col-3 fa fa-clock-o p-0" aria-hidden="true"></i>
                                    <span class="col-9">${this.time} min</span>
                                </span>
                            </div>
                            <div class="recipe-card__row2 d-flex flex-row flex-nowrap justify-content-between">
                                <div class="col-6 recipe-card__ingredients p-0">${this.displayIngredients()}</div>
                                <div class="col-6 recipe-card__description  p-0 text-truncate text-truncate--5">${this.description}</div>
                            </div>
                        </div>
                    </div>
                `
    }

    displayIngredients()
    {
        let html = '';
        this.ingredients.forEach(ingredient =>
        {
            html += ingredient.display() + '<br>';
        });
        return html;
    }

    getIngredients()
    {
        return this.ingredients;
    }
}