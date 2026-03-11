const FALLBACK_VALUE = "--";

export function formatNullableText(value: string | number | null | undefined, fallback = FALLBACK_VALUE): string {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : fallback;
  }

  return String(value);
}

export function formatShotTime(shotTime: string | null | undefined, locale = "zh-CN"): string {
  if (!shotTime) {
    return FALLBACK_VALUE;
  }

  const date = new Date(shotTime);

  if (Number.isNaN(date.getTime())) {
    return FALLBACK_VALUE;
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatAperture(aperture: string | null | undefined): string {
  return formatNullableText(aperture, "f/--");
}

export function formatShutterSpeed(shutterSpeed: string | null | undefined): string {
  return formatNullableText(shutterSpeed, "--");
}

export function formatIso(iso: number | null | undefined): string {
  if (typeof iso === "number" && Number.isFinite(iso)) {
    return `ISO ${iso}`;
  }

  return "ISO --";
}
