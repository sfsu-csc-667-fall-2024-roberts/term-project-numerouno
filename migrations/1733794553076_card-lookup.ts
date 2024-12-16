import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    await pgm.createTable("cards", {
        id: "id",
        color: {
            type: "integer",
            notNull: true,
        },
        value: {
            type: "integer",
            notNull: true,
        },
    });

    // Color constants 
    const colors = [0, 1, 2, 3]; // 0: Red, 1: Green, 2: Blue, 3: Yellow
    // color is 4 (wild) added later

    // Card values
    const numberCards = Array.from({ length: 10 }, (_, i) => i); // 0-9 cards
    const specialCards = [10, 11, 12]; // 10: Skip, 11: Reverse, 12: Draw Two

    // Create the standard color cards (number and special)
    let allCards: any[] = [];

    // For each color, add number cards and two sets of special cards
    colors.forEach((color) => {
        // Add one '0' card for each color
        allCards.push(`(${color}, 0)`);

        // Add two of each number (1-9) and two of each special card
        numberCards.slice(1).forEach((num) => {
            allCards.push(`(${color}, ${num})`);
            allCards.push(`(${color}, ${num})`);
        });
        specialCards.forEach((special) => {
            allCards.push(`(${color}, ${special})`);
            allCards.push(`(${color}, ${special})`);
        });
    });

    // wild cards (13: Wild, 14: Wild Draw Four) - color is 4 (wild)
    const wildCards = Array(4).fill("(4, 13)").concat(
        Array(4).fill("(4, 14)")
    );

    // combine
    allCards = allCards.concat(wildCards);

    // Insert all cards into the database
    pgm.sql(`INSERT INTO cards (color, value) VALUES ${allCards.join(", ")}`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("cards");
}