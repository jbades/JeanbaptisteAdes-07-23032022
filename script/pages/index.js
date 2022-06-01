import { recipes } from "../../data/recipes.js"
import RecipesGallery from "../classes/RecipesGallery.js"
import FilterByIngredient from "../classes/FilterByIngredient.js"
import FilterByAppliance from "../classes/FilterByAppliance.js"

let recipeList = new RecipesGallery();
recipeList.start(recipes);
document.querySelector('#searchzone').focus();
recipeList.addFilter(new FilterByIngredient(recipeList));
recipeList.addFilter(new FilterByAppliance(recipeList));

// let html = '';
// recipeList.filters.forEach(filter =>
//     {
//         console.log(filter);
//         html += filter.showClosedDropdown();
//         console.log(html);
//     });
//     document.querySelector('.filter__bar').innerHTML = html;
