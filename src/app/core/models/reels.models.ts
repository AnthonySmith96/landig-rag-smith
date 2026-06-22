export interface Reel {
  id: string;
  slug: string;
  title: string;
  description?: string;
  transcript?: string;
  urls?: Record<string, string>;
  platforms?: string[];
  tags?: string[];
  keywords?: string[];
  published_at?: string;
}
