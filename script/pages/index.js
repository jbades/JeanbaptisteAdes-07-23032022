import { recipes } from "../../data/recipes.js"
import RecipesGallery from "../classes/RecipesGallery.js"
import FilterBy from "../classes/FilterBy.js"

let recipeList = new RecipesGallery();
recipeList.start(recipes);
document.querySelector('#searchzone').focus();
let filter = new FilterBy(recipeList);
filter.start();