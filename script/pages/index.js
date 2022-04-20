import { recipes } from "../../data/recipes.js"
import RecipesGallery from "../classes/RecipesGallery.js"
import FilterBy from "../classes/FilterBy.js"

window.onload = () => document.querySelector('#searchzone').focus();
let recipeList = new RecipesGallery();
recipeList.start(recipes);
let filter = new FilterBy(recipeList);
filter.start();
