import { recipes } from "../../data/recipes.js"
import Recipes from "../classes/Recipes.js"
import FilterByIngredient from "../classes/FilterByIngredient.js"
import FilterByAppliance from "../classes/FilterByAppliance.js"
import FilterByUstensil from "../classes/FilterByUstensil.js";

let recipeList = new Recipes();
recipeList.start(recipes);
document.querySelector('#searchzone').focus();
recipeList.addFilter(new FilterByIngredient(recipeList));
recipeList.addFilter(new FilterByAppliance(recipeList));
recipeList.addFilter(new FilterByUstensil(recipeList));