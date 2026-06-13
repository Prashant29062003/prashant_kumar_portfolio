# Migrations

## 2026-06-13: `featuredRank` → `isFeatured`

Simplified featured project system. Replaced the ranking-based featured model with a boolean flag. The admin workflow now manages a single featured project through the `toggleFeatured` action.

### Changes

| Layer          | Change                                                                             |
| -------------- | ---------------------------------------------------------------------------------- |
| DB schema      | Removed `featured_rank`, added `is_featured` boolean column (default false)        |
| Zod schema     | Removed `featuredRank` field — featured status is admin metadata, not content data |
| Content query  | Replaced `featuredRank` filtering/order with `isFeatured = true` query             |
| Server actions | Removed `featuredRank` CRUD handling, added `toggleFeatured(id)` action            |
| Admin form     | Removed manual featured rank input, publish state handling updated                 |
| Admin list     | Added Featured column with `FeaturedButton` star toggle                            |
| Seed script    | Replaced `featuredRank` values with `isFeatured` boolean                           |

### Key Design

- Featured state is a simple boolean instead of a ranking system.
- Admin controls featured status through the star toggle.
- `toggleFeatured()` clears the previous featured project before assigning a new one.
- `isFeatured` is intentionally excluded from `ProjectSchema` because it is admin/system metadata.
- Public content types remain unchanged.
- `FeaturedProject` and `ProjectsGrid` continue using the content layer abstraction; only the query implementation changed.
