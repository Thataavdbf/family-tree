// src/app/chaldean/zodiac-utils.ts
// Utility functions for Western and Chinese zodiac

export function getWesternZodiac(birthdate: string): { sign: string; symbol: string; range: string; description: string } | null {
  if (!birthdate) return null;
  const [year, month, day] = birthdate.split('-').map(Number);
  if (!year || !month || !day) return null;
  // Month is 1-based
  const zodiacs = [
    { sign: 'Capricorn', symbol: '♑', range: 'Dec 22 - Jan 19', description: 'Disciplined, responsible, practical.' },
    { sign: 'Aquarius', symbol: '♒', range: 'Jan 20 - Feb 18', description: 'Innovative, independent, humanitarian.' },
    { sign: 'Pisces', symbol: '♓', range: 'Feb 19 - Mar 20', description: 'Compassionate, artistic, intuitive.' },
    { sign: 'Aries', symbol: '♈', range: 'Mar 21 - Apr 19', description: 'Courageous, energetic, confident.' },
    { sign: 'Taurus', symbol: '♉', range: 'Apr 20 - May 20', description: 'Reliable, patient, determined.' },
    { sign: 'Gemini', symbol: '♊', range: 'May 21 - Jun 20', description: 'Adaptable, curious, communicative.' },
    { sign: 'Cancer', symbol: '♋', range: 'Jun 21 - Jul 22', description: 'Nurturing, sensitive, protective.' },
    { sign: 'Leo', symbol: '♌', range: 'Jul 23 - Aug 22', description: 'Confident, creative, generous.' },
    { sign: 'Virgo', symbol: '♍', range: 'Aug 23 - Sep 22', description: 'Analytical, practical, reliable.' },
    { sign: 'Libra', symbol: '♎', range: 'Sep 23 - Oct 22', description: 'Diplomatic, fair, sociable.' },
    { sign: 'Scorpio', symbol: '♏', range: 'Oct 23 - Nov 21', description: 'Passionate, resourceful, determined.' },
    { sign: 'Sagittarius', symbol: '♐', range: 'Nov 22 - Dec 21', description: 'Optimistic, adventurous, honest.' },
  ];
  const md = month * 100 + day;
  if (md >= 1222 || md <= 119) return zodiacs[0]; // Capricorn
  if (md >= 120 && md <= 218) return zodiacs[1]; // Aquarius
  if (md >= 219 && md <= 320) return zodiacs[2]; // Pisces
  if (md >= 321 && md <= 419) return zodiacs[3]; // Aries
  if (md >= 420 && md <= 520) return zodiacs[4]; // Taurus
  if (md >= 521 && md <= 620) return zodiacs[5]; // Gemini
  if (md >= 621 && md <= 722) return zodiacs[6]; // Cancer
  if (md >= 723 && md <= 822) return zodiacs[7]; // Leo
  if (md >= 823 && md <= 922) return zodiacs[8]; // Virgo
  if (md >= 923 && md <= 1022) return zodiacs[9]; // Libra
  if (md >= 1023 && md <= 1121) return zodiacs[10]; // Scorpio
  if (md >= 1122 && md <= 1221) return zodiacs[11]; // Sagittarius
  return null;
}

export function getChineseZodiac(birthdate: string): { animal: string; symbol: string; years: string; description: string } | null {
  if (!birthdate) return null;
  const [yearStr] = birthdate.split('-');
  const year = Number(yearStr);
  if (!year) return null;
  const animals = [
    { animal: 'Rat', symbol: '🐀', years: '', description: 'Intelligent, adaptable, quick-witted.' },
    { animal: 'Ox', symbol: '🐂', years: '', description: 'Strong, reliable, patient.' },
    { animal: 'Tiger', symbol: '🐅', years: '', description: 'Brave, confident, competitive.' },
    { animal: 'Rabbit', symbol: '🐇', years: '', description: 'Gentle, quiet, elegant.' },
    { animal: 'Dragon', symbol: '🐉', years: '', description: 'Confident, intelligent, enthusiastic.' },
    { animal: 'Snake', symbol: '🐍', years: '', description: 'Wise, enigmatic, intuitive.' },
    { animal: 'Horse', symbol: '🐎', years: '', description: 'Energetic, independent, impatient.' },
    { animal: 'Goat', symbol: '🐐', years: '', description: 'Calm, gentle, sympathetic.' },
    { animal: 'Monkey', symbol: '🐒', years: '', description: 'Witty, curious, clever.' },
    { animal: 'Rooster', symbol: '🐓', years: '', description: 'Observant, hardworking, courageous.' },
    { animal: 'Dog', symbol: '🐕', years: '', description: 'Loyal, honest, prudent.' },
    { animal: 'Pig', symbol: '🐖', years: '', description: 'Compassionate, generous, diligent.' },
  ];
  const baseYear = 2020; // 2020 is Rat
  const idx = (year - baseYear) % 12;
  const animalIdx = idx < 0 ? idx + 12 : idx;
  return animals[animalIdx];
}
