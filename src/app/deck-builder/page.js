'use client'

import { useRouter } from 'next/navigation';

export default function DeckBuilderPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-amber-400 mb-2">Deck Builder</h1>
                        <p className="text-gray-400">Construct your perfect Gwent deck</p>
                    </div>
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-600 transition"
                    >
                        ← Back to Menu
                    </button>
                </div>

                {/* Coming Soon Message */}
                <div className="bg-slate-800 border-2 border-amber-600 rounded-xl p-12 text-center">
                    <div className="text-6xl mb-4">🏗️</div>
                    <h2 className="text-3xl text-amber-400 font-bold mb-3">Coming Soon!</h2>
                    <p className="text-gray-300 text-lg">
                        The deck builder will be implemented in Phase 5
                    </p>
                    <p className="text-gray-500 mt-2">
                        First, we need to build the card system and game logic
                    </p>
                </div>
            </div>
        </div>
    );
}