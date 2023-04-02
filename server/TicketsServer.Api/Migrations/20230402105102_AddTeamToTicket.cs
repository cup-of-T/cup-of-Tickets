using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketsServer.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddTeamToTicket : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "Tickets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_TeamId",
                table: "Tickets",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Teams_TeamId",
                table: "Tickets",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Teams_TeamId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_TeamId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Tickets");
        }
    }
}
