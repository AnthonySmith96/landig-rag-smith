import { Injectable } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';

import { environment } from '../../../environments/environment';
import { PortfolioProject } from '../models/portfolio.models';
import { Reel } from '../models/reels.models';
import { SocialProtocol } from '../models/social.models';

@Injectable({ providedIn: 'root' })
export class PocketBaseService {
  private readonly client = new PocketBase(environment.pocketBaseUrl || window.location.origin);

  constructor() {
    this.client.autoCancellation(false);
  }

  async getActiveProjects(): Promise<PortfolioProject[]> {
    const records = await this.client.collection('portfolio').getFullList<RecordModel>({
      filter: 'is_active = true',
      sort: '-updated'
    });

    return records.map((record) => ({
      id: record.id,
      slug: String(record['slug'] ?? ''),
      project_name: String(record['project_name'] ?? ''),
      one_liner: asOptionalString(record['one_liner']),
      description: asOptionalString(record['description']),
      impact: asOptionalString(record['impact']),
      tech_stack: asStringArray(record['tech_stack']),
      role: asOptionalString(record['role']),
      url: asOptionalString(record['url']),
      repo_url: asOptionalString(record['repo_url']),
      image: record['image'] ? this.client.files.getURL(record, String(record['image'])) : undefined,
      tags: asStringArray(record['tags']),
      keywords: asStringArray(record['keywords'])
    }));
  }

  async getActiveReels(): Promise<Reel[]> {
    const records = await this.client.collection('reels').getFullList<RecordModel>({
      filter: 'is_active = true',
      sort: '-published_at'
    });

    return records.map((record) => ({
      id: record.id,
      slug: String(record['slug'] ?? ''),
      title: String(record['title'] ?? ''),
      description: asOptionalString(record['description']),
      transcript: asOptionalString(record['transcript']),
      urls: asUrlMap(record['urls']),
      platforms: asStringArray(record['platforms']),
      tags: asStringArray(record['tags']),
      keywords: asStringArray(record['keywords']),
      published_at: asOptionalString(record['published_at'])
    }));
  }

  async getLegalDocument(key: string): Promise<{ title: string; content: string } | null> {
    try {
      const record = await this.client.collection('legal_documents').getFirstListItem(`key = "${key}" && is_active = true`);
      return {
        title: String(record['title'] ?? ''),
        content: String(record['content'] ?? '')
      };
    } catch {
      return null;
    }
  }

  async getSocialProtocols(): Promise<SocialProtocol[]> {
    const records = await this.client.collection('social_protocols').getFullList<RecordModel>({
      filter: 'is_active = true',
      sort: 'priority'
    });

    return records.map((record) => ({
      id: record.id,
      title: String(record['title'] ?? ''),
      handle: String(record['handle'] ?? ''),
      url: String(record['url'] ?? ''),
      icon: String(record['icon'] ?? ''),
      cardStyle: record['card_style'] as 'youtube' | 'github' | 'linkedin' | 'x' | 'standard',
      badge: asOptionalString(record['badge']),
      priority: Number(record['priority'] ?? 0)
    }));
  }
}

function asOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const values = value.filter((item): item is string => typeof item === 'string');
  return values.length > 0 ? values : undefined;
}

function asUrlMap(value: unknown): Record<string, string> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  const output: Record<string, string> = {};
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === 'string') {
      output[key] = item;
    }
  }

  return Object.keys(output).length > 0 ? output : undefined;
}
