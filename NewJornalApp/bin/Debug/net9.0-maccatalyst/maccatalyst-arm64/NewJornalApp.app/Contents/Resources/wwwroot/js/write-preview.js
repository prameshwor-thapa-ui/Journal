window.markdownPreview = {
  updatePreview: (markdownText) => {
    const previewElement = document.getElementById('markdown-preview');
    if (!previewElement) return;

    if (!markdownText || markdownText.trim() === '') {
      previewElement.innerHTML = '<p class="text-muted text-center py-5">Preview will appear here...</p>';
      return;
    }

    try {
      // Configure marked options
      marked.setOptions({
        breaks: true,
        gfm: true
      });

      // Pre-process: Allow headers without space (e.g., #Heading -> # Heading)
      // Matches 1-6 hashes at start of line, followed immediately by a non-space char
      const forgivingMarkdown = markdownText.replace(/^(#{1,6})([^\s#])/gm, '$1 $2');

      const html = marked.parse(forgivingMarkdown);
      previewElement.innerHTML = html;
    } catch (error) {
      previewElement.innerHTML = '<p class="text-danger">Error parsing markdown</p>';
      console.error('Markdown parsing error:', error);
    }
  }
};
