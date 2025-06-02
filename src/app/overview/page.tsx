import React from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../../components/ui/collapsible';

const faqs = [
  {
    question: 'What is numerology?',
    answer: `Numerology is the study of the mystical or symbolic significance of numbers and their influence on human life, personality, and events. It is based on the idea that numbers have unique vibrations and meanings that can reveal insights about your character, destiny, and relationships.`
  },
  {
    question: 'How are numbers calculated?',
    answer: `In numerology, numbers are typically calculated from your name and birthdate. The most common calculations include:\n\n- Life Path Number: Add all the digits of your birthdate (MM/DD/YYYY) together and reduce to a single digit.\n- Expression/Destiny Number: Assign numbers to each letter of your full name using a numerology chart, add them up, and reduce to a single digit.\n- Other Numbers: There are also Soul Urge, Personality, and other numbers, each calculated from different parts of your name or birthdate.`
  },
  {
    question: 'What do the different numbers mean?',
    answer: `Each number from 1 to 9 (and some master numbers like 11, 22, 33) has a unique meaning:\n\n1: Leadership, independence, new beginnings\n2: Cooperation, sensitivity, balance\n3: Creativity, joy, self-expression\n4: Stability, hard work, practicality\n5: Freedom, change, adventure\n6: Responsibility, family, harmony\n7: Spirituality, analysis, wisdom\n8: Power, achievement, material success\n9: Compassion, completion, humanitarianism\n11, 22, 33: Master numbers with heightened spiritual significance`
  },
  {
    question: 'How can numerology help you understand yourself and your family?',
    answer: `Numerology can provide insight into:\n\n- Your strengths, challenges, and life purpose\n- Relationship compatibility and family dynamics\n- Patterns and cycles in your life and family history\n- Ways to improve communication, resolve conflicts, and support each other\n\nBy understanding the numbers that influence you and your family, you can make more informed decisions, appreciate each person’s unique qualities, and foster deeper connections.`
  }
];

export default function OverviewPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="section-title">Numerology Overview</h1>
      <div className="section-card">
        <p className="mb-6">
          Welcome to the Numerology Overview! Click each question below to learn more about numerology and how it can help you and your family.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Collapsible key={idx}>
              <CollapsibleTrigger className="w-full text-left font-semibold py-2 px-4 bg-purple-900/40 rounded cursor-pointer focus:outline-none">
                {faq.question}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-2 text-white whitespace-pre-line">
                {faq.answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}
