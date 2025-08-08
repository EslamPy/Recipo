"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReviewWithUserName } from "@/types/recipe";
import { useComment } from "@/hooks/use-comment";
import { formatDate } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface CommentSectionProps {
  initialComments?: ReviewWithUserName[];
  recipeId: string;
  userId: string;
  recipeSlug: string;
}

export function CommentSection({
  initialComments = [],
  recipeId,
  userId,
  recipeSlug,
}: CommentSectionProps) {
  const {
    comments,
    commentText,
    rating,
    hoveredRating,
    setCommentText,
    setRating,
    setHoveredRating,
    handleAddComment,
    isLoading,
  } = useComment({ initialComments, recipeId, userId, recipeSlug });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mt-8 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
          <MessageSquare className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <h3 className="text-xl font-semibold">Reviews & Comments</h3>
      </div>

      {/* Comment input */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex gap-4 mb-8"
      >
        <Avatar className="h-12 w-12">
          <AvatarImage src="" alt="Your profile" />
          <AvatarFallback className="bg-amber-100 text-amber-600 text-sm font-medium">
            YO
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
          {/* Rating stars */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Rate this recipe:
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none transition duration-150"
                    aria-label={`Rate ${star} stars`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <StarIcon
                      filled={(hoveredRating || rating) >= star}
                      className={`w-7 h-7 ${
                        (hoveredRating || rating) >= star
                          ? "text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-3 text-sm text-amber-600 dark:text-amber-400 font-medium"
                >
                  {rating === 5
                    ? "Excellent! 👏"
                    : rating === 4
                    ? "Very good 👍"
                    : rating === 3
                    ? "Good 😊"
                    : rating === 2
                    ? "Fair 🙂"
                    : "Needs improvement 🤔"}
                </motion.span>
              )}
            </div>
          </div>

          <Textarea
            placeholder="Share your thoughts on this recipe..."
            className="resize-none min-h-[100px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleAddComment}
              disabled={!commentText.trim() || isLoading}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            >
              {isLoading ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Comments list */}
      <AnimatePresence>
        {comments.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            {comments.map((comment, index) => (
              <motion.div 
                key={comment.id} 
                className="flex gap-4 group bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage alt={comment.userName || "Unknown User"} />
                  <AvatarFallback className="bg-amber-100 text-amber-600 text-sm font-medium">
                    {comment.userName?.substring(0, 2).toUpperCase() || "Un"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{comment.userName}</h4>
                    <span className="text-muted-foreground text-sm">
                      {formatDate(comment.createdAt.toISOString())}
                    </span>
                  </div>
                  {comment.rating && (
                    <div className="flex mt-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          filled={comment.rating! >= star}
                          className={`w-4 h-4 ${
                            comment.rating! >= star
                              ? "text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.comment}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center py-12 text-muted-foreground bg-gray-50 dark:bg-gray-900/30 rounded-xl"
          >
            <p>Be the first to comment on this recipe!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Star icon component with filled/outline variants
function StarIcon({
  filled,
  className = "",
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "0" : "1.5"}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
