class Category
{
    constructor(gallery)
    {
        this.gallery = gallery;
        this.item = [ingredient, appliance, ustensil];
    }

    collect(el)
    {
        switch (el)
        {
            case 'ingredient':
                this.all = new Set();

                this.gallery.filtered.forEach(recipe => 
                {
                    recipe.ingredientList.forEach(item => 
                        {
                            this.all.add(item.ingredient.toLowerCase());
                        });
                });
                break;
            case 'appliance':
                this.all = new Set();

                this.gallery.filtered.forEach(recipe => 
                {
                    this.all.add(recipe.appliance.toLowerCase());
                });
                break;
            case 'ustensil':
                this.all = new Set();

                this.gallery.filtered.forEach(recipe => 
                    {
                        recipe.ustensils.forEach(ingredient => 
                            {
                                this.all.add(ingredient.toLowerCase());
                            });
                    });
            default:

        }
    }
}

