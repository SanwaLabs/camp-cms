function extractYouTubeId(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /\/embed\/([a-zA-Z0-9_-]{11})/,
    /\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return undefined;
}

export function getYouTubeWalkthroughId(): string | undefined {
  const raw =
    process.env.YOUTUBE_WALKTHROUGH_ID ??
    process.env.NEXT_PUBLIC_YOUTUBE_WALKTHROUGH_ID;

  if (!raw) return undefined;

  return extractYouTubeId(raw);
}
