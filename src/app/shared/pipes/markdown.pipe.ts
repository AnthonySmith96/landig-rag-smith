import { Pipe, PipeTransform, inject, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string | undefined | null): SafeHtml {
    if (!value) return '';

    let html = value;

    // Sanitize first to prevent XSS before we add our own HTML
    html = this.sanitizer.sanitize(SecurityContext.HTML, html) || '';

    // Convert code blocks (simplified)
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="md-pre"><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code class="md-code">$1</code>');

    // Convert bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');

    // Convert unordered lists (basic)
    // Matches lines starting with - or * followed by a space
    html = html.replace(/^[\s]*[-*]\s+(.*)$/gim, '<li>$1</li>');
    // Wrap consecutive <li> into <ul>
    html = html.replace(/(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/gim, '<ul>$1</ul>');

    // Convert ordered lists
    html = html.replace(/^[\s]*\d+\.\s+(.*)$/gim, '<li class="ol-item">$1</li>');
    html = html.replace(/(<li class="ol-item">.*<\/li>(?:\n<li class="ol-item">.*<\/li>)*)/gim, '<ol>$1</ol>');

    // Convert paragraphs / newlines (only for text not already inside block elements)
    // A simple approach is to convert \n\n to <br><br>
    html = html.replace(/\n\n/g, '<br><br>');
    // And single newlines to <br> if they aren't part of a list
    // (This is tricky with regex, so we'll just allow basic <br> replacements except near block tags)
    html = html.replace(/<\/ul>\n/g, '</ul>');
    html = html.replace(/<\/ol>\n/g, '</ol>');
    html = html.replace(/\n/g, '<br>');

    // Clean up br tags inside lists
    html = html.replace(/<br><\/li>/g, '</li>');
    html = html.replace(/<li><br>/g, '<li>');

    // Finally, trust the HTML we generated
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
