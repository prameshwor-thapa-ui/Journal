// Quill Editor Bridge for Journal App
window.quillEditor = {
    editor: null,
    dotNetRef: null,

    // Initialize the Quill editor
    initialize: function(elementId, dotNetReference, initialContent) {
        this.dotNetRef = dotNetReference;
        
        const container = document.getElementById(elementId);
        if (!container) {
            console.error('Quill container not found:', elementId);
            return false;
        }

        // Initialize Quill
        this.editor = new Quill('#' + elementId, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['blockquote', 'code-block'],
                    [{ 'color': [] }, { 'background': [] }],
                    ['link'],
                    ['clean']
                ]
            },
            placeholder: 'Write your thoughts here...'
        });

        // Set initial content if provided
        if (initialContent) {
            this.editor.root.innerHTML = initialContent;
        }

        // Listen for text changes and notify Blazor
        this.editor.on('text-change', () => {
            if (this.dotNetRef) {
                const html = this.editor.root.innerHTML;
                this.dotNetRef.invokeMethodAsync('OnContentChanged', html);
            }
        });

        console.log('Quill editor initialized');
        return true;
    },

    // Get current HTML content
    getContent: function() {
        return this.editor ? this.editor.root.innerHTML : '';
    },

    // Set content programmatically
    setContent: function(html) {
        if (this.editor) {
            this.editor.root.innerHTML = html || '';
        }
    },

    // Clear the editor
    clear: function() {
        if (this.editor) {
            this.editor.setText('');
        }
    },

    // Destroy the editor instance
    destroy: function() {
        if (this.editor) {
            this.editor = null;
        }
        this.dotNetRef = null;
    }
};

// Preview functionality (for viewing saved entries)
window.markdownPreview = {
    updatePreview: function(html) {
        const preview = document.getElementById('markdown-preview');
        if (!preview) {
            console.error('Preview element not found');
            return;
        }
        
        if (!html || html.trim() === '' || html === '<p><br></p>') {
            preview.innerHTML = '<p class="text-muted text-center py-5">Preview will appear here...</p>';
            return;
        }
        
        // Render HTML content directly
        preview.innerHTML = '<div class="p-4" style="line-height: 1.6;">' + html + '</div>';
    }
};