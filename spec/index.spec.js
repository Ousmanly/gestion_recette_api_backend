import RecipeModel from '../models/RecipeModel.js';

describe('Recipe tests', () => {
  let recipeId = null;

  it('can be create', async () => {
    const recipe = { title: 'crepe test', type: 'desert', ingredients: 'farime, lait' };
    const checkTitle = await RecipeModel.checkRecipes(recipe.title)
    if (checkTitle === 0) {
      const result = await RecipeModel.createRecipes(
        recipe.title,
        recipe.type,
        recipe.ingredients
      );
      recipeId = result.insertId;
      const recipeCreated = await RecipeModel.getRecipeById(recipeId);
      
      expect(recipeId).not.toBeNull();
      expect(recipeCreated).not.toBeNull();
    }
  });

  it('can not be create', async () => {
    try {
      const recipe = { title: null, type: 'dessert', ingredient: 'farime' };
      const result = await RecipeModel.createRecipes(
        recipe.title,
        recipe.type,
        recipe.ingredient
      );
      recipeId = result.insertId;
      const recipeCreated = await RecipeModel.getRecipeById(recipeId);
      expect(recipeId).toBeNull();
      expect(recipeCreated).toEqual([]);
    } catch (error) {}
  });

  it('Can get all recipes', async () => {
    const getAll = await RecipeModel.getAllRecipes();
    expect(getAll).not.toBeNull();
  });

  it('Can delete recipes', async () => {
    let id = 75;
    await RecipeModel.deleteRecipes(id);
    const recipe = await RecipeModel.getRecipeById(id);
    expect(recipe).toEqual([]);
  });

  it('Can not delete recipes', async () => {
    let id = 70;
    const deleteRecipe = await RecipeModel.deleteRecipes(id);
    expect(deleteRecipe).toBe(0);
    const recipe = await RecipeModel.getRecipeById(id);
    expect(recipe).toEqual([]);
  });

  it('Can update recipes', async () => {
    const recipe = {
      id: 7,
      title: 'crenpe Test',
      ingredients: 'farime, Oeuf',
      type: 'dessert',
    };
    await RecipeModel.updateRecipes(
      recipe.id,
      recipe.title,
      recipe.ingredients,
      recipe.type
    );
    // expect(updateRecipe).not.toBe(0);

    const updatedRecipe = await RecipeModel.getRecipeById(recipe.id);
    expect(updatedRecipe[0].title).toBe(recipe.title);
    expect(updatedRecipe[0].ingredient).toBe(recipe.ingredient);
    expect(updatedRecipe[0].type).toBe(recipe.type);
  });

  it('Can not update recipes', async () => {
    const recipe = {
      id: 5000,
      title: 'crenpe',
      ingredient: 'farime',
      type: 'dessert',
    };
    const updateRecipe = await RecipeModel.updateRecipes(
      recipe.id,
      recipe.title,
      recipe.ingredient,
      recipe.type
    );
    expect(updateRecipe).toBe(0);
  });
});
