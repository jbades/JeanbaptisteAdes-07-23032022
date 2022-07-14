import Recipe from "./Recipe.js";

export default class Recipes
{
    constructor()
    {
        this.all = new Set();
        this.searchEvent = '';
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
            this.filtered = filter.filterRecipe(this.filtered);
        });
        this.display();

        this.filters.forEach((filter) =>
        {
            filter.collect();   
            filter.displayItems();
            filter.listenForSelect();
        });
        this.filtered = this.all;
        this.search(this.searchEvent);
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
            if (el.target.value.length === 0)
            {
                this.filtered = this.all;
                this.filters.forEach((filter) =>
                {
                    filter.collect();
                });
                this.display();
                this.listenForSearch();
                this.listenEsc();
                return;
            }

            if (el.target.value.length < 3)
            {
                let html = 
                `
                    <span>Entrez plus de 3 caractères pour obtenir le résultat de votre recherche.</span>
                `
                document.querySelector('.gallery').innerHTML = html;
                return;
            }

            this.searchEvent = el; 
            this.search(el);
            this.filter();
            // this.altSearch(el);
            this.filters.forEach((filter) =>
            {
                filter.collect();
            });
            // this.display();
            this.listenForSearch();
            this.listenEsc();
        });
    }

    search(el)
    {
        console.time('.search method - ' + el.target.value);
        this.filtered = new Set();
        this.all.forEach((recipe) =>
        {
            if (recipe.searchName(el) || recipe.searchDescription(el) || recipe.searchIngredients(el))
            {
                this.filtered.add(recipe);
            }
        });
        console.timeEnd('.search method - ' + el.target.value);
    }

    altSearch(el)
    {
        console.time('.altSearch method - ' + el.target.value);
        this.filtered = new Set();
        const all = [...this.all];
        for (let i = 0; i < all.length; i++)
        {
            let recipe = [...this.all][i];
            if (recipe.searchName(el) || recipe.searchDescription(el) || recipe.searchIngredients(el))
            {
                this.filtered.add(recipe);
            }
       };
       console.timeEnd('.altSearch method - ' + el.target.value);
    }

    start(data)
    {
        this.hydrate(data);
        this.display(); 
        this.listenForSearch();
    }
}