import React, { useState } from 'react';
import { Clock, Users, ChefHat, Plus, ShoppingBag, Check } from 'lucide-react';
import { RECIPES } from '../../data/recipes';
import { PRODUCTS } from '../../data/products';
import { Recipe } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useCart } from '../../context/CartContext';

export const RecipesPage: React.FC = () => {
  const { addToCart, addToast } = useCart();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(RECIPES[0]);

  const recipeProducts = PRODUCTS.filter(p => selectedRecipe.productIds.includes(p.id));

  const handleAddAllIngredients = () => {
    recipeProducts.forEach(product => {
      addToCart(product, 1);
    });
    addToast(`Added all ingredients for "${selectedRecipe.title}" to your basket!`);
  };

  return (
    <div className="py-10 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Homestyle Culinary Inspiration
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Fresh Indian Recipes & Ingredient Baskets
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Cook comforting homestyle meals in under 20 minutes. Select any recipe to view step-by-step methods and add every fresh ingredient directly to your cart with one click.
          </p>
        </div>

        {/* Recipe Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 justify-start sm:justify-center">
          {RECIPES.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                selectedRecipe.id === recipe.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-500'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>{recipe.title}</span>
            </button>
          ))}
        </div>

        {/* Active Recipe Detail Showcase */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 mb-12">
          
          {/* Left: Recipe Visual & Method */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
              <ImageWithFallback
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-4 text-xs text-stone-500 mb-2">
                <span className="font-semibold text-emerald-700">{selectedRecipe.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Prep: {selectedRecipe.prepTime} | Cook: {selectedRecipe.cookTime}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Serves {selectedRecipe.servings}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-stone-900">
                {selectedRecipe.title}
              </h2>
              {selectedRecipe.hindiTitle && (
                <p className="text-sm font-medium text-stone-500 mt-0.5">
                  {selectedRecipe.hindiTitle}
                </p>
              )}

              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {selectedRecipe.description}
              </p>
            </div>

            {/* Cooking Steps */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Preparation & Cooking Method:
              </h3>
              <ol className="space-y-2 text-xs text-stone-700 leading-relaxed list-decimal pl-4">
                {selectedRecipe.instructions.map((step, idx) => (
                  <li key={idx} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: Ingredient Bundle & Add All Button */}
          <div className="lg:col-span-5 bg-stone-50 p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-stone-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Required Groceries ({recipeProducts.length})
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Farm-fresh items picked for this dish
                  </p>
                </div>
                <span className="text-xs font-extrabold text-emerald-800 tabular-nums">
                  Total: ₹{recipeProducts.reduce((sum, p) => sum + p.price, 0)}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {recipeProducts.map((p) => (
                  <div key={p.id} className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <ImageWithFallback
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover border border-stone-100 shrink-0"
                      />
                      <div className="truncate">
                        <p className="text-xs font-bold text-stone-900 truncate">{p.name}</p>
                        <p className="text-[10px] text-stone-500">{p.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-stone-900 tabular-nums">₹{p.price}</span>
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="p-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                        title="Add single item"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-8 pt-4 border-t border-stone-200">
              <button
                onClick={handleAddAllIngredients}
                className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-2xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add All {recipeProducts.length} Ingredients to Basket</span>
              </button>
              <p className="text-[11px] text-stone-400 text-center mt-2">
                Delivered in single temperature-safe crate with recipe card
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
