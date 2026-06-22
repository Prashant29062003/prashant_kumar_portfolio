# ImageKit Integration — Execution Plan

**Status**: Locked · **Rating**: 10/10  
**Architecture**: Server-side upload inside Server Actions, no API routes, no temp storage

---

## Phase 1 — Infrastructure

### 1.1 Environment (`src/lib/env.ts`)

Add after `ADMIN_SESSION_SECRET`:

```ts
IMAGEKIT_PUBLIC_KEY: z.string().min(1),
IMAGEKIT_PRIVATE_KEY: z.string().min(1),
IMAGEKIT_URL_ENDPOINT: z.string().url(),
```

### 1.2 `.env.local`

```
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<your-id>
```

### 1.3 `src/lib/imagekit.ts`

Singleton module — all ImageKit concerns live here. No ImageKit details leak outside.

| Export                                     | Purpose                                                                                                                                                                                                                                                     |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `uploadImage(file, folder)`                | Validate MIME + size (defense-in-depth), `crypto.randomUUID()` filename + MIME-to-extension, `client.files.upload()`, return `{ fileId, url }`. **No custom timeout** — relies on platform request timeout + existing rollback logic for orphan protection. |
| `deleteImage(fileId)`                      | Non-blocking — wraps errors with `console.error`, never throws                                                                                                                                                                                              |
| `transformImage(src, preset)`              | Uses ImageKit SDK URL builder. Converts typed `TransformPreset` → `tr` format.                                                                                                                                                                              |
| `ImagePresets`                             | Typed presets: `hero` (w:1200, q:85, ar:"2:1"), `card` (w:600, h:400, q:75), `admin` (w:200, h:133, q:60)                                                                                                                                                   |
| `UploadFolders`                            | `PROJECTS = "portfolio/projects"`                                                                                                                                                                                                                           |
| `buildProjectImageFolder(slug, projectId)` | Returns `portfolio/projects/{slug}-{projectId.slice(0, 8)}`                                                                                                                                                                                                 |
| `MAX_IMAGE_SIZE`                           | `5 * 1024 * 1024`                                                                                                                                                                                                                                           |
| `ALLOWED_IMAGE_TYPES`                      | `["image/jpeg", "image/png", "image/webp", "image/avif"]` (no GIF)                                                                                                                                                                                          |

```ts
type TransformPreset = {
  width?: number;
  height?: number;
  quality?: number;
  aspectRatio?: string;
};
```

Validation constants are the single source of truth — imported by both client `ImageUpload` and server `uploadImage()`.

---

## Phase 2 — Database

### 2.1 Drizzle schema (`src/lib/db/schema.ts`)

Add after `imageUrl: text("image_url")`:

```ts
imageFileId: text("image_file_id"),
```

### 2.2 Migration

```bash
pnpm db:generate
pnpm db:push
```

### 2.3 Zod schema (`src/lib/content/schema.ts`)

Add after `imageUrl: z.string().nullable()`:

```ts
imageFileId: z.string().nullable(),
```

### 2.4 Content adapter (`src/lib/content/projects.ts`)

Add to `toProject()` after `imageUrl: row.imageUrl ?? null`:

```ts
imageFileId: row.imageFileId ?? null,
```

`toAdminProject()` auto-inherits via `...toProject(row)`.

---

## Phase 3 — ImageUpload Component

**Create** `src/components/admin/ImageUpload.tsx` — Client-only UI component.

| Aspect     | Detail                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| Props      | `currentImageUrl?: string \| null`, `onChange(file: File \| null, removed: boolean)`                   |
| Input      | Hidden `<input type="file" accept={ALLOWED_IMAGE_TYPES.join(",")} name="image">` — native multipart    |
| Preview    | `next/image` with `fill`. Shows new file via `URL.createObjectURL()` or existing via `currentImageUrl` |
| Validation | Client-side: `ALLOWED_IMAGE_TYPES.includes(file.type)` + `file.size <= MAX_IMAGE_SIZE`                 |
| Cleanup    | `useEffect` return calls `URL.revokeObjectURL()`                                                       |
| Remove     | Button to clear — calls `onChange(null, true)`, parent sets hidden `imageRemoved` input                |
| Uploads    | **Never** — no fetch, no server action, no API route                                                   |

---

## Phase 4 — Server Actions

**File:** `src/app/actions/projects.ts`

### 4.1 Helper: `resolveProjectImage()`

```ts
type ResolvedImage = {
  imageUrl: string | null;
  imageFileId: string | null;
  previousFileIdToDelete: string | null;
  newlyUploadedFileId: string | null;
};
```

Single entry point — handles all 4 cases:

| Form input           | Result                                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| New file uploaded    | Upload to `buildProjectImageFolder(slug, projectId)`, return new url + fileId, mark old fileId for cleanup |
| `imageRemoved = "1"` | Both fields → null, mark old fileId for cleanup                                                            |
| Nothing changed      | Return existing values, no cleanup                                                                         |

### 4.2 `imageRemoved` stays outside `formDataToProject()`

`formDataToProject()` remains a pure domain mapper. Transport concerns (`image` File, `imageRemoved`) are extracted in the server action before calling it:

```ts
const image = formData.get("image") as File | null;
const imageRemoved = formData.get("imageRemoved") === "1";
const data = formDataToProject(formData);
```

### 4.3 `createProject()`

```
Validate form → Generate id → Build folder → Upload image → Insert DB → revalidateTag → redirect
```

Rollback on DB failure: `void deleteImage(newlyUploadedFileId)`.

### 4.4 `updateProject()`

```
Validate form → Load existing → Build folder → Resolve image → Update DB → Delete previous → revalidateTag → redirect
```

Rollback on DB failure: `void deleteImage(newlyUploadedFileId)`.
Delete previous image **only after** DB write succeeds.

### 4.5 `deleteProject()`

```
SELECT imageFileId → DELETE row → void deleteImage(fileId) → revalidateTag → redirect
```

---

## Phase 5 — ProjectForm Integration

**Edit** `src/components/admin/ProjectForm.tsx`:

- Replace `<Input name="imageUrl">` (lines 220-229) with `<ImageUpload>`
- Add `imageRemoved` hidden input (set by ImageUpload on remove)
- Do **not** put `File` into `formDataToProject()` or `ProjectSchema`
- Do **not** intercept FormData — browser sends file natively via `multipart/form-data`

---

## Phase 6 — Public Rendering

**Edit** `src/components/sections/FeaturedProject.tsx`:

```tsx
import { transformImage, ImagePresets } from "@/lib/imagekit";

src={featured.imageUrl ? transformImage(featured.imageUrl, ImagePresets.hero) : ""}
```

Future project cards should use `ImagePresets.card`.

---

## Phase 7 — Verification

```bash
pnpm build
npx eslint .
```

Manual QA:

| Scenario                    | Expected                                                                    |
| --------------------------- | --------------------------------------------------------------------------- |
| Create with image           | DB has `imageUrl` + `imageFileId`. FeaturedProject shows transformed image. |
| Create without image        | Both fields null. Fallback gradient shown.                                  |
| Edit — no image change      | Existing image preserved. No ImageKit API calls.                            |
| Edit — replace image        | Old ImageKit file deleted. New file uploaded. DB updated.                   |
| Edit — remove image         | DB fields null. Old ImageKit file deleted.                                  |
| Delete project              | Row deleted. ImageKit file cleaned up. No orphan.                           |
| Validation failure (client) | Image never processed. No orphan.                                           |
| Validation failure (server) | Image uploaded, then deleted via rollback. No orphan.                       |

---

## Commit Strategy

1. `feat(imagekit): infrastructure` — `env.ts`, `lib/imagekit.ts`
2. `feat(imagekit): database and domain` — column, migration, Zod, adapter
3. `feat(imagekit): image upload component` — `ImageUpload.tsx`
4. `feat(imagekit): server action integration` — `resolveProjectImage()`, updated create/update/delete, `imageRemoved` handling
5. `feat(imagekit): public rendering` — `FeaturedProject.tsx` transformations
6. `chore(imagekit): verification` — build, lint, manual QA

---

## Key Rules

- No local temp folder
- No API route for uploads
- No separate upload server action
- No upload before form submit
- No `File` in Zod or domain schema
- `imageUrl` + `imageFileId` both stored
- Delete old image **after** DB commit
- Roll back **newly uploaded** image if DB fails
- `deleteImage()` wraps errors — never throws
- MIME + size validated on both client and server (via shared constants)
- `crypto.randomUUID()` for filenames (not original filename)
- `next/image` everywhere (client + server components)
- Cache revalidation unchanged
- ImageKit details stay in `lib/imagekit.ts` — server actions only call exported helpers
- Folder naming uses shared `buildProjectImageFolder(slug, projectId)` — `portfolio/projects/{slug}-{shortId}`
- No custom upload timeout — platform request timeout + rollback are sufficient
- `imageRemoved` extracted in server action, not inside `formDataToProject()`
- `transformImage()` accepts typed `TransformPreset` objects, converts to ImageKit SDK format internally
