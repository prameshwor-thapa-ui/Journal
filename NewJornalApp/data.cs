using System;
using System.Collections.Generic;

namespace NewJornalApp.Models
{
    public class Journal
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? Emoji { get; set; }
        public string? Tags { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public List<SecondaryMood> SecondaryMoods { get; set; } = new();
    }
}