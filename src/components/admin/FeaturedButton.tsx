"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  isFeatured: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export default function FeaturedButton({
  isFeatured,
  onToggle,
  disabled,
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggle}
            disabled={disabled}
          >
            <Star
              className={`h-4 w-4 transition-all ${
                isFeatured
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-muted-foreground hover:text-yellow-500"
              }`}
            />
            <span className="sr-only">
              {isFeatured ? "Unfeature project" : "Feature project"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{isFeatured ? "Unfeature project" : "Feature project"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
