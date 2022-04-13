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
                    <div class="recipe-card card d-flex flex-column flex-nowrap">
                        <div src="#" class="recipe-card__img"></div>
                        <div class="recipe-card__body h-100">
                            <div class="recipe-card__row1 d-flex flex-row flex-nowrap align-items-center">
                                <h4 class="col-9 recipe-card__title p-0">${this.name}</h4>
                                <span class="col-3 d-flex flex-row flex-nowrap align-items-center">
                                    <i class="col-3 fa fa-clock-o p-0" aria-hidden="true"></i>
                                    <span class="col-9">${this.time} min</span>
                                </span>
                            </div>
                            <div class="recipe-card__row2 d-flex flex-row flex-nowrap justify-content-between">
                                <div class="col-6 recipe-card__ingredients p-0">${ingredientHTML}</div>
                                <div class="col-6 recipe-card__description  p-0 text-truncate text-truncate--5">${this.description}</div>
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