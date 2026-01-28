using System;

namespace NewJornalApp.Models
{
    public class SecondaryMood
    {
        public int Id { get; set; }
        public int JournalId { get; set; }
        public string PrimaryMood { get; set; } = string.Empty; // "Happy", "Neutral", "Sad"
        public string SecondaryMoodName { get; set; } = string.Empty;
        
        // Navigation property
        public Journal? Journal { get; set; }
    }
}
