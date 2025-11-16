import React, { useState } from 'react';
import type { Prompt } from '../types';
import { HeartIcon, ClipboardIcon, CheckIcon } from './icons';

interface PromptCardProps {
  prompt: Prompt;
  onFavoriteToggle: (id: number) => void;
  onCardClick: (prompt: Prompt) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onFavoriteToggle, onCardClick }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(prompt.fullPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onFavoriteToggle(prompt.id);
    };

  return (
    <div 
        className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full relative cursor-pointer"
        onClick={() => onCardClick(prompt)}
    >
      {prompt.essentialRank && (
        <div className="absolute -top-3 -left-3 bg-amber-400 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
          #{prompt.essentialRank}
        </div>
      )}
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-slate-800 mb-2">{prompt.title}</h3>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">{prompt.difficulty}</span>
          <span className="text-xs font-semibold bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full">{prompt.category}</span>
        </div>
        <div className="flex items-center text-sm text-slate-500 mb-3 gap-4">
            <span>{prompt.uses} 次使用</span>
            <span className="flex items-center">
                <HeartIcon className="w-4 h-4 mr-1 text-pink-500"/> {prompt.likes}
            </span>
        </div>
        <p className="text-sm text-slate-600 mb-4">{prompt.description}</p>
        <div className="flex flex-wrap gap-2">
            {prompt.tags.map(tag => (
                <span key={tag} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">◎ {tag}</span>
            ))}
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 flex justify-between items-center rounded-b-lg">
        <button 
            onClick={handleCopyClick}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${copied ? 'text-green-600' : 'text-blue-600 hover:text-blue-800'}`}
        >
          {copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
          {copied ? '已複製!' : '複製 Prompt'}
        </button>
        <button
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full transition-colors ${prompt.isFavorite ? 'text-pink-500 bg-pink-100' : 'text-slate-400 hover:bg-slate-200'}`}
          aria-label="收藏"
        >
          <HeartIcon className={`w-5 h-5 ${prompt.isFavorite ? 'fill-current' : 'fill-none'}`} />
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
