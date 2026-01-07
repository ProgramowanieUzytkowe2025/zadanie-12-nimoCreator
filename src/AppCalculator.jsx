import './css/AppCalculator.css';
import { useState, useEffect, useRef, useReducer } from 'react';
import { statusReducer, initialStatus } from './reducers/calcReducer.js';
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';
import { useKalkulator } from './hooks/useKalkulator';

export function AppCalculator() {
    const [liczbaA, setLiczbaA] = useState(0);
    const [liczbaB, setLiczbaB] = useState(0);
    const [wynik, setWynik] = useState(null);
    const [historia, setHistoria] = useState([]);
    const [porownanie, setPorownanie] = useState('');
    const czyZainicjalizowano = useRef(false);
    const [lastCalc, dispatch] = useReducer(statusReducer, initialStatus);

    const { dodaj, odejmij, pomnoz, podziel } = useKalkulator({
        liczbaA,
        liczbaB,
        historia,
        setHistoria,
        setWynik,
        dispatch
    });


    function liczbaAOnChange(value) {
        setLiczbaA(parsujLiczbe(value));
        dispatch({ type: 'zmianaA' });
    }

    function parsujLiczbe(value) {
        const sparsowanaLiczba = parseFloat(value);
        if(isNaN(sparsowanaLiczba)) {
            return null;
        } else {
            return sparsowanaLiczba;
        } 
    }

    function liczbaBOnChange(value) {
        setLiczbaB(parsujLiczbe(value));
        dispatch({ type: 'zmianaB' });
    }

    function onAppCalculationHistoryClick(index) {
        const nowaHistoria = historia.slice(0, index + 1);
        setHistoria(nowaHistoria);
        setLiczbaA(historia[index].a);
        setLiczbaB(historia[index].b);
        setWynik(historia[index].wynik);
        dispatch({ type: 'przywracanie' });
    }

    let zablokujPrzyciski = liczbaA == null || liczbaB == null;
    let zablokujDzielenie = zablokujPrzyciski || liczbaB === 0;

    useEffect(() => {
        if (liczbaA == null || liczbaB == null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPorownanie('');
        } else if (liczbaA === liczbaB) {
            setPorownanie('Liczba A jest równa liczbie B.');
        } else if (liczbaA > liczbaB) {
            setPorownanie('Liczba A jest większa od liczby B.');
        } else {
            setPorownanie('Liczba B jest większa od liczby A.');
        }
    }, [liczbaA, liczbaB]);

    useEffect(() => {
        const zapisanaHistoria = sessionStorage.getItem('historia');

        if (zapisanaHistoria) {
            const historiaZSession = JSON.parse(zapisanaHistoria);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHistoria(historiaZSession);

            if (historiaZSession.length > 0) {
                const ostatni = historiaZSession[historiaZSession.length - 1];
                setLiczbaA(ostatni.a);
                setLiczbaB(ostatni.b);
                setWynik(ostatni.wynik);
            }
        }
    }, []);


        useEffect(() => {
            if (!czyZainicjalizowano.current) {
                czyZainicjalizowano.current = true;
                return;
            }

            sessionStorage.setItem('historia', JSON.stringify(historia));
        }, [historia]);





    return (
    <div className='app-calculator'>
        <div className='app-calculator-pole'>
            <label>Wynik: </label>
            <span>{wynik}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label>Dynamiczne porównanie liczb: </label>
            <span>{porownanie}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label htmlFor="liczba1">Liczba 1</label>
            <input id="liczba1" type="number" value={liczbaA} onChange={(e) => liczbaAOnChange(e.target.value)} name="liczba1" />
        </div>
        <div className='app-calculator-pole'>
            <label htmlFor="liczba2">Liczba 2</label>
            <input id="liczba2" type="number" value={liczbaB} onChange={(e) => liczbaBOnChange(e.target.value)} name="liczba2" />
        </div>

        <hr />

        <div className='app-calculator-przyciski'>
            <AppButton disabled={zablokujPrzyciski} title="+" onClick={() => dodaj()}/>
            <AppButton disabled={zablokujPrzyciski} title="-" onClick={() => odejmij()}/>
            <AppButton disabled={zablokujPrzyciski} title="*" onClick={() => pomnoz()}/>
            <AppButton disabled={zablokujDzielenie} title="/" onClick={() => podziel()}/>
        </div>
        
        <hr />

        <div className='app-calculator-pole'>
            <label>Ostatnia czynność: </label>
            <span>{lastCalc}</span>
        </div>

        <hr />
        
        <div className='app-calculator-historia'>
            <AppCalculationHistory historia={historia} onClick={(index) => onAppCalculationHistoryClick(index)}/>
        </div>
    </div>)
}