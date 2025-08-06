import { HeroSection } from "@/components/home/hero-section";
import {
  PopularCuisines,
  PopularCuisinesSkeleton,
} from "@/components/home/popular-cuisines";
import {
  FeaturedRecipes,
  FeaturedRecipesSkeleton,
} from "@/components/home/featured-recipes";
import { Newsletter } from "@/components/home/newsletter";

// Prevent static generation during build
export const dynamic = 'force-dynamic'

import {
  getFeaturedRecipes,
  getPopularCuisines,
  getUserLikedRecipes,
} from "@/database/queries";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function PopularCuisinesSection() {
  const popularCuisines = await getPopularCuisines();
  return <PopularCuisines popularCuisines={popularCuisines} />;
}

async function FeaturedRecipesSection() {
  const featuredRecipes = await getFeaturedRecipes();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const userLikedRecipes = user ? await getUserLikedRecipes(user.id) : null;

  return (
    <FeaturedRecipes
      recipes={featuredRecipes}
      userLikedRecipes={userLikedRecipes}
    />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-amber-50/80 to-white">
      <HeroSection />
      
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-amber-50/80 to-transparent pointer-events-none"></div>
        <div className="absolute -top-8 left-1/4 w-16 h-16 rounded-full bg-amber-200/30 blur-xl"></div>
        <div className="absolute top-40 right-1/3 w-24 h-24 rounded-full bg-orange-200/20 blur-xl"></div>
        <div className="absolute top-96 left-1/2 w-32 h-32 rounded-full bg-amber-100/30 blur-xl"></div>
        
        <Suspense fallback={<PopularCuisinesSkeleton />}>
          <PopularCuisinesSection />
        </Suspense>

        <Suspense fallback={<FeaturedRecipesSkeleton />}>
          <FeaturedRecipesSection />
        </Suspense>
      </div>
      
      <Newsletter />
    </div>
  );
}
