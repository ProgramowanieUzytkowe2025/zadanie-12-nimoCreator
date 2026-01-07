import './css/App.css';
import { AppCalculator } from './AppCalculator';
import { AppHeader } from './AppHeader';
import { FontProvider, FontContext } from './context/FontProvider';
import { useContext } from 'react';

function AppContent() {
    const { czcionka } = useContext(FontContext);

    return (
        <div className="app" style={{ fontSize: czcionka }}>
            <AppHeader imie="Sebastian" nazwisko="Legierski" />
            <AppCalculator />
        </div>
    );
}

export default function App() {
    return (
        <FontProvider>
            <AppContent />
        </FontProvider>
    );
}
