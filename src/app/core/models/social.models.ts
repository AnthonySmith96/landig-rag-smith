export interface SocialProtocol {
  id: string;
  title: string;
  handle: string;
  url: string;
  icon: string;
  cardStyle: 'youtube' | 'github' | 'linkedin' | 'x' | 'standard';
  badge?: string;
  priority: number;
}
