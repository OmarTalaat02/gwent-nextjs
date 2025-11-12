'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Card from '@/components/game/Card';


export default function GamePage() {
    const router = useRouter();

    // Game state (we'll expand this later)
    const [playerScore, setPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [currentRound, setCurrentRound] = useState(1);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => router.push('/')}
                    className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-600 transition"
                >
                    ← Back to Menu
                </button>

                <div className="text-amber-400 text-xl font-bold">
                    Round {currentRound} of 3
                </div>

                <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition">
                    Forfeit
                </button>
            </div>

            {/* Main Game Board */}
            <div className="max-w-7xl mx-auto">
                {/* Opponent's Section */}
                <OpponentSection score={opponentScore} />

                {/* Weather Row (middle) */}
                <WeatherRow />

                {/* Player's Section */}
                <PlayerSection score={playerScore} />
            </div>
        </div>
    );
}

// ========================================
// OPPONENT SECTION
// ========================================
function OpponentSection({ score }) {
    return (
        <div className="mb-4">
            {/* Opponent Info */}
            <div className="flex justify-between items-center mb-3 px-4">
                <div className="text-red-400 text-2xl font-bold">
                    Opponent: {score}
                </div>
                <div className="flex gap-2">
                    {/* Life gems (rounds won) */}
                    <LifeGem active={false} />
                    <LifeGem active={false} />
                </div>
            </div>

            {/* Battle Rows */}
            <BattleRow type="siege" side="opponent" />
            <BattleRow type="ranged" side="opponent" />
            <BattleRow type="melee" side="opponent" />
        </div>
    );
}

// ========================================
// PLAYER SECTION
// ========================================
function PlayerSection({ score }) {
    return (
        <div className="mt-4">
            {/* Battle Rows */}
            <BattleRow type="melee" side="player" />
            <BattleRow type="ranged" side="player" />
            <BattleRow type="siege" side="player" />

            {/* Player Info */}
            <div className="flex justify-between items-center mt-3 px-4">
                <div className="text-blue-400 text-2xl font-bold">
                    You: {score}
                </div>
                <div className="flex gap-2">
                    {/* Life gems (rounds won) */}
                    <LifeGem active={true} />
                    <LifeGem active={false} />
                </div>
            </div>

            {/* Player's Hand */}
            <PlayerHand />
        </div>
    );
}

// ========================================
// BATTLE ROW COMPONENT
// ========================================
function BattleRow({ type, side }) {
    // Row colors based on type
    const bgColor = {
        melee: 'bg-red-900/30',
        ranged: 'bg-green-900/30',
        siege: 'bg-blue-900/30'
    }[type];

    const borderColor = {
        melee: 'border-red-500',
        ranged: 'border-green-500',
        siege: 'border-blue-500'
    }[type];

    const icon = {
        melee: '⚔️',
        ranged: '🏹',
        siege: '🎯'
    }[type];

    return (
        <div className={`${bgColor} ${borderColor} border-2 rounded-lg p-3 mb-2 min-h-[120px] relative`}>
            {/* Row Label */}
            <div className="absolute top-1 left-2 text-xs text-gray-400 uppercase font-semibold">
                {icon} {type} - {side}
            </div>

            {/* Row Score */}
            <div className="absolute top-1 right-2 text-amber-400 font-bold text-lg">
                0
            </div>

            {/* Card Drop Zone (we'll add cards here later) */}
            <div className="flex gap-2 mt-6 flex-wrap">
                {/* Cards will appear here */}
                <div className="text-gray-500 text-sm italic">No cards played</div>
            </div>
        </div>
    );
}

// ========================================
// WEATHER ROW (Middle of board)
// ========================================
function WeatherRow() {
    return (
        <div className="bg-gray-800/50 border-2 border-gray-600 rounded-lg p-2 mb-4 flex items-center justify-center">
            <div className="text-gray-400 text-sm italic">
                ☁️ No weather effects active
            </div>
        </div>
    );
}

// ========================================
// PLAYER'S HAND (Cards you can play)
// ========================================
function PlayerHand() {
    return (
        <div className="mt-4 bg-slate-800/50 border-2 border-slate-600 rounded-lg p-4">
            <div className="text-center text-amber-400 mb-3 font-semibold">Your Hand</div>
            <div className="flex gap-3 justify-center flex-wrap">
                {/* Placeholder cards */}
                <PlaceholderCard />
            </div>

            {/* Pass Button */}
            <div className="mt-4 text-center">
                <button className="px-8 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-500 transition">
                    PASS
                </button>
            </div>
        </div>
    );
}

// ========================================
// PLACEHOLDER CARD (temporary)
// ========================================
function PlaceholderCard() {
    return (
        <Card
            name={"Geralt Of Rivia"}
            power={15}
            type={"unit"}
            row={"melee"}
            faction={"norther-realms"}
            hero={true}
        />
    );
}

// ========================================
// LIFE GEM (Round indicators)
// ========================================
function LifeGem({ active }) {
    return (
        <div className={`w-8 h-8 rounded-full border-2 ${
            active
                ? 'bg-amber-500 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                : 'bg-gray-700 border-gray-600'
        }`} />
    );
}
