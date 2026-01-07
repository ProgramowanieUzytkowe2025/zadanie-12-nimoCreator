export const initialStatus = 'Brak';

export function statusReducer(state, action) {
    switch (action.type) {
        case 'zmianaA':
            return 'Zmodyfikowano wartość liczby A';
        case 'zmianaB':
            return 'Zmodyfikowano wartość liczby B';
        case 'obliczenia':
            return 'Wykonano obliczenia';
        case 'przywracanie':
            return 'Przywrócono historyczny stan';
        default:
            return state;
    }
}
