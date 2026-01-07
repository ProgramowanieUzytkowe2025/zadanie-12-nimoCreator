export function useKalkulator({
    liczbaA,
    liczbaB,
    historia,
    setHistoria,
    setWynik,
    dispatch
}) {
    function aktualizujHistorie(operation, wynik) {
        const nowaHistoria = [
            ...historia,
            { a: liczbaA, b: liczbaB, operation, wynik }
        ];
        setHistoria(nowaHistoria);
        setWynik(wynik);
    }

    function dodaj() {
        aktualizujHistorie('+', liczbaA + liczbaB);
        dispatch({ type: 'obliczenia' });
    }

    function odejmij() {
        aktualizujHistorie('-', liczbaA - liczbaB);
        dispatch({ type: 'obliczenia' });
    }

    function pomnoz() {
        aktualizujHistorie('*', liczbaA * liczbaB);
        dispatch({ type: 'obliczenia' });
    }

    function podziel() {
        if (liczbaB !== 0) {
            aktualizujHistorie('/', liczbaA / liczbaB);
            dispatch({ type: 'obliczenia' });
        }
    }

    return {
        dodaj,
        odejmij,
        pomnoz,
        podziel
    };
}
