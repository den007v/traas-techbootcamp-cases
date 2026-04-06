export type CaseTrack = "traas" | "tech-bootcamp";

export type ModerationStatus = "pending_review" | "needs_changes" | "published" | "unpublished";

/** Крупные цифры для витрины и шапки кейса */
export type CaseHighlightMetric = {
  label: string;
  value: string;
};

export type CaseItem = {
  id: string;
  track: CaseTrack;
  slug: string;
  title: string;
  company: string;
  topic: string;
  shortDescription: string;
  tags: string[];
  year: number;
  result: string;
  authorName?: string;
  authorRole?: string;
  challenge?: string;
  solution?: string;
  fullStory?: string;
  moderationStatus?: ModerationStatus;
  moderationComment?: string | null;
  /** Обложка карточки; если нет — подставляется тематический плейсхолдер */
  coverImageUrl?: string | null;
  highlightMetrics?: CaseHighlightMetric[];
  toolsUsed?: string[];
};
