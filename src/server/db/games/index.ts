
import db from "../connection";
import { ADD_PLAYER, ALL_PLAYER_DATA, AVAILABLE_CARDS_FOR_GAME, AVAILABLE_GAMES, CREATE_GAME, DEAL_CARDS, END_TURN, GET_GAME_PLAYERS, GET_NEXT_PLAYER, GET_PLAYER_CARDS, GET_PLAYER_COUNT, GET_TOP_CARD, INSERT_INITIAL_CARDS, IS_CURRENT, LOOKUP_CARD, SET_NEXT_SEAT, SET_TOP_CARD, SHUFFLE_DISCARD_PILE } from "./sql";

type GameDescription = {
    id: number;
    players: number;
    player_count: number;
};


const create = async (playerId: number): Promise<GameDescription> => {
    const game = await db.one<GameDescription>(CREATE_GAME);
    await db.any(INSERT_INITIAL_CARDS, game.id);
    await db.any(DEAL_CARDS, [-1, game.id, 1]);
    await join(playerId, game.id);

    return game;
};

const join = async (playerId: number, gameId: number) => {
    await db.any(DEAL_CARDS, [playerId, gameId, 7]);
    return await db.one<GameDescription>(ADD_PLAYER, [gameId, playerId]);
};

const availableGames = async (limit: number = 10, offset: number = 0): Promise<
    {
        id: number;
        players: number;
        currentPlayerIsMember?: boolean;
    }[]
> => {
    return db.any(AVAILABLE_GAMES, [limit, offset]);
};

const getPlayerCount = async (gameId: number) => {
    return db.one<{ count: string }>(GET_PLAYER_COUNT, gameId);
};

const drawCard = async (gameId: number, playerId: number) => {
    // const availableCards = parseInt(
    //     (await db.one<{ count: string }>(AVAILABLE_CARDS_FOR_GAME, gameId)).count,
    //     10);
    const result = await db.one<{ count: string }>(AVAILABLE_CARDS_FOR_GAME, gameId);
    const availableCards = result?.count ? parseInt(result.count, 10) : 0;
    //console.log(availableCards);
    if (availableCards === 0) {
        await db.none(SHUFFLE_DISCARD_PILE, [gameId]);
    }

    const card = db.one(DEAL_CARDS, [playerId, gameId, 1]);
    return card;
};

// user_id: -1 for top of discard pile, -2 for rest of discard pile
const playCard = async (user_id: number,
    gameId: number,
    cardId: number,) => {   // may have to change cardId to string  
    // check if the card can be played
    if (!await playable(cardId, gameId)) {
        return;
    }

    // move card to top of discard pile
    await db.one(SET_TOP_CARD, gameId, cardId as any);

    // actually use the card and any extra effect it has

    const card = await db.one(LOOKUP_CARD, cardId);
    if (card.value < 10) {  // normal cards 9-0
        endTurn(gameId);
        return;
    }
    if (card.value === 10) { // reverse
        useReverse(gameId);
        //do reverse stuff
    } else if (card.value === 11) { // skip
        useSkip(gameId);
    } else if (card.value === 12) { // draw 2
        useDrawTwo(gameId);
    } else if (card.value === 14) { // wild draw 4
        useWildDrawFour(gameId);
    }

};


const endTurn = async (gameId: number) => {
    const { current_seat, next_seat, player_count } = await db.one(`SELECT current_seat,
        next_seat, player_count from games WHERE game_id = $1`, gameId);

    let temp;
    if (next_seat > current_seat) {
        if ((next_seat + 1) > player_count) {
            temp = 0;
        } else {
            temp = next_seat + 1;
        }
    } else {
        if ((next_seat - 1) > 0) {
            temp = next_seat - 1;
        } else {
            temp = player_count;
        }
    }
    await db.none(END_TURN, [gameId, next_seat])
    await db.none(SET_NEXT_SEAT, [gameId, temp]);

}

const useWildDrawFour = async (gameId: number) => {
    const { user_id } = await db.one(GET_NEXT_PLAYER);

    // make next user draw 2
    await db.any(DEAL_CARDS, [user_id, gameId, 4]);

    // skip their turn
    useSkip(gameId);
}

const useDrawTwo = async (gameId: number) => {
    const { user_id } = await db.one(GET_NEXT_PLAYER);

    // make next user draw 2
    await db.any(DEAL_CARDS, [user_id, gameId, 2]);

    // skip their turn
    useSkip(gameId);
}

const useSkip = async (gameId: number) => {
    const { current_seat, next_seat, player_count } = await db.one(`SELECT current_seat,
        next_seat, player_count from games WHERE game_id = $1`, gameId);

    let temp;

    if (next_seat > current_seat) {
        if ((next_seat + 1) > player_count) {
            temp = 0;
        } else {
            temp = next_seat + 1;
        }
    } else {
        if ((next_seat - 1) > 0) {
            temp = next_seat - 1;
        } else {
            temp = player_count;
        }
    }
    await db.one(SET_NEXT_SEAT, gameId, temp);
    endTurn(gameId);
    return temp;
}

const useReverse = async (gameId: number) => {
    // get variables
    const { current_seat, next_seat, player_count } = await db.one(`SELECT current_seat,
        next_seat, player_count from games WHERE game_id = $1`, gameId);

    let temp;   // new next_seat

    // check which way it's going
    if (next_seat > current_seat) {
        if ((current_seat - 1) > 0) {
            temp = current_seat - 1;
        } else {
            temp = player_count;
        }
    } else {
        if ((current_seat + 1) > player_count) {
            temp = 1;
        } else {
            temp = current_seat + 1;
        }
    }

    await db.one(SET_NEXT_SEAT, gameId, temp);
    endTurn(gameId);
    return temp;
}

const getNextSeat = async (gameId: number) => {
    return await db.one(`SELECT next_seat from games WHERE game_id = $1`, gameId);
}

const playerGames = async (
    playerId: number,
): Promise<Record<number, boolean>> => {
    return (
        await db.any("SELECT game_id FROM game_users WHERE user_id=$1", playerId)
    ).reduce((memo, game) => ({ ...memo, [game.game_id]: true }), {});
};

const get = async (gameId: number, playerId: number) => {
    const currentSeat = await db.one(
        "SELECT current_seat FROM games WHERE id=$1",
        gameId,
    );
    const players = await db.any(GET_GAME_PLAYERS, gameId);
    const playerHand = await db.any(GET_PLAYER_CARDS, [playerId, gameId, 0, 8]);
    return {
        currentSeat,
        players,
        playerHand,
    };
};

const getPlayers = async (
    gameId: number,
): Promise<
    {
        gravatar: string;
        id: number;
        is_current: boolean;
        seat: number;
        username: string;
        num_cards: number;
    }[]
> => {
    return await db.any(ALL_PLAYER_DATA, [gameId]);
};

const isCurrentPlayer = async (gameId: number, userId: number) => {
    const current = await db.one(IS_CURRENT, [gameId, userId]);
    return current.is_current_player;
};

const isInGame = async (gameId: number, userId: number) => {
    // return await db.any(`SELECT user_id FROM game_users WHERE game_id = $1`, gameId);
    const players = await db.any(`SELECT user_id FROM game_users WHERE game_id = $1`, gameId);



    for (const player of players) {
        if (userId == player.user_id) {
            return true;  // This will exit the function as expected
        }
    }

    return false;
}

// returns true if card is playable
const playable = async (cardId: number, gameId: number) => {
    const card = await db.one(LOOKUP_CARD, cardId);
    const topCard = await db.one(GET_TOP_CARD, gameId);

    const { color: topColor, value: topValue } = topCard;
    const { color: cardColor, value: cardValue } = card;

    // color 4 is wild
    if (topColor === cardColor || topValue === cardValue ||
        topColor === 4 || cardColor === 4) {
        return true;
    }
    return false;
}

const playableCards = async (gameId: number, userId: number) => {
    const playerHand = await db.any(GET_PLAYER_CARDS, [userId, gameId, 0, 8]);
    let num = 0;
    for (const card of playerHand) {
        if (await playable(card.card_id, gameId)) {
            num++;
        }
    }

    return num;
};

const getPlayerHand = async (gameId: number, playerId: number) => {
    return await db.any(GET_PLAYER_CARDS, [playerId, gameId, 0]);
};

const getTopCard = async (gameId: number) => {
    return await db.one(GET_TOP_CARD, gameId);
}

const getRandomCard = async () => {
    const card = await db.one<{ id: number; color: number; value: string }>(`
        SELECT id, color, value
        FROM cards
        ORDER BY random()
        LIMIT 1
    `);

    // Number to card names (as strings)
    const cardValueMap: { [key: string]: string } = {
        "10": "Skip",
        "11": "Reverse",
        "12": "Draw Two",
        "13": "Wild",
        "14": "Wild Draw Four"
    };

    // If the value is one of the special cards (10-14), replace the numeric value with the string equivalent
    if (cardValueMap[card.value]) {
        card.value = cardValueMap[card.value];  // Replace numeric value with word
    }

    return card;
};

export default {
    create,
    join,
    availableGames,
    getPlayerCount,
    drawCard,
    playCard,
    playerGames,
    get,
    isCurrentPlayer,
    getRandomCard,
    playableCards,
    getPlayerHand,
    getPlayers,
    getTopCard,
    isInGame,
};