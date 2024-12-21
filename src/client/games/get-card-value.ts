export const getCardValue = (value: number): string => {
    // add rest of card values
    switch (value) {
        case 10:
            return "rev -><-";
        case 11:
            return "skip";
        case 12:
            return "+2";
        case 13:
            return "wild";
        case 14:
            return "wild +4"
        default:
            return value.toString();
    }
};
