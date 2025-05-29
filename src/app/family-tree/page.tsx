'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';

// Constants
const CHALDEAN_CHART = {
  'a': 1, 'i': 1, 'j': 1, 'q': 1, 'y': 1,
  'b': 2, 'k': 2, 'r': 2,
  'c': 3, 'g': 3, 'l': 3, 's': 3,
  'd': 4, 'm': 4, 't': 4,
  'e': 5, 'h': 5, 'n': 5, 'x': 5,
  'u': 6, 'v': 6, 'w': 6,
  'o': 7, 'z': 7,
  'f': 8, 'p': 8
} as const;

const CHINESE_ZODIAC_SIGNS = [
  'Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 
  'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep/Goat'
] as const;

const MASTER_NUMBERS = [11, 22, 33] as const;
const SPECIAL_CHALDEAN_NUMBERS = [10, 11, 12, 13, 14, 15, 16, 19, 22, 33] as const;

// Types
interface FamilyMember {
  id: string;
  name: string;
  birthdate: string;
  parentId: string | null;
  spouseId: string | null;
  children: string[];
  lifePath: number;
  chaldeanNumber: number;
  westernZodiac: string;
  chineseZodiac: string;
}

interface NewMemberForm {
  name: string;
  birthdate: string;
  parentId: string;
  spouseId: string;
}

type TabType = 'view' | 'add' | 'edit';

// Utility functions
const isValidDate = (dateString: string): boolean => {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(dateString);
};

const parseDate = (dateString: string) => {
  if (!isValidDate(dateString)) return null;
  const [month, day, year] = dateString.split('/').map(Number);
  return { month, day, year };
};

const reduceToSingleDigit = (num: number, allowMasterNumbers = true): number => {
  while (num > 9) {
    if (allowMasterNumbers && MASTER_NUMBERS.includes(num as any)) {
      break;
    }
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return num;
};

// Calculation functions
const calculateLifePath = (birthdate: string): number => {
  const date = parseDate(birthdate);
  if (!date) return 0;
  
  const { month, day, year } = date;
  
  const monthReduced = reduceToSingleDigit(month);
  const dayReduced = reduceToSingleDigit(day);
  const yearReduced = reduceToSingleDigit(year);
  
  const lifePath = monthReduced + dayReduced + yearReduced;
  return reduceToSingleDigit(lifePath);
};

const calculateChaldeanNumber = (name: string): number => {
  if (!name.trim()) return 0;
  
  const nameSum = name.toLowerCase()
    .split('')
    .filter(char => /[a-z]/.test(char))
    .reduce((sum, char) => sum + (CHALDEAN_CHART[char as keyof typeof CHALDEAN_CHART] || 0), 0);
  
  if (SPECIAL_CHALDEAN_NUMBERS.includes(nameSum as any)) {
    return nameSum;
  }
  
  return reduceToSingleDigit(nameSum, false);
};

const getWesternZodiac = (birthdate: string): string => {
  const date = parseDate(birthdate);
  if (!date) return '';
  
  const { month, day } = date;
  
  const zodiacRanges = [
    { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
    { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'Pisces', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', start: [5, 21], end: [6, 20] },
    { sign: 'Cancer', start: [6, 21], end: [7, 22] },
    { sign: 'Leo', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', start: [9, 23], end: [10, 22] },
    { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius', start: [11, 22], end: [12, 21] }
  ];
  
  for (const { sign, start, end } of zodiacRanges) {
    if (sign === 'Capricorn') {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return sign;
      }
    } else {
      const [startMonth, startDay] = start;
      const [endMonth, endDay] = end;
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return sign;
      }
    }
  }
  
  return 'Pisces'; // fallback
};

const getChineseZodiac = (birthdate: string): string => {
  const date = parseDate(birthdate);
  if (!date) return '';
  
  const { year } = date;
  return CHINESE_ZODIAC_SIGNS[(year - 4) % 12];
};

// Custom hooks
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue, isLoading] as const;
};

// Components
const FamilyMemberCard = ({ member }: { member: FamilyMember }) => (
  <div className="family-member-card">
    <h4 className="text-lg font-semibold">{member.name}</h4>
    <div className="flex flex-wrap gap-1 mt-2">
      <span className={`tag tag-life-path-${member.lifePath}`}>
        Life Path {member.lifePath}
      </span>
      <span className={`tag tag-chaldean-${member.chaldeanNumber}`}>
        Chaldean {member.chaldeanNumber}
      </span>
    </div>
    <div className="mt-2 text-sm">
      <span className="tag">{member.westernZodiac}</span>
      <span className="tag ml-1">{member.chineseZodiac}</span>
    </div>
    <p className="mt-2 text-xs opacity-70">{member.birthdate}</p>
  </div>
);

const TabButton = ({ 
  isActive, 
  onClick, 
  children 
}: { 
  isActive: boolean; 
  onClick: () => void; 
  children: React.ReactNode; 
}) => (
  <button 
    className={`tab-button ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Main component
export default function FamilyTreePage() {
  const [activeTab, setActiveTab] = useState<TabType>('view');
  const [familyMembers, setFamilyMembers, isLoading] = useLocalStorage<FamilyMember[]>('familyTreeData', []);
  const [newMember, setNewMember] = useState<NewMemberForm>({
    name: '',
    birthdate: '',
    parentId: 'none',
    spouseId: 'none'
  });

  // Initialize with sample data if no data exists
  useEffect(() => {
    if (!isLoading && familyMembers.length === 0) {
      const sampleData: FamilyMember[] = [
        {
          id: '1',
          name: 'Tyler',
          birthdate: '06/02/1988',
          parentId: null,
          spouseId: null,
          children: [],
          lifePath: calculateLifePath('06/02/1988'),
          chaldeanNumber: calculateChaldeanNumber('Tyler'),
          westernZodiac: getWesternZodiac('06/02/1988'),
          chineseZodiac: getChineseZodiac('06/02/1988')
        },
        {
          id: '2',
          name: 'Bri',
          birthdate: '06/23/1986',
          parentId: null,
          spouseId: null,
          children: [],
          lifePath: calculateLifePath('06/23/1986'),
          chaldeanNumber: calculateChaldeanNumber('Bri'),
          westernZodiac: getWesternZodiac('06/23/1986'),
          chineseZodiac: getChineseZodiac('06/23/1986')
        },
        {
          id: '3',
          name: 'Val',
          birthdate: '08/16/1980',
          parentId: null,
          spouseId: null,
          children: [],
          lifePath: calculateLifePath('08/16/1980'),
          chaldeanNumber: calculateChaldeanNumber('Val'),
          westernZodiac: getWesternZodiac('08/16/1980'),
          chineseZodiac: getChineseZodiac('08/16/1980')
        },
        {
          id: '4',
          name: 'Mom',
          birthdate: '03/13/1962',
          parentId: null,
          spouseId: null,
          children: [],
          lifePath: calculateLifePath('03/13/1962'),
          chaldeanNumber: calculateChaldeanNumber('Mom'),
          westernZodiac: getWesternZodiac('03/13/1962'),
          chineseZodiac: getChineseZodiac('03/13/1962')
        },
        {
          id: '5',
          name: 'John',
          birthdate: '01/05/2000',
          parentId: null,
          spouseId: null,
          children: [],
          lifePath: calculateLifePath('01/05/2000'),
          chaldeanNumber: calculateChaldeanNumber('John'),
          westernZodiac: getWesternZodiac('01/05/2000'),
          chineseZodiac: getChineseZodiac('01/05/2000')
        }
      ];
      setFamilyMembers(sampleData);
    }
  }, [isLoading, familyMembers.length, setFamilyMembers]);

  // Memoized calculations
  const familyMemberMap = useMemo(() => {
    return new Map(familyMembers.map(member => [member.id, member]));
  }, [familyMembers]);

  const rootMembers = useMemo(() => {
    return familyMembers.filter(member => !member.parentId);
  }, [familyMembers]);

  // Event handlers
  const handleAddMember = useCallback(() => {
    if (!newMember.name.trim() || !newMember.birthdate.trim()) {
      alert('Please fill in both name and birthdate fields.');
      return;
    }

    if (!isValidDate(newMember.birthdate)) {
      alert('Please enter a valid date in MM/DD/YYYY format.');
      return;
    }
    
    const id = Date.now().toString();
    const member: FamilyMember = {
      id,
      name: newMember.name.trim(),
      birthdate: newMember.birthdate,
      parentId: newMember.parentId === 'none' ? null : newMember.parentId,
      spouseId: newMember.spouseId === 'none' ? null : newMember.spouseId,
      children: [],
      lifePath: calculateLifePath(newMember.birthdate),
      chaldeanNumber: calculateChaldeanNumber(newMember.name),
      westernZodiac: getWesternZodiac(newMember.birthdate),
      chineseZodiac: getChineseZodiac(newMember.birthdate)
    };
    
    setFamilyMembers(prevMembers => {
      const updatedMembers = [...prevMembers];
      
      // Update parent's children array
      if (member.parentId) {
        const parentIndex = updatedMembers.findIndex(m => m.id === member.parentId);
        if (parentIndex !== -1) {
          updatedMembers[parentIndex] = {
            ...updatedMembers[parentIndex],
            children: [...updatedMembers[parentIndex].children, id]
          };
        }
      }
      
      // Update spouse relationship
      if (member.spouseId) {
        const spouseIndex = updatedMembers.findIndex(m => m.id === member.spouseId);
        if (spouseIndex !== -1) {
          updatedMembers[spouseIndex] = {
            ...updatedMembers[spouseIndex],
            spouseId: id
          };
        }
      }
      
      return [...updatedMembers, member];
    });
    
    // Reset form
    setNewMember({
      name: '',
      birthdate: '',
      parentId: 'none',
      spouseId: 'none'
    });
  }, [newMember, setFamilyMembers]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleExportData = useCallback(() => {
    try {
      const dataStr = JSON.stringify(familyMembers, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', `family_tree_data_${new Date().toISOString().split('T')[0]}.json`);
      linkElement.click();
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data. Please try again.');
    }
  }, [familyMembers]);

  const handleImportData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedData) && importedData.every(item => 
          typeof item === 'object' && 
          item.id && 
          item.name && 
          item.birthdate
        )) {
          setFamilyMembers(importedData);
          alert('Data imported successfully!');
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Invalid data format. Please upload a valid JSON file exported from this application.');
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    e.target.value = '';
  }, [setFamilyMembers]);

  // Render family tree recursively
  const renderFamilyTree = useCallback((members: FamilyMember[], parentId: string | null = null, level = 0): React.ReactNode => {
    const children = members.filter(member => member.parentId === parentId);
    
    if (children.length === 0) return null;
    
    return (
      <div className="family-tree-level" style={{ marginLeft: `${level * 20}px` }}>
        {children.map(child => (
          <div key={child.id} className="flex flex-col items-center">
            <FamilyMemberCard member={child} />
            {renderFamilyTree(members, child.id, level + 1)}
          </div>
        ))}
      </div>
    );
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <p>Loading family tree...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
        Family Tree
      </h1>

      <div className="mb-8 flex flex-wrap gap-2">
        <TabButton isActive={activeTab === 'view'} onClick={() => setActiveTab('view')}>
          View Family Tree
        </TabButton>
        <TabButton isActive={activeTab === 'add'} onClick={() => setActiveTab('add')}>
          Add Family Member
        </TabButton>
        <TabButton isActive={activeTab === 'edit'} onClick={() => setActiveTab('edit')}>
          Edit Relationships
        </TabButton>
      </div>

      <div className="flex gap-2 mb-8">
        <button className="btn" onClick={handleExportData}>
          Export Data
        </button>
        <label className="btn cursor-pointer">
          Import Data
          <input 
            type="file" 
            accept=".json" 
            className="hidden" 
            onChange={handleImportData}
          />
        </label>
      </div>

      {activeTab === 'view' && (
        <div className="section-card">
          <h2 className="text-2xl font-semibold mb-4">Family Tree</h2>
          
          <div className="family-tree-container">
            {familyMembers.length > 0 ? (
              renderFamilyTree(familyMembers)
            ) : (
              <p>No family members added yet. Use the "Add Family Member" tab to get started.</p>
            )}
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">All Family Members ({familyMembers.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {familyMembers.map(member => (
                <FamilyMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'add' && (
        <div className="section-card">
          <h2 className="text-2xl font-semibold mb-4">Add New Family Member</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Name: *</label>
              <input
                type="text"
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-md"
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <label className="block mb-2">Birthdate (MM/DD/YYYY): *</label>
              <input
                type="text"
                name="birthdate"
                placeholder="MM/DD/YYYY"
                value={newMember.birthdate}
                onChange={handleInputChange}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-md"
              />
            </div>
            
            <div>
              <label className="block mb-2">Parent (optional):</label>
              <select
                name="parentId"
                value={newMember.parentId}
                onChange={handleInputChange}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-md"
              >
                <option value="none">None</option>
                {familyMembers.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2">Spouse (optional):</label>
              <select
                name="spouseId"
                value={newMember.spouseId}
                onChange={handleInputChange}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-md"
              >
                <option value="none">None</option>
                {familyMembers
                  .filter(member => member.id !== newMember.parentId) // Can't marry parent
                  .map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          
          <button 
            className="btn-primary mt-6"
            onClick={handleAddMember}
          >
            Add Member
          </button>
          
          <div className="mt-8 p-4 bg-white/5 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Automatic Calculations</h3>
            <p className="mb-4">When you add a new family member, the following will be automatically calculated:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Life Path Number (Pythagorean)</li>
              <li>Chaldean Number</li>
              <li>Western Zodiac Sign</li>
              <li>Chinese Zodiac Sign</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'edit' && (
        <div className="section-card">
          <h2 className="text-2xl font-semibold mb-4">Edit Relationships</h2>
          
          <p className="mb-6">
            This feature allows you to edit parent-child and spouse relationships between family members.
            Currently, relationships can be established when adding new members. Advanced relationship
            editing will be available in a future update.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">Current Relationships</h3>
          
          <div className="space-y-6">
            {familyMembers.map(member => (
              <div key={member.id} className="p-4 bg-white/5 rounded-md">
                <h4 className="text-lg font-semibold">{member.name}</h4>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Parent:</h5>
                    <p>
                      {member.parentId 
                        ? familyMemberMap.get(member.parentId)?.name || 'Unknown'
                        : 'None'}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Spouse:</h5>
                    <p>
                      {member.spouseId 
                        ? familyMemberMap.get(member.spouseId)?.name || 'Unknown'
                        : 'None'}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Children:</h5>
                    {member.children.length > 0 ? (
                      <ul className="list-disc pl-6">
                        {member.children.map(childId => (
                          <li key={childId}>
                            {familyMemberMap.get(childId)?.name || 'Unknown'}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>None</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Link href="/" className="btn">
          Back to Home
        </Link>
        <Link href="/chaldean" className="btn-primary">
          Explore Chaldean Numerology
        </Link>
      </div>
    </div>
  );
}
