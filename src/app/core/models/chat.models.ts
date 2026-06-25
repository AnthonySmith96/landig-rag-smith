export interface ChatRequest {
  message: string;
  session_id?: string;
  user_id?: string;
  language?: string;
  turnstile_token: string;
}

export interface ChatPopup {
  type: 'iframe' | 'link' | 'modal';
  provider: string;
  url: string;
  title: string;
}

export interface ChatCta {
  label: string;
  href: string;
}

export interface ChatResponse {
  answer: string;
  out_of_bounds: boolean;
  confidence: number;
  suggested_reels: string[];
  suggested_projects: string[];
  popup: ChatPopup | null;
  cta: ChatCta | null;
}

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user' | 'system';
  text: string;
  createdAt: number;
  outOfBounds?: boolean;
  cta?: { label: string; href: string };
}

export interface ChatHistoryItem {
  id: string;
  user_message: string;
  assistant_response: string;
  out_of_bounds: boolean;
  created_at: number;
}

export interface ChatHistoryResponse {
  items: ChatHistoryItem[];
  next_offset: number | null;
}
