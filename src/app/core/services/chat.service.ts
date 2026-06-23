import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ChatRequest, ChatResponse } from '../models/chat.models';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);

  sendMessage(message: string, sessionId: string, turnstileToken: string): Promise<ChatResponse> {
    const body: ChatRequest = {
      message,
      session_id: sessionId,
      turnstile_token: turnstileToken
    };

    const baseUrl = environment.pocketBaseUrl || '';
    return firstValueFrom(this.http.post<ChatResponse>(`${baseUrl}/api/custom/chat`, body));
  }
}
