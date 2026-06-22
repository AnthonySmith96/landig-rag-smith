export interface PortfolioProject {
  id: string;
  slug: string;
  project_name: string;
  one_liner?: string;
  description?: string;
  impact?: string;
  tech_stack?: string[];
  role?: string;
  url?: string;
  repo_url?: string;
  image?: string;
  tags?: string[];
  keywords?: string[];
}
