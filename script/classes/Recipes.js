import Recipe from "./Recipe.js";

export default class Recipes
{
    constructor()
    {
        this.all = new Set();
        this.filtered = new Set();
        this.filters = [];
   }

    addFilter(filter)
    {
       this.filters.push(filter);
       this.createTagWrapper();
       filter.start();
    }

    createTagWrapper()
    {
        let html = '';
        // console.log(this.filters);
        this.filters.forEach(filter =>
        {
            html = `<div class="tag__filter-wrapper d-flex flex-row flex-nowrap align-items-center" data-filter=${filter.item.name}></div>`
        });
        document.querySelector(`.tag__wrapper`).innerHTML += html;
    }

    display()
    {
        let html = ``;
        if (this.filtered.length != 0)
        {
            this.filtered.forEach((recipe) =>
            {
                html += recipe.display();
            });
        } else 
        {
            html = `<span>Aucune recette ne correspond à votre critère... Vous pouvez chercher « tarte aux pommes », « poisson », etc.</span>`
        }
        document.querySelector('.gallery').innerHTML = html;
    }

    filter()
    {
        this.filters.forEach((filter) =>
        {
            this.filtered = filter.filterRecipe(filter.gallery.filtered);
        });
        this.display();
    }

    hydrate(data)
    {
        data.forEach((recipe) => 
        {
           this.all.add(new Recipe(recipe));
        });
        this.filtered = this.all;
    }

    listenEsc()
    {
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape")
            {
                document.querySelector('#searchzone').value = '';
                this.filtered = this.all;
                this.display();
            };
        });
    }

    listenForSearch()
    {
        document.querySelector('#searchzone').addEventListener('input', (el) =>
        {
            if (el.target.value.length < 3)
            {
                let html = 
                `
                    <span>Entrez plus de 3 caractères pour obtenir le résultat de votre recherche.</span>
                `
                document.querySelector('.gallery').innerHTML = html;

            } else
            {
                this.search(el);
                this.display();
                this.listenEsc();
            }
        });
    }

    search(el)
    {
        this.filtered = new Set();
        this.all.forEach((recipe) =>
        {
            if (recipe.searchName(el) || recipe.searchDescription(el) || recipe.searchIngredients(el))
            {
                this.filtered.add(recipe);
            }
       });
    }

    start(data)
    {
        this.hydrate(data);
        this.display(); 
        this.listenForSearch();
    }

}