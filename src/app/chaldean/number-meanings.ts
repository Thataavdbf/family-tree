// src/app/chaldean/number-meanings.ts
// Centralized meanings for numerology numbers (1-9, 11, 22, 33, compound numbers)

export const NUMBER_MEANINGS: Record<string, { label: string; description: string; recommendation?: string }> = {
  '1': {
    label: 'The Leader',
    description: 'Independent, ambitious, pioneering, and self-reliant. 1s are natural leaders and initiators.',
    recommendation: 'Embrace leadership roles and trust your instincts.'
  },
  '2': {
    label: 'The Peacemaker',
    description: 'Diplomatic, sensitive, cooperative, and supportive. 2s excel in partnerships and teamwork.',
    recommendation: 'Seek harmony and use your intuition to mediate conflicts.'
  },
  '3': {
    label: 'The Creative',
    description: 'Expressive, joyful, optimistic, and artistic. 3s thrive in creative pursuits and communication.',
    recommendation: 'Share your ideas and talents with the world.'
  },
  '4': {
    label: 'The Builder',
    description: 'Practical, disciplined, reliable, and hardworking. 4s value stability and structure.',
    recommendation: 'Focus on long-term goals and build solid foundations.'
  },
  '5': {
    label: 'The Adventurer',
    description: 'Freedom-loving, adaptable, curious, and energetic. 5s seek change and variety.',
    recommendation: 'Embrace new experiences and avoid stagnation.'
  },
  '6': {
    label: 'The Nurturer',
    description: 'Caring, responsible, protective, and harmonious. 6s are drawn to family and service.',
    recommendation: 'Support others, but remember to care for yourself.'
  },
  '7': {
    label: 'The Seeker',
    description: 'Analytical, spiritual, introspective, and wise. 7s are drawn to knowledge and inner truth.',
    recommendation: 'Trust your intuition and make time for reflection.'
  },
  '8': {
    label: 'The Powerhouse',
    description: 'Ambitious, authoritative, efficient, and goal-oriented. 8s are linked to material success.',
    recommendation: 'Pursue your ambitions with integrity.'
  },
  '9': {
    label: 'The Humanitarian',
    description: 'Compassionate, generous, tolerant, and idealistic. 9s are motivated by service to others.',
    recommendation: 'Give back to your community and embrace forgiveness.'
  },
  '11': {
    label: 'The Inspired Healer (Master Number)',
    description: 'Visionary, intuitive, spiritual, and inspiring. 11s are channels for higher wisdom.',
    recommendation: 'Use your gifts to uplift and inspire others.'
  },
  '22': {
    label: 'The Master Builder (Master Number)',
    description: 'Practical visionary, powerful, disciplined, and able to turn dreams into reality.',
    recommendation: 'Set big goals and work steadily toward them.'
  },
  '33': {
    label: 'The Master Teacher (Master Number)',
    description: 'Compassionate, nurturing, selfless, and devoted to service. 33s are spiritual teachers.',
    recommendation: 'Lead by example and share your wisdom.'
  },
  // Example compound numbers (Chaldean)
  '13': {
    label: 'Transformation',
    description: 'Associated with upheaval and rebirth. 13 brings change and the need for adaptability.'
  },
  '14': {
    label: 'Movement',
    description: 'Linked to change, travel, and restlessness. 14 brings lessons in freedom and discipline.'
  },
  '19': {
    label: 'Success After Struggle',
    description: 'Represents overcoming obstacles and achieving success through perseverance.'
  }
};
