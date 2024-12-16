export const CREATE_GAME = `
INSERT INTO games DEFAULT VALUES RETURNING *, 1 as players
`;

export const ADD_PLAYER = `
INSERT INTO game_users (game_id, user_id, seat)
VALUES ($1, $2, (SELECT COUNT(*) FROM game_users WHERE game_id = $1) + 1)
RETURNING 
  game_id AS id, 
  (SELECT COUNT(*) FROM game_users WHERE game_id = $1) AS players,
  (SELECT player_count FROM games WHERE id = $1) AS player_count
`;


export const AVAILABLE_GAMES = `
SELECT *, 
  (SELECT COUNT(*) FROM game_users WHERE games.id=game_users.game_id) AS players 
FROM games 
WHERE id IN 
  (SELECT game_id FROM game_users GROUP BY game_id HAVING COUNT(*) < 4) 
ORDER BY id DESC 
LIMIT $1 
OFFSET $2
`;

export const GET_PLAYER_COUNT = `
  SELECT COUNT(*) FROM game_users WHERE game_id = $1
`;

export const GET_USER_GAMES = `
  SELECT game_id FROM game_users WHERE user_id = $1
`;

export const INSERT_INITIAL_CARDS = `
INSERT INTO game_cards (game_id, card_id, user_id, position)
SELECT $1, id, 0, uuid_generate_v4() FROM cards
`;

export const DEAL_CARDS = `
UPDATE game_cards 
SET user_id = $1 WHERE game_id = $2 AND user_id = 0 AND position IN (
  SELECT position FROM game_cards WHERE game_id = $2 AND user_id = 0 ORDER BY position LIMIT $3
) RETURNING card_id`;

export const AVAILABLE_CARDS_FOR_GAME = `
SELECT count(*) FROM game_cards WHERE game_id = $1 AND user_id = 0
`;

export const SHUFFLE_DISCARD_PILE = `
UPDATE game_cards SET user_id = 0, position = uuid_generate_v4() WHERE user_id = -2 AND game_id = $1
`;

const PLAY_PILE_TOP_SUBQUERY = `
SELECT cards.value 
FROM game_cards, cards 
WHERE game_cards.user_id=users.id 
  AND game_cards.game_id=$1 
  AND game_cards.card_id=cards.id 
  AND pile=-1 
ORDER BY position DESC LIMIT 1
`;
const discardPileSubquery = (pile: number) => `
SELECT cards.value FROM game_cards, cards
WHERE game_cards.user_id=users.id 
  AND game_cards.game_id=$1 
  AND game_cards.card_id=cards.id 
  AND pile=${pile}
ORDER BY position DESC
`;


export const GET_GAME_PLAYERS = `
SELECT 
  users.id, 
  users.username, 
  users.gravatar,
  (SELECT games.current_seat FROM games WHERE games.id=$1) = game_users.seat AS is_player_turn,
  game_users.seat,
  (${PLAY_PILE_TOP_SUBQUERY}) AS play_pile_top,
  array(${discardPileSubquery(1)}) AS pile_1,
  array(${discardPileSubquery(2)}) AS pile_2,
  array(${discardPileSubquery(3)}) AS pile_3,
  array(${discardPileSubquery(4)}) AS pile_4
FROM users, game_users
WHERE users.id = game_users.user_id AND game_users.game_id = $1`;

export const GET_PLAYER_CARDS = `
SELECT * FROM game_cards, cards 
WHERE game_cards.user_id=$1 
  AND game_cards.game_id=$2 
  AND game_cards.card_id=cards.id 
  AND pile=$3
ORDER BY position DESC
`;

export const IS_CURRENT = `
  SELECT games.current_seat = game_users.seat AS is_current_player
    FROM games, game_users
    WHERE games.id = $1
    AND game_users.user_id = $2
    AND game_users.game_id = games.id
    `;


export const LOOKUP_CARD = `
SELECT * FROM cards WHERE id = $1;
`;

export const GET_TOP_CARD = `
SELECT * FROM cards 
WHERE id =
(SELECT card_id FROM game_cards WHERE game_id = $1 AND user_id = -1)
`;

export const SET_TOP_CARD = `
BEGIN;

-- Remove all top cards for the game 
UPDATE game_cards
SET user_id = -2
 WHERE game_id = $1 AND user_id = -1;

-- Set the new top card 
UPDATE game_cards
 SET user_id = -1
 WHERE card_id = $2 AND game_id = $1
 RETURNING *;

COMMIT;
`;


export const ALL_PLAYER_DATA = `
SELECT 
  users.id, 
  users.username, 
  users.gravatar, 
  game_users.seat,
  (
    SELECT games.current_seat = game_users.seat 
    FROM games, game_users
    WHERE games.id = $1
    AND game_users.user_id = users.id
    AND game_users.game_id = games.id
  ) AS is_current,
  (
    SELECT COUNT(*) 
    FROM game_cards 
    WHERE game_cards.user_id = users.id 
    AND game_cards.game_id = $1
  ) AS num_cards
FROM users, game_users
WHERE users.id = game_users.user_id AND game_users.game_id = $1
`;