
import React, { useState, useEffect } from 'react';
import type { Prompt } from '../types';
import { ClipboardIcon, CheckIcon, XMarkIcon } from './icons';

interface PromptModalProps {
  prompt: Prompt;
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ prompt, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">{prompt.title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <h3 className="font-semibold text-slate-700 mb-2">▶︎ 使用情境：</h3>
            <p className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: prompt.usageContext.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-slate-700 mb-2">▶︎ Prompt 範本 (點擊下方按鈕一鍵複製)：</h3>
            <pre className="bg-slate-800 text-white p-4 rounded-md text-sm whitespace-pre-wrap font-mono overflow-x-auto">
              <code>{prompt.fullPrompt}</code>
            </pre>
          </div>

          <div className="mb-2">
            <h3 className="font-semibold text-slate-700 mb-2">▶︎ 使用說明：</h3>
             <p className="text-slate-600 text-sm leading-relaxed bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-md" dangerouslySetInnerHTML={{ __html: prompt.usageInstructions.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code class="bg-amber-200 text-amber-900 px-1 py-0.5 rounded text-xs">$1</code>') }} />
          </div>
        </div>
        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-lg">
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md font-semibold text-white transition-colors ${
              copied
                ? 'bg-green-600'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
            {copied ? '已複製！' : '一鍵複製完整 Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
