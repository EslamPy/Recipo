import { notFound } from "next/navigation";
import RecipeHeader from "@/components/recipes/recipe-header";
import { RecipeIngredients } from "@/components/recipes/recipe-ingredients";
import { RecipeInstructions } from "@/components/recipes/recipe-instructions";
import { CommentSection } from "@/components/recipes/comment-section";
import {
  getRecipeBySlug,
  getAllRecipes,
  getReviewsByRecipeId,
} from "@/database/queries";
import BackButton from "@/components/recipes/back-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RecipeRelated from "@/components/recipes/recipe-related";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  return {
    title: recipe?.title,
    description: recipe?.description,
  };
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes({ limit: 100 });

  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function RecipePage({ params }: { params: Params }) {
  const { slug } = await params;

  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }
  const reviews = await getReviewsByRecipeId(recipe?.id);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  // Get related recipes
  const relatedRecipes = await getAllRecipes({ 
    countrySlug: recipe.countrySlug,
    limit: 4,
    excludeIds: [recipe.id],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <BackButton title="Recipes" />

        {/* Recipe Header */}
        <RecipeHeader recipe={recipe} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Ingredients */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <RecipeIngredients ingredients={recipe.ingredients as string[]} />
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <RecipeInstructions
              instructions={recipe.instructions as string[]}
              videoUrl={recipe.videoUrl as string}
              title={recipe.title}
            />
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection
          initialComments={reviews}
          recipeId={recipe.id}
          userId={userId || ""}
          recipeSlug={recipe.slug}
        />
        
        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <div className="mt-16">
            <RecipeRelated recipes={relatedRecipes} country={recipe.countryName} />
          </div>
        )}
      </div>
    </div>
  );
}
