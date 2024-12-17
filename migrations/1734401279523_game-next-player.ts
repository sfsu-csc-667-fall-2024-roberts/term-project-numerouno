import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumn("games", {
        next_seat: {
            type: "integer",
            notNull: true,
            default: 2,
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropColumn("games", "next_seat");
}
