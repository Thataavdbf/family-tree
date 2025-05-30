// src/app/chaldean/NumberMeaningCard.tsx
import React, { useState } from 'react';
import { NUMBER_MEANINGS } from './number-meanings';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface NumberMeaningCardProps {
  number: string | number;
  label?: string;
  className?: string;
}

function isMasterNumber(num: string) {
  return ['11', '22', '33'].includes(num);
}

function isCompoundNumber(num: string) {
  // Compound numbers are 2+ digits, not master numbers, and in meanings
  return num.length > 1 && !isMasterNumber(num) && NUMBER_MEANINGS[num];
}


export const NumberMeaningCard: React.FC<NumberMeaningCardProps> = ({ number, label, className }) => {
  const numStr = String(number);
  const meaning = NUMBER_MEANINGS[numStr];
  const [expanded, setExpanded] = useState(false);

  if (!meaning) return null;

  return (
    <Card
      className={`mb-4 p-4 border-2 shadow-md fade-in card-hover-animate ${className || ''} ${isMasterNumber(numStr) ? 'border-purple-500' : isCompoundNumber(numStr) ? 'border-orange-400' : 'border-gray-200'}`.trim()}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-bold pop-in">{label || `Number ${numStr}`}</span>
        {isMasterNumber(numStr) && <Badge className="bg-purple-500 text-white ml-2 pop-in">Master Number</Badge>}
        {isCompoundNumber(numStr) && <Badge className="bg-orange-400 text-white ml-2 pop-in">Compound</Badge>}
      </div>
      <div className="font-semibold text-lg mb-1 fade-in">{meaning.label}</div>
      <div className="mb-2 text-gray-700 fade-in">
        {expanded ? meaning.description : meaning.description.slice(0, 80) + (meaning.description.length > 80 ? '...' : '')}
        {meaning.description.length > 80 && (
          <button
            className="ml-2 text-blue-500 underline text-sm fade-in"
            onClick={() => setExpanded(e => !e)}
            aria-label={expanded ? 'Show less' : 'Show more'}
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      {meaning.recommendation && (
        <div className="mt-2 text-green-700 text-sm fade-in">
          <span className="font-semibold">Recommendation:</span> {meaning.recommendation}
        </div>
      )}
    </Card>
  );
};

export default NumberMeaningCard;
