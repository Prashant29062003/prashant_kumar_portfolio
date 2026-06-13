PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_projects` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`description` text NOT NULL,
	`body` text NOT NULL,
	`role` text NOT NULL,
	`scope` text NOT NULL,
	`status` text NOT NULL,
	`visibility` text NOT NULL,
	`duration` text,
	`team_size` integer,
	`year` integer NOT NULL,
	`github_url` text,
	`live_url` text,
	`image_url` text,
	`technologies` text NOT NULL,
	`outcomes` text,
	`metrics` text,
	`featured_rank` integer,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`published_at` text,
	CONSTRAINT "status_check" CHECK("__new_projects"."status" IN ('completed', 'in_progress')),
	CONSTRAINT "visibility_check" CHECK("__new_projects"."visibility" IN ('draft', 'published', 'archived'))
);
--> statement-breakpoint
INSERT INTO `__new_projects`("id", "slug", "title", "summary", "description", "body", "role", "scope", "status", "visibility", "duration", "team_size", "year", "github_url", "live_url", "image_url", "technologies", "outcomes", "metrics", "featured_rank", "created_at", "updated_at", "published_at") SELECT "id", "slug", "title", "summary", "description", "body", "role", "scope", "status", "visibility", "duration", "team_size", "year", "github_url", "live_url", "image_url", "technologies", "outcomes", "metrics", "featured_rank", "created_at", "updated_at", "published_at" FROM `projects`;--> statement-breakpoint
DROP TABLE `projects`;--> statement-breakpoint
ALTER TABLE `__new_projects` RENAME TO `projects`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE INDEX `visibility_idx` ON `projects` (`visibility`);--> statement-breakpoint
CREATE INDEX `featured_rank_idx` ON `projects` (`featured_rank`);