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
        let ingredientHTML = '';
        this.ingredients.forEach((item) => 
        {
            if (!!item.quantity && !!item.unit)
            {
                ingredientHTML += item.ingredient + `: ` + item.quantity + ` ` + item.unit + `<br/>`;
            } 
            else if (!item.quantity && !!item.unit)
            {
                ingredientHTML += item.ingredient + `: ` + item.unit + `<br/>`;
            }
            else if (!!item.quantity && !item.unit)
            {
                ingredientHTML += item.ingredient + `: ` + item.quantity + `<br/>`;
            }
            else if (!item.quantity && !item.unit)
            {
                ingredientHTML += item.ingredient + `<br/>`;
            }
        });

        return `
                    <div class="recipe-card card">
                        <div src="#" class="recipe-card__img"></div>
                        <div class="recipe-card__body">
                            <div class="recipe-card__row1">
                                <span class="col-6 recipe-card__title no-h-padding">${this.name}</span>
                                <span>
                                    <i class="col-6 fa fa-clock-o no-h-padding" aria-hidden="true"></i>
                                    <span>${this.time} min</span>
                                </span>
                            </div>
                            <div class="recipe-card__row2">
                                <div class="col-6 recipe-card__ingredients no-h-padding">${ingredientHTML}</div>
                                <div class="col-6 recipe-card__description  no-h-padding text-truncate text-truncate--5">${this.description}</div>
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