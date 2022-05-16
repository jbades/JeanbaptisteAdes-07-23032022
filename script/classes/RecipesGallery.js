import Recipe from "./Recipe.js";
import FilterBy from "./FilterBy.js";

export default class RecipesGallery
{
    constructor()
    {
        this.all = [];
        this.filtered = [];
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

    hydrate(data)
    {
        data.forEach((recipe) => 
        {
           this.all.push(new Recipe(recipe));
        });
        this.filtered = this.all;
    }

    listenEsc()
    {
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                document.querySelector('#searchzone').value = '';
                this.filtered = this.all;
                this.display();
                };
        });
    }

    async listenFilterItem()
    {
        let toto = new FilterBy();
        await toto.displayItems();
        
        document.querySelectorAll('.filter__item').forEach(el =>
        {
            el.addEventListener('click', (e) =>
            {
                // const needle = e.target.innerHTML;
                this.filtered = [];
                this.all.forEach((recipe) =>
                {
                    if (recipe.searchIngredients(e))
                    {
                        this.filtered.push(recipe);
                    };
                });
                this.display();
            });
        });
    }

    search()
    {
        document.querySelector('#searchzone').addEventListener('input', (el) =>
        {
            this.filtered = [];
            if (el.target.value.length < 3)
            {
                let html = 
                `
                    <span>Entrez plus de 3 caractères pour obtenir le résultat de votre recherche.</span>
                `
                document.querySelector('.gallery').innerHTML = html;

            } else
            {
                this.all.forEach((recipe) =>
                {
                    if (recipe.searchName(el) || recipe.searchDescription(el) || recipe.searchIngredients(el))
                    {
                        this.filtered.push(recipe);
                    }
                });
                this.display();
            }
        });
    }

    start(data)
    {
        this.hydrate(data);
        this.display();
        this.search();
        // this.listenFilterItem();
        this.listenEsc();
    }

}