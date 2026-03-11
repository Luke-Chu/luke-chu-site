import {
  formatAperture,
  formatFocalLength,
  formatIso,
  formatNullableText,
  formatResolution,
  formatShotDateTime,
  formatShutterSpeed,
  getPhotoTitle,
} from "@/lib/format";
import type { PhotoDetail } from "@/types/photo";

type PhotoMetaPanelProps = {
  photo: PhotoDetail;
};

type MetaItem = {
  label: string;
  value: string;
};

function MetaGrid({ items }: { items: MetaItem[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg bg-black/[0.02] px-3 py-2">
          <dt className="text-xs text-black/50">{item.label}</dt>
          <dd className="mt-1 text-black/80">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function PhotoMetaPanel({ photo }: PhotoMetaPanelProps) {
  const basicInfo: MetaItem[] = [
    { label: "文件名", value: formatNullableText(photo.filename) },
    { label: "拍摄时间", value: formatShotDateTime(photo.shotTime) },
    { label: "分辨率", value: formatResolution(photo.resolution, photo.width, photo.height) },
    { label: "分类", value: formatNullableText(photo.category) },
  ];

  const deviceInfo: MetaItem[] = [
    { label: "相机型号", value: formatNullableText(photo.cameraModel) },
    { label: "镜头型号", value: formatNullableText(photo.lensModel) },
  ];

  const exifInfo: MetaItem[] = [
    { label: "焦距", value: formatFocalLength(photo.focalLength) },
    { label: "等效焦距", value: formatFocalLength(photo.focalLength35mm) },
    { label: "光圈", value: formatAperture(photo.aperture) },
    { label: "快门", value: formatShutterSpeed(photo.shutterSpeed) },
    { label: "ISO", value: formatIso(photo.iso) },
    { label: "曝光补偿", value: formatNullableText(photo.exposureCompensation) },
    { label: "白平衡", value: formatNullableText(photo.whiteBalance) },
    { label: "测光模式", value: formatNullableText(photo.meteringMode) },
    { label: "曝光程序", value: formatNullableText(photo.exposureProgram) },
    { label: "闪光灯", value: formatNullableText(photo.flash) },
  ];

  return (
    <section className="space-y-5 rounded-2xl border border-black/10 bg-white p-5 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
          {getPhotoTitle(photo.titleCn, photo.titleEn)}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-black/65">
          {formatNullableText(photo.description, "暂无描述")}
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-medium text-black/75">基本信息</h2>
        <MetaGrid items={basicInfo} />
      </div>

      <div>
        <h2 className="mb-2 text-sm font-medium text-black/75">设备信息</h2>
        <MetaGrid items={deviceInfo} />
      </div>

      <div>
        <h2 className="mb-2 text-sm font-medium text-black/75">拍摄参数</h2>
        <MetaGrid items={exifInfo} />
      </div>
    </section>
  );
}
