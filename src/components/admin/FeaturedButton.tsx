"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toggleFeatured } from "@/app/actions/projects";

type Props = {
  id: string;
  isFeatured: boolean;
};

export default function FeaturedButton({ id, isFeatured }: Props) {
  return (
    <form action={toggleFeatured.bind(null, id)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Star
                className={`h-4 w-4 transition-all ${
                  isFeatured
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground hover:text-yellow-500"
                }`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{isFeatured ? "Unfeature project" : "Feature project"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
