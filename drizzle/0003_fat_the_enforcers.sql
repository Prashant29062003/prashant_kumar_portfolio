DROP INDEX "featured_rank_idx";
--> statement-breakpoint
ALTER TABLE `projects` DROP COLUMN `featured_rank`;
--> statement-breakpoint
ALTER TABLE `projects` ADD COLUMN `is_featured` integer NOT NULL DEFAULT false;
--> statement-breakpoint
CREATE INDEX `is_featured_idx` ON `projects` (`is_featured`);
