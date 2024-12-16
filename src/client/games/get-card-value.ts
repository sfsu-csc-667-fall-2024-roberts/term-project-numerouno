export const getCardValue = (value: number): string => {
    // add rest of card values
    switch (value) {
        case 0:
            return "Skip-Bo";
        case 10:
            return "reverse";
        default:
            return value.toString();
    }
};