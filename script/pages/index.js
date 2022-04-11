import { recipes } from "../../data/recipes.js"
import RecipesGallery from "../classes/RecipesGallery.js"
import FilterByIngredient from "../classes/FilterByIngredient.js"

let gallery = new RecipesGallery();
gallery.hydrate(recipes);
gallery.display();
let filter = new FilterByIngredient(gallery);
console.log(filter);
filter.collect();