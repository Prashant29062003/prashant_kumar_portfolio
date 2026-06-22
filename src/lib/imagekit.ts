import crypto from "crypto";
import ImageKit from "@imagekit/nodejs";
import { env } from "@/lib/env";

export const ik = new ImageKit({
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
});

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

export const UploadFolders = {
  PROJECTS: "portfolio/projects",
} as const;

const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

export type TransformPreset = {
  width?: number;
  height?: number;
  quality?: number;
  aspectRatio?: string;
};

export const ImagePresets = {
  hero: {
    width: 1200,
    quality: 85,
    aspectRatio: "2:1",
  } satisfies TransformPreset,
  card: { width: 600, height: 400, quality: 75 } satisfies TransformPreset,
  admin: { width: 200, height: 133, quality: 60 } satisfies TransformPreset,
} as const;

export function buildProjectImageFolder(slug: string, projectId: string) {
  return `${UploadFolders.PROJECTS}/${slug}-${projectId.slice(0, 8)}`;
}

export async function uploadImage(file: File, folder: string) {
  if (
    !ALLOWED_IMAGE_TYPES.includes(
      file.type as (typeof ALLOWED_IMAGE_TYPES)[number]
    )
  ) {
    throw new Error(`Unsupported image type: ${file.type}`);
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(
      `Image too large. Maximum size is ${MAX_IMAGE_SIZE / 1024 / 1024}MB.`
    );
  }

  const ext = MIME_EXTENSIONS[file.type] ?? ".jpg";
  const fileName = `${crypto.randomUUID()}${ext}`;

  const response = await ik.files.upload({
    file,
    fileName,
    folder,
    useUniqueFileName: false,
  });

  return {
    fileId: response.fileId!,
    url: response.url!,
    filePath: response.filePath!,
  };
}

export async function deleteImage(fileId: string) {
  try {
    await ik.files.delete(fileId);
  } catch (error) {
    console.error(`Failed to delete ImageKit file ${fileId}:`, error);
  }
}

export function transformImage(src: string, preset: TransformPreset) {
  const transformation: Record<string, string | number | boolean> = {};

  if (preset.width) transformation.width = preset.width;
  if (preset.height) transformation.height = preset.height;
  if (preset.quality) transformation.quality = preset.quality;
  if (preset.aspectRatio) transformation.aspectRatio = preset.aspectRatio;

  return ik.helper.buildSrc({
    src,
    urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
    transformation: [transformation],
  });
}
