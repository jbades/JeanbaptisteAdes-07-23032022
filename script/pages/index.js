import { recipes } from "../../data/recipes.js"
import RecipesGallery from "../classes/RecipesGallery.js"
import FilterBy from "../classes/FilterBy.js"

let gallery = new RecipesGallery();
gallery.start(recipes);
let filter = new FilterBy(gallery);
filter.start();
