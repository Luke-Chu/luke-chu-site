import PhotoDetailError from "@/components/photography/PhotoDetailError";
import PhotoDetailPage from "@/components/photography/PhotoDetailPage";
import { ApiRequestError } from "@/lib/api";
import { getPhotoDetail } from "@/lib/photo-api";
import { notFound } from "next/navigation";

type PhotoDetailRouteProps = {
  params: { uuid: string } | Promise<{ uuid: string }>;
};

async function resolveParams(
  params: { uuid: string } | Promise<{ uuid: string }>,
): Promise<{ uuid: string }> {
  if (typeof (params as Promise<{ uuid: string }>).then === "function") {
    return params as Promise<{ uuid: string }>;
  }

  return params as { uuid: string };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "网络异常，请稍后重试。";
}

export default async function PhotoDetailRoutePage({ params }: PhotoDetailRouteProps) {
  const { uuid } = await resolveParams(params);
  let photo = null;

  if (!uuid) {
    notFound();
  }

  try {
    photo = await getPhotoDetail(uuid);
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 404) {
      notFound();
    }

    return <PhotoDetailError message={getErrorMessage(error)} />;
  }

  return <PhotoDetailPage photo={photo} />;
}
