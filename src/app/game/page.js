'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GamePage() {
    const router = useRouter();

    const [playerScore, setPlayerScore] = useState(257);
    const [opponentScore, setOpponentScore] = useState(155);
    const [currentRound, setCurrentRound] = useState(1);
    const [playerLives, setPlayerLives] = useState(1);
    const [opponentLives, setOpponentLives] = useState(1);
    const [weatherActive, setWeatherActive] = useState(null); // null, 'frost', 'fog', 'rain', 'clear'

    return (
        <div className="h-screen bg-[#1a1410] flex flex-col overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-40 bg-gradient-to-b from-amber-950/20 via-transparent to-amber-950/20"></div>

            {/* Top Bar - Compact */}
            <div className="relative z-10 flex justify-between items-center px-4 py-2 bg-black/40 border-b border-amber-900/50">
                <button
                    onClick={() => router.push('/')}
                    className="px-3 py-1.5 bg-amber-800/80 text-amber-100 text-sm rounded font-semibold hover:bg-amber-700 transition border border-amber-600"
                >
                    ← Menu
                </button>

                <div className="text-amber-400 text-base font-bold tracking-wide">
                    ROUND {currentRound} OF 3
                </div>

                <button className="px-3 py-1.5 bg-red-900/80 text-red-100 text-sm rounded font-semibold hover:bg-red-800 transition border border-red-700">
                    Forfeit
                </button>
            </div>

            {/* Main Game Area - Fills remaining screen */}
            <div className="relative flex flex-1 overflow-hidden">

                {/* ============================================
            LEFT SIDEBAR - Player/Opponent Info + Weather
        ============================================ */}
                <div className="w-64 bg-gradient-to-b from-amber-950/60 to-stone-950/60 border-r-2 border-amber-900/50 flex flex-col">

                    {/* OPPONENT INFO - Compact */}
                    <div className="p-3 border-b border-amber-900/50 flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full border-2 border-red-600 bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.4)] flex-shrink-0">
                            <div className="text-3xl">🧙</div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="text-red-400 font-bold text-sm">Opponent</div>
                            <div className="text-gray-500 text-xs truncate">Northern Realms</div>

                            {/* Life Gems - Inline */}
                            <div className="flex gap-1 mt-1">
                                <LifeGem active={opponentLives >= 1} small />
                                <LifeGem active={opponentLives >= 2} small />
                            </div>
                        </div>

                        {/* Score Circle - Compact */}
                        <div className="w-16 h-16 rounded-full border-2 border-red-600 bg-gradient-to-b from-red-950 to-black flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] flex-shrink-0">
                            <div className="text-2xl font-bold text-red-300">{opponentScore}</div>
                        </div>
                    </div>

                    {/* ============================================
              WEATHER BOX - Center
          ============================================ */}
                    <div className="flex-1 flex items-center justify-center p-4 border-b border-amber-900/50">
                        <WeatherBox weather={weatherActive} />
                    </div>

                    {/* PLAYER INFO - Compact */}
                    <div className="p-3 border-t border-amber-900/50 flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full border-2 border-blue-500 bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)] flex-shrink-0">
                            <div className="text-3xl">⚔️</div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="text-blue-400 font-bold text-sm">Geralt</div>
                            <div className="text-gray-500 text-xs truncate">Northern Realms</div>

                            {/* Life Gems - Inline */}
                            <div className="flex gap-1 mt-1">
                                <LifeGem active={playerLives >= 1} small />
                                <LifeGem active={playerLives >= 2} small />
                            </div>
                        </div>

                        {/* Score Circle - Compact */}
                        <div className="w-16 h-16 rounded-full border-2 border-blue-500 bg-gradient-to-b from-blue-950 to-black flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] flex-shrink-0">
                            <div className="text-2xl font-bold text-blue-300">{playerScore}</div>
                        </div>
                    </div>

                    {/* PASS BUTTON - Below Player Info */}
                    <div className="p-3 pt-0">
                        <HoldToPassButton />
                    </div>
                </div>

                {/* ============================================
            MAIN BOARD AREA - Battle Rows
        ============================================ */}
                <div className="flex-1 flex flex-col p-3 gap-1.5 overflow-hidden">

                    {/* ========== OPPONENT ROWS ========== */}
                    <div className="flex-1 flex flex-col gap-1.5 min-h-0">
                        <BattleRow type="siege" side="opponent" score={78} weather={weatherActive} />
                        <BattleRow type="ranged" side="opponent" score={24} weather={weatherActive} />
                        <BattleRow type="melee" side="opponent" score={53} weather={weatherActive} />
                    </div>

                    {/* ========== CENTER DIVIDER ========== */}
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent flex-shrink-0"></div>

                    {/* ========== PLAYER ROWS ========== */}
                    <div className="flex-1 flex flex-col gap-1.5 min-h-0">
                        <BattleRow type="melee" side="player" score={69} weather={weatherActive} />
                        <BattleRow type="ranged" side="player" score={168} weather={weatherActive} />
                        <BattleRow type="siege" side="player" score={20} weather={weatherActive} />
                    </div>

                    {/* ========== PLAYER HAND - Compact ========== */}
                    <div className="flex-shrink-0 bg-gradient-to-b from-stone-900/60 to-stone-950/80 border-2 border-amber-900/50 rounded-lg p-2">
                        <div className="flex gap-1.5 justify-center items-end">
                            {/* Sample cards in hand */}
                            {[4, 7, 2, 10, 8, 1, 6, 5, 3, 9].map((power, i) => (
                                <div key={i} className="cursor-pointer hover:scale-110 hover:-translate-y-2 transition-all">
                                    <HandCard power={power} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// WEATHER BOX (Center of sidebar)
// ============================================
function WeatherBox({ weather }) {
    const weatherConfigs = {
        null: { icon: '☀️', label: 'Clear Skies', color: 'text-yellow-400', bg: 'bg-gradient-to-b from-yellow-900/30 to-yellow-950/20' },
        frost: { icon: '❄️', label: 'Biting Frost', color: 'text-cyan-400', bg: 'bg-gradient-to-b from-cyan-900/50 to-cyan-950/30' },
        fog: { icon: '🌫️', label: 'Impenetrable Fog', color: 'text-gray-400', bg: 'bg-gradient-to-b from-gray-800/50 to-gray-900/30' },
        rain: { icon: '🌧️', label: 'Torrential Rain', color: 'text-blue-400', bg: 'bg-gradient-to-b from-blue-900/50 to-blue-950/30' },
        clear: { icon: '🌤️', label: 'Clear Weather', color: 'text-amber-400', bg: 'bg-gradient-to-b from-amber-900/30 to-amber-950/20' }
    };

    const config = weatherConfigs[weather] || weatherConfigs.null;

    return (
        <div className={`w-1/2 aspect-square max-w-[150px] rounded-xl border-3 border-amber-700/60 ${config.bg} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
            <div className={`text-3xl mb-2 ${weather ? 'animate-pulse' : ''}`}>
                {config.icon}
            </div>
            <div className={`text-xs font-bold text-center uppercase tracking-wider ${config.color}`}>
                {config.label}
            </div>
            {weather && (
                <div className="mt-2 text-[10px] text-gray-500 text-center">
                    {weather === 'frost' && 'Melee row to 1'}
                    {weather === 'fog' && 'Ranged row to 1'}
                    {weather === 'rain' && 'Siege row to 1'}
                </div>
            )}
        </div>
    );
}

// ============================================
// HOLD TO PASS BUTTON (2 second hold)
// ============================================
function HoldToPassButton() {
    const [holding, setHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(null);
    const progressIntervalRef = useRef(null);

    const startHold = () => {
        setHolding(true);
        setProgress(0);

        // Progress animation (every 20ms)
        progressIntervalRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + (100 / (2000 / 20)); // Reach 100% in 2000ms
            });
        }, 20);

        // Complete action after 2 seconds
        timerRef.current = setTimeout(() => {
            handlePass();
            cancelHold();
        }, 2000);
    };

    const cancelHold = () => {
        setHolding(false);
        setProgress(0);
        if (timerRef.current) clearTimeout(timerRef.current);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };

    const handlePass = () => {
        alert('You passed!');
        // Game logic will go here in Phase 3
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, []);

    return (
        <button
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={cancelHold}
            className="relative w-full py-2.5 bg-gradient-to-r from-amber-700 to-amber-600 text-white font-bold rounded border-2 border-amber-500 hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg overflow-hidden"
        >
            {/* Progress Bar */}
            <div
                className="absolute inset-0 bg-amber-400/40 transition-all duration-75"
                style={{ width: `${progress}%` }}
            />

            {/* Text */}
            <span className="relative z-10">
        {holding ? 'HOLD TO PASS...' : 'PASS'}
      </span>
        </button>
    );
}

// ============================================
// BATTLE ROW COMPONENT
// ============================================
function BattleRow({ type, side, score = 0, weather }) {
    // Determine if this row is affected by weather
    const isAffected =
        (weather === 'frost' && type === 'melee') ||
        (weather === 'fog' && type === 'ranged') ||
        (weather === 'rain' && type === 'siege');

    const configs = {
        melee: {
            icon: '⚔️',
            bg: 'bg-gradient-to-r from-red-950/40 to-red-900/30',
            bgAffected: 'bg-gradient-to-r from-cyan-950/60 to-cyan-900/40',
            border: 'border-red-800/60',
            borderAffected: 'border-cyan-600/80',
            text: 'text-red-400',
            textAffected: 'text-cyan-300'
        },
        ranged: {
            icon: '🏹',
            bg: 'bg-gradient-to-r from-green-950/40 to-green-900/30',
            bgAffected: 'bg-gradient-to-r from-gray-800/60 to-gray-700/40',
            border: 'border-green-800/60',
            borderAffected: 'border-gray-500/80',
            text: 'text-green-400',
            textAffected: 'text-gray-300'
        },
        siege: {
            icon: '🎯',
            bg: 'bg-gradient-to-r from-blue-950/40 to-blue-900/30',
            bgAffected: 'bg-gradient-to-r from-blue-900/60 to-blue-800/40',
            border: 'border-blue-800/60',
            borderAffected: 'border-blue-600/80',
            text: 'text-blue-400',
            textAffected: 'text-blue-200'
        }
    };

    const config = configs[type];
    const bgClass = isAffected ? config.bgAffected : config.bg;
    const borderClass = isAffected ? config.borderAffected : config.border;
    const textClass = isAffected ? config.textAffected : config.text;

    return (
        <div className={`relative flex-1 ${bgClass} ${borderClass} border-2 rounded-lg p-2 min-h-0 overflow-hidden`}>
            {/* Weather indicator overlay */}
            {isAffected && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-pulse"></div>
                </div>
            )}

            {/* Row Label */}
            <div className="absolute top-1 left-2 flex items-center gap-1 z-10">
                <span className="text-base">{config.icon}</span>
                <span className={`text-[10px] uppercase font-bold ${textClass}`}>
          {type}
        </span>
            </div>

            {/* Score Badge */}
            <div className="absolute top-1 right-2 z-10">
                <div className={`px-2 py-0.5 ${bgClass} ${borderClass} border rounded-full`}>
                    <span className={`text-base font-bold ${textClass}`}>{score}</span>
                </div>
            </div>

            {/* Cards Area - Scrollable horizontally if needed */}
            <div className="mt-6 flex gap-0.5 overflow-x-auto overflow-y-hidden scrollbar-hide">
                {/* Sample cards - overlapping style */}
                {side === 'opponent' && [8, 4, 2, 10, 15, 12, 6].map((power, i) => (
                    <div key={i} className="-ml-6 first:ml-0">
                        <BoardCard power={power} />
                    </div>
                ))}
                {side === 'player' && [7, 10, 20, 20, 5, 8].map((power, i) => (
                    <div key={i} className="-ml-6 first:ml-0">
                        <BoardCard power={power} />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// BOARD CARD (Cards played on board - smaller)
// ============================================
function BoardCard({ power }) {
    return (
        <div className="w-14 h-20 relative rounded-md border-2 border-amber-600 bg-gradient-to-b from-amber-900 to-amber-950 shadow-lg hover:scale-110 hover:z-10 transition-transform cursor-pointer flex-shrink-0">
            {/* Card Art Area */}
            <div className="h-12 bg-gradient-to-b from-amber-800/30 to-transparent flex items-center justify-center">
                <div className="text-xl">🗡️</div>
            </div>

            {/* Power Value */}
            <div className="absolute bottom-1 left-1 w-6 h-6 rounded-full bg-amber-600 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                <span className="text-white font-bold text-xs">{power}</span>
            </div>

            {/* Ability Icon */}
            <div className="absolute top-0.5 right-0.5 text-xs">⚡</div>
        </div>
    );
}

// ============================================
// HAND CARD (Cards in player's hand - slightly larger)
// ============================================
function HandCard({ power }) {
    return (
        <div className="w-16 h-24 relative rounded-lg border-2 border-amber-600 bg-gradient-to-b from-amber-900 to-amber-950 shadow-lg flex-shrink-0">
            {/* Card Art Area */}
            <div className="h-14 bg-gradient-to-b from-amber-800/30 to-transparent flex items-center justify-center">
                <div className="text-2xl">🗡️</div>
            </div>

            {/* Power Value */}
            <div className="absolute bottom-1 left-1 w-7 h-7 rounded-full bg-amber-600 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                <span className="text-white font-bold text-sm">{power}</span>
            </div>

            {/* Ability Icon */}
            <div className="absolute top-1 right-1 text-sm">⚡</div>
        </div>
    );
}

// ============================================
// LIFE GEM (Small version for compact layout)
// ============================================
function LifeGem({ active, small = false }) {
    const size = small ? 'w-5 h-5' : 'w-8 h-8';

    return (
        <div className={`${size} rounded-full border-2 transition-all ${
            active
                ? 'bg-gradient-to-b from-amber-400 to-amber-600 border-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                : 'bg-gray-800 border-gray-700'
        }`}>
            {active && <div className="w-full h-full rounded-full animate-pulse bg-amber-300/30"></div>}
        </div>
    );
}