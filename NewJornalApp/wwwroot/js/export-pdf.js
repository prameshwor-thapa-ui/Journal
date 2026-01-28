window.pdfExport = {
  exportJournals: (journals, title) => {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      let yPosition = 20;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      const maxWidth = 170;

      // Title
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.text(title || 'My Journal Export', margin, yPosition);
      yPosition += 15;

      // Export date
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(128, 128, 128);
      doc.text(`Exported on: ${new Date().toLocaleDateString()}`, margin, yPosition);
      yPosition += 15;

      doc.setTextColor(0, 0, 0);

      // Journals
      journals.forEach((journal, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 20;
        }

        // Entry separator
        if (index > 0) {
          doc.setDrawColor(200, 200, 200);
          doc.line(margin, yPosition, margin + maxWidth, yPosition);
          yPosition += 10;
        }

        // Title
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        const titleLines = doc.splitTextToSize(journal.title || 'Untitled', maxWidth);
        doc.text(titleLines, margin, yPosition);
        yPosition += titleLines.length * 7;

        // Date and mood
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(100, 100, 100);
        const dateStr = new Date(journal.date).toLocaleDateString();
        const moodStr = journal.emoji ? ` ${journal.emoji}` : '';
        doc.text(`${dateStr}${moodStr}`, margin, yPosition);
        yPosition += 8;

        // Tags
        if (journal.tags) {
          doc.setTextColor(66, 103, 178);
          doc.text(`Tags: ${journal.tags}`, margin, yPosition);
          yPosition += 8;
        }

        doc.setTextColor(0, 0, 0);

        // Content
        doc.setFontSize(11);
        const contentLines = doc.splitTextToSize(journal.content || '', maxWidth);

        contentLines.forEach(line => {
          if (yPosition > pageHeight - 20) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, margin, yPosition);
          yPosition += 6;
        });

        yPosition += 10;
      });

      // Return PDF as base64 string and filename
      const pdfBase64 = doc.output('datauristring');
      const filename = `journal_export_${new Date().getTime()}.pdf`;

      return {
        success: true,
        pdfData: pdfBase64,
        filename: filename
      };
    } catch (error) {
      console.error('PDF generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};
