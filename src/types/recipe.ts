import { type InferSelectModel } from "drizzle-orm";
import * as schema from "@/database/schema";

export type Difficulty = "easy" | "medium" | "hard";

export type Country = InferSelectModel<typeof schema.country>;
export type Recipe = InferSelectModel<typeof schema.recipe>;

export interface RecipeWithCountry extends Recipe {
  countryName: string;
  countrySlug: string;
}
export interface RecipeQueryOptions {
  limit?: number;
  offset?: number;
  countrySlug?: string;
  excludeIds?: string[];
}

export type User = InferSelectModel<typeof schema.user>;

export type Review = InferSelectModel<typeof schema.reviews>;

export type ReviewWithUserName = Review & {
  userName: string;
};
