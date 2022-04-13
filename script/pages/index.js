import { recipes } from "../../data/recipes.js"
import RecipesGallery from "../classes/RecipesGallery.js"
import FilterBy from "../classes/FilterBy.js"

let gallery = new RecipesGallery();
gallery.hydrate(recipes);
gallery.display();
let filter = new FilterBy(gallery);
filter.start();
