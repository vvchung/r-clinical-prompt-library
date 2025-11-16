
import React, { useState, useMemo, useEffect } from 'react';
import { Prompt } from './types';
import { PROMPTS, SCENE_TAGS, NAV_ITEMS, CLINICAL_CATEGORIES } from './constants';
import Sidebar from './components/Sidebar';
import PromptCard from './components/PromptCard';
import PromptModal from './components/PromptModal';
import PromptWishlist from './components/PromptWishlist';
import { BeakerIcon, FireIcon, HeartIcon, MagnifyingGlassIcon, ChevronDownIcon, SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>(PROMPTS);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeNav, setActiveNav] = useState<string>('所有指令');

  const toggleFavorite = (id: number) => {
    setPrompts(prompts.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const handleCardClick = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredPrompts = useMemo(() => {
    const navItem = NAV_ITEMS.find(item => item.name === activeNav);
    // Gracefully handle nav items without a filter function (like the Wishlist)
    if (!navItem?.filter) {
      return [];
    }
    const basePrompts = prompts.filter(navItem.filter);

    return basePrompts.filter(prompt => {
      const searchTermMatch =
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const filterMatch = activeFilters.length === 0 || activeFilters.includes(prompt.category) || activeFilters.some(f => prompt.tags.includes(f));

      return searchTermMatch && filterMatch;
    });
  }, [prompts, searchTerm, activeFilters, activeNav]);

  const essentialPrompts = useMemo(() => prompts.filter(p => p.essentialRank).sort((a, b) => (a.essentialRank || 0) - (b.essentialRank || 0)), [prompts]);
  const favoritePrompts = useMemo(() => prompts.filter(p => p.isFavorite).slice(0, 2), [prompts]);
  const clinicalPrompts = useMemo(() => prompts.filter(p => CLINICAL_CATEGORIES.includes(p.category)), [prompts]);
  
  // Reset filters when changing nav
  useEffect(() => {
      setActiveFilters([]);
      setSearchTerm('');
  }, [activeNav]);

  const renderPromptLibrary = () => {
    return (
      <>
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
             {/* FIX: Completed the className for the icon */}
             <BeakerIcon className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">臨床統計 R 語言提示詞大全</h2>
            <p className="text-slate-500">快速生成高品質的 R 語言程式碼，加速您的研究與論文寫作。</p>
          </div>
        </div>
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2"/>
                <input
                    type="text"
                    placeholder="搜尋提示詞標題、描述或標籤..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
             <div className="relative">
                 <button className="w-full md:w-auto flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg">
                     <span>{activeFilters.length > 0 ? `已選 ${activeFilters.length} 項` : '篩選場景'}</span>
                     <ChevronDownIcon className="w-4 h-4 text-slate-500"/>
                 </button>
             </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
            {SCENE_TAGS.map(tag => (
                <button
                    key={tag}
                    onClick={() => toggleFilter(tag)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        activeFilters.includes(tag)
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map(prompt => (
            <PromptCard 
              key={prompt.id} 
              prompt={prompt} 
              onFavoriteToggle={toggleFavorite}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
        
        {filteredPrompts.length === 0 && (
            <div className="text-center py-16 text-slate-500">
                <p>找不到符合條件的提示詞。</p>
            </div>
        )}

        {/* Featured Sections */}
        {activeNav === '所有指令' && searchTerm === '' && activeFilters.length === 0 && (
          <div className="mt-16 space-y-12">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <FireIcon className="w-6 h-6 mr-2 text-orange-500" />
                入門必學 Top 6
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {essentialPrompts.map(p => <PromptCard key={p.id} prompt={p} onFavoriteToggle={toggleFavorite} onCardClick={handleCardClick} />)}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <HeartIcon className="w-6 h-6 mr-2 text-pink-500" />
                我的收藏精選
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritePrompts.map(p => <PromptCard key={p.id} prompt={p} onFavoriteToggle={toggleFavorite} onCardClick={handleCardClick} />)}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-purple-500" />
                臨床應用精選
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicalPrompts.slice(0, 3).map(p => <PromptCard key={p.id} prompt={p} onFavoriteToggle={toggleFavorite} onCardClick={handleCardClick} />)}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  {/* FIX: Added the main return statement for the App component to render the layout and fix the return type error. */}
  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        {activeNav === '許願池' ? <PromptWishlist /> : renderPromptLibrary()}
      </main>
      {selectedPrompt && <PromptModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />}
    </div>
  );
};

{/* FIX: Added a default export for the App component to resolve the import error in index.tsx. */}
export default App;
