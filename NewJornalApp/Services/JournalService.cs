using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NewJornalApp.Data;
using NewJornalApp.Models;

namespace NewJornalApp.Services
{
    public class JournalService
    {
        private readonly JournalsDbContext _db;
        public JournalService(JournalsDbContext db)
        {
            _db = db;
        }

        public async Task<List<Journal>> GetAllAsync() => await _db.Journals.AsNoTracking().ToListAsync();

        public async Task<Journal> AddAsync(Journal j)
        {
            _db.Journals.Add(j);
            await _db.SaveChangesAsync();
            return j;
        }

        public async Task<List<Journal>> SearchAsync(string term)
        {
            if (string.IsNullOrWhiteSpace(term))
                return await GetAllAsync();

            term = term.Trim();

            return await _db.Journals
                .AsNoTracking()
                .Where(j => EF.Functions.Like(j.Title, $"%{term}%")
                         || EF.Functions.Like(j.Content, $"%{term}%")
                         || EF.Functions.Like(j.Emoji, $"%{term}%"))
                .OrderByDescending(j => j.Date)
                .ToListAsync();
        }

        public async Task<Journal?> GetTodayJournalAsync()
        {
            var today = DateTime.Now.Date;
            return await _db.Journals
                .Where(j => j.Date.Date == today)
                .FirstOrDefaultAsync();
        }

        public async Task<Journal> UpdateAsync(Journal j)
        {
            _db.Journals.Update(j);
            await _db.SaveChangesAsync();
            return j;
        }

        public async Task<Journal?> GetByIdAsync(int id)
        {
            return await _db.Journals
                .AsNoTracking()
                .Include(j => j.SecondaryMoods)
                .FirstOrDefaultAsync(j => j.Id == id);
        }
    }
}