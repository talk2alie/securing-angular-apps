using Microsoft.EntityFrameworkCore.Migrations;

namespace SecuringAngularApps.STS.Migrations
{
    public partial class AddDefaultUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "fc5a2d97-4182-4e82-aaa5-d54a86366270", 0, "3a01538f-0dc7-4852-bc13-af0651b5c345", "alice@company.com", true, false, null, null, null, "5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8", null, false, "58a05ff7-2110-4f1b-a987-2098b2721acf", false, "alice" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fc5a2d97-4182-4e82-aaa5-d54a86366270");
        }
    }
}
