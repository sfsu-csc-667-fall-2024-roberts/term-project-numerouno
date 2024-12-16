import { MigrationBuilder } from "node-pg-migrate";
export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    pgm.createTable("game_cards", {
        id: "id",
        game_id: {
            type: "integer",
            notNull: true,
        },
        card_id: {
            type: "integer",
            notNull: true,
        },
        // for userId
        // 0 is in draw pile
        // -2 is bottom of discard and -1 is top card of discard pile
        user_id: {
            type: "integer",
            notNull: true,
        },
        position: {
            type: "uuid",
            notNull: true,
        },
    });
}
export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("game_cards");
}