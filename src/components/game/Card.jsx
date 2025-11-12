export default function Card({
                                 name = "Unknown Card",
                                 power = 0,
                                 ability = null,
                                 type = "unit",  // unit, weather, special
                                 row = "melee",  // melee, ranged, siege
                                 faction = "neutral",
                                 hero = false,
                                 image = null
                             }) {

    // Card border color by faction
    const factionColors = {
        'northern-realms': 'border-blue-500',
        'nilfgaard': 'border-amber-800',
        'monsters': 'border-red-600',
        'scoiatael': 'border-green-600',
        'neutral': 'border-gray-500'
    };

    // Row icon
    const rowIcons = {
        melee: '⚔️',
        ranged: '🏹',
        siege: '🎯',
        agile: '🔄'  // Can be played in multiple rows
    };

    // Ability icons
    const abilityIcons = {
        spy: '👁️',
        medic: '⚕️',
        scorch: '🔥',
        muster: '👥',
        horn: '📯',
        morale: '⭐',
        bond: '🔗',
        hero: '👑'
    };

    return (
        <div
            className={`relative w-24 h-36 rounded-lg cursor-pointer 
                  transition-all duration-200 hover:scale-110 hover:z-10
                  ${factionColors[faction]} border-2
                  shadow-[0_4px_12px_rgba(0,0,0,0.5)]
                  hover:shadow-[0_8px_24px_rgba(251,191,36,0.4)]`}
        >
            {/* Card Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900 via-amber-950 to-black rounded-lg overflow-hidden">

                {/* Card Image Area */}
                <div className="h-20 bg-gradient-to-b from-amber-800/30 to-transparent flex items-center justify-center">
                    {image ? (
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-4xl">{rowIcons[row] || '🃏'}</div>
                    )}
                </div>

                {/* Card Name */}
                <div className="px-2 py-1 bg-black/60">
                    <p className="text-[10px] text-amber-200 font-semibold text-center truncate leading-tight">
                        {name}
                    </p>
                </div>

                {/* Power Value (bottom left) */}
                {type === 'unit' && (
                    <div className="absolute bottom-2 left-2 w-8 h-8 bg-amber-600 rounded-full \r \n
                          flex items-center justify-center border-2 border-amber-400
                          shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                        <span className="text-white font-bold text-sm">{power}</span>
                    </div>
                )}

                {/* Row Type (bottom right) */}
                <div className="absolute bottom-2 right-2 text-xl opacity-70">
                    {rowIcons[row]}
                </div>

                {/* Ability Icon (top right) */}
                {ability && (
                    <div className="absolute top-1 right-1 text-lg bg-black/50 rounded-full w-6 h-6 flex items-center justify-center">
                        {abilityIcons[ability]}
                    </div>
                )}

                {/* Hero Indicator (top left) */}
                {hero && (
                    <div className="absolute top-1 left-1 text-lg bg-yellow-600 rounded-full w-6 h-6 flex items-center justify-center shadow-[0_0_10px_rgba(202,138,4,0.8)]">
                        👑
                    </div>
                )}
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-amber-400/0 hover:bg-amber-400/10 rounded-lg transition-colors pointer-events-none" />
        </div>
    );
}