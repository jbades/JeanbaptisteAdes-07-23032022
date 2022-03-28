import { recipes } from "../../data/recipes.js"
import RecipesGallery from "../classes/RecipesGallery.js"

let gallery = new RecipesGallery();
gallery.hydrate(recipes);
gallery.display();