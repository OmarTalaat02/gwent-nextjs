'use client'

import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-amber-950 to-gray-900 flex items-center justify-center">
            {/* Background texture overlay */}
            <div className="absolute inset-0 bg-[url('/paper-texture.jpg')] opacity-5"></div>

            <div className="relative z-10 text-center space-y-8 p-8">
                {/* Title */}
                <div className="space-y-2">
                    <h1 className="text-7xl font-bold text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] tracking-wider">
                        GWENT
                    </h1>
                    <p className="text-xl text-amber-200 italic font-serif">
                        A Card Game of Cunning and Deceit
                    </p>
                </div>

                {/* Menu Buttons */}
                <div className="space-y-4 mt-12">
                    <MenuButton
                        onClick={() => router.push('/game')}
                        text="Play Game"
                    />
                    <MenuButton
                        onClick={() => router.push('/deck-builder')}
                        text="Deck Builder"
                    />
                    <MenuButton
                        onClick={() => alert('Rules coming soon!')}
                        text="How to Play"
                    />
                </div>

                {/* Footer */}
                <div className="mt-16 text-amber-600 text-sm">
                    <p>Recreation of Gwent from The Witcher 3: Wild Hunt</p>
                    <p className="text-xs mt-2 text-amber-700">Educational Project • Not affiliated with CD Projekt Red</p>
                </div>
            </div>
        </div>
    );
}

// Reusable Menu Button Component
function MenuButton({ onClick, text }) {
    return (
        <button
            onClick={onClick}
            className="w-80 px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-600 \n
                 text-amber-50 text-xl font-semibold rounded-lg \n
                 border-2 border-amber-500 \n
                 shadow-[0_0_20px_rgba(217,119,6,0.3)] \n
                 hover:from-amber-600 hover:to-amber-500 \n
                 hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] \n
                 hover:scale-105 \n
                 transition-all duration-300 \n
                 active:scale-95"
        >
            {text}
        </button>
    );
}