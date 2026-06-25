import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ChatRequest, ChatResponse, ChatHistoryResponse } from '../models/chat.models';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);

  async getHistory(userId: string, offset: number, limit = 20): Promise<ChatHistoryResponse> {
    const baseUrl = environment.pocketBaseUrl || '';
    const params = new URLSearchParams({
      user_id: userId,
      offset: offset.toString(),
      limit: limit.toString()
    });
    return firstValueFrom(this.http.get<ChatHistoryResponse>(`${baseUrl}/api/custom/chat/history?${params.toString()}`));
  }

  sendMessage(message: string, sessionId: string, userId: string, turnstileToken: string, language?: string): Promise<ChatResponse> {
    const body: ChatRequest = {
      message,
      session_id: sessionId,
      user_id: userId,
      language,
      turnstile_token: turnstileToken
    };

    const baseUrl = environment.pocketBaseUrl || '';
    return firstValueFrom(this.http.post<ChatResponse>(`${baseUrl}/api/custom/chat`, body));
  }
}
