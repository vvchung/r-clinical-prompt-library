// FIX: Import React to make React and JSX types available in this file.
import React from 'react';

export interface Prompt {
  id: number;
  title: string;
  difficulty: string;
  category: string;
  uses: number;
  likes: number;
  description: string;
  tags: string[];
  isFavorite?: boolean;
  fullPrompt: string;
  usageContext: string;
  usageInstructions: string;
  essentialRank?: number | null;
}

export type NavItem = {
  name: string;
  // FIX: Replaced JSX.Element with React.ReactElement to avoid relying on the global JSX namespace in a .ts file.
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  filter?: (prompt: Prompt) => boolean;
};
