export type Card = {
    id: number;
    color: number;
    value: number;
};

export type Player = {
    gravatar: string;
    hand: Card[];
    id: number;
    is_current: boolean;
    seat: number;
    username: string;
    num_cards: number;
    topCard: Card;
};

export type GameState = {
    players: Omit<Player, "hand">[];
    player: Player;
};