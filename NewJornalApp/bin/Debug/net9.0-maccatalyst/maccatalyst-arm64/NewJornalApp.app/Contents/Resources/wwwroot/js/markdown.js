// Markdown Preview functionality for Journal App
window.markdownPreview = {
    updatePreview: function(markdown) {
        const preview = document.getElementById('markdown-preview');
        if (!preview) {
            console.error('Preview element not found');
            return;
        }
        
        // If no content, show placeholder
        if (!markdown || markdown.trim() === '') {
            preview.innerHTML = '<p class="text-muted text-center py-5">Preview will appear here...</p>';
            return;
        }
        
        // Simple markdown parser
        let html = markdown
            // Escape HTML first
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            
            // Headers (must have space after #)
            .replace(/^### (.+)$/gim, '<h3>$1</h3>')
            .replace(/^## (.+)$/gim, '<h2>$1</h2>')
            .replace(/^# (.+)$/gim, '<h1>$1</h1>')
            
            // Bold
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            
            // Italic
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            
            // Blockquotes
            .replace(/^&gt; (.+)$/gim, '<blockquote class="border-start border-3 ps-3 my-2">$1</blockquote>')
            
            // Unordered lists
            .replace(/^- (.+)$/gim, '<li>$1</li>')
            
            // Line breaks
            .replace(/\n/g, '<br>');
        
        // Wrap consecutive list items in <ul>
        html = html.replace(/(<li>.*?<\/li>(<br>)?)+/g, function(match) {
            return '<ul class="my-2">' + match.replace(/<br>/g, '') + '</ul>';
        });
        
        // Wrap in container with padding
        preview.innerHTML = '<div class="p-4" style="line-height: 1.6;">' + html + '</div>';
    }
};

// Optional: Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Markdown preview ready');
});