export type CaseTrack = "traas" | "tech-bootcamp";

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
};
