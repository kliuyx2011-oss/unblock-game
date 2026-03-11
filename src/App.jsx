import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setIsFullscreen(false);
  };

  const closePlayer = () => {
    setSelectedGame(null);
    setIsFullscreen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Gamepad2 className="text-black w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              UNBLOCKED<span className="text-emerald-500">GAMES</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/5 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors text-sm"
            />
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-zinc-400">
            <span className="hidden md:inline">v1.0.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Featured Games</h2>
          <p className="text-zinc-500 text-sm">Hand-picked unblocked games for your entertainment.</p>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layoutId={game.id}
                onClick={() => handleGameClick(game)}
                className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 cursor-pointer hover:border-emerald-500/30 transition-all"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] uppercase font-bold tracking-wider rounded-md">
                      {game.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <h3 className="font-semibold text-zinc-200">{game.title}</h3>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4">
              <Search className="w-8 h-8 text-zinc-700" />
            </div>
            <h3 className="text-lg font-medium text-zinc-400">No games found</h3>
            <p className="text-zinc-600 text-sm">Try searching for something else.</p>
          </div>
        )}
      </main>

      {/* Game Player Overlay */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-black"
          >
            {/* Player Header */}
            <div className="h-14 bg-zinc-900 border-b border-white/5 flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={closePlayer}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="font-bold text-sm leading-tight">{selectedGame.title}</h2>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{selectedGame.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href={selectedGame.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
                  title="Toggle Fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Iframe Container */}
            <div className={`flex-1 relative bg-[#111] ${isFullscreen ? 'p-0' : 'p-4 md:p-8'}`}>
              <div className={`w-full h-full mx-auto bg-black shadow-2xl overflow-hidden rounded-lg border border-white/5 ${isFullscreen ? '' : 'max-w-5xl'}`}>
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
                  title={selectedGame.title}
                />
              </div>
            </div>

            {/* Player Footer (Optional) */}
            {!isFullscreen && (
              <div className="h-12 bg-zinc-900/50 border-t border-white/5 flex items-center justify-center px-4 text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
                Playing {selectedGame.title} • Unblocked Games Hub
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-white/5 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Gamepad2 className="w-5 h-5" />
            <span className="text-sm font-bold tracking-tighter">UNBLOCKED HUB</span>
          </div>
          <div className="flex gap-8 text-xs text-zinc-500 font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-zinc-600">© 2026 Unblocked Games Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
