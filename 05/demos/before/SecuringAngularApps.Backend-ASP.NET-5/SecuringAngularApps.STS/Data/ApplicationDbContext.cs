using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SecuringAngularApps.STS.Models;
using System;

namespace SecuringAngularApps.STS.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            builder.Entity<ApplicationUser>()
                .HasData(new[]
                {
                    new ApplicationUser
                    {
                        Email = "alice@company.com",
                        Id = $"{Guid.NewGuid()}",
                        UserName = "alice",
                        EmailConfirmed = true,
                        PasswordHash = "5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8",
                        TwoFactorEnabled = false
                    }
                });
        }
    }
}
