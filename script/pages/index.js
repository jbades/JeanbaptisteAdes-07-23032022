import { recipes } from "../../data/recipes.js"
import RecipesGallery from "../classes/RecipesGallery.js"
import FilterBy from "../classes/FilterBy.js"
import FilterByAppliance from "../classes/FilterByAppliance.js";

let recipeList = new RecipesGallery();
recipeList.start(recipes);
document.querySelector('#searchzone').focus();
let filter = new FilterBy(recipeList);
// let categories = ['ingredient', 'appliance', 'ustensil'];
let categories = ['ingredient'];
categories.forEach(category =>
    {
        filter.start(category);
    });
// filter.start();
let filterAppl = new FilterByAppliance(recipeList);
filterAppl.start();