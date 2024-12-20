import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumn("games", {
        turn_order: {
            type: "boolean",
            notNull: true,
            default: true,
        },
    });
}


export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropColumn("games", "turn_order");
}
