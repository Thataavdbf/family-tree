'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define the family member type
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

export default function FamilyTreePage() {
  const [activeTab, setActiveTab] = useState('view');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [newMember, setNewMember] = useState({
    name: '',
    birthdate: '',
    parentId: 'none',
    spouseId: 'none'
  });

  // Initialize with sample data or load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('familyTreeData');
    if (savedData) {
      setFamilyMembers(JSON.parse(savedData));
    } else {
      // Sample data
      const sampleData: FamilyMember[] = [
        {
          id: '1',
          name: 'Tyler',
          birthdate: '06/02/1988',
          parentId: null,
          spouseId: null,
          children: [],
          lifePath: 7,
          chaldeanNumber: 5,
          westernZodiac: 'Gemini',
          chineseZodiac: 'Dragon'
        },
        {
          id: '2',
          name: 'Bri',
          birthdate: '06/23/1986',
          parentId: null,
          spouseId: null,
          children: [],
          lifePath: 8,
          chaldeanNumber: 6,
          westernZodiac: 'Cancer',
          chineseZodiac: 'Tiger'
        },
        {
          id: '3',
          name: 'Val',
          birthdate: '08/16/1980',
          parentId: null,
          spouseId: null,
          children: [],
          lifePath: 6,
          chaldeanNumber: 4,
          westernZodiac: 'Leo',
          chineseZodiac: 'Monkey'
        },
        {
          id: '4',
          name: 'Mom',
          birthdate: '03/13/1962',
          parentId: null,
          spouseId: null,
          children: [],
          lifePath: 7,
          chaldeanNumber: 5,
          westernZodiac: 'Pisces',
          chineseZodiac: 'Tiger'
        },
        {
          id: '5',
          name: 'John',
          birthdate: '01/05/2000',
          parentId: null,
          spouseId: null,
          children: [],
          lifePath: 8,
          chaldeanNumber: 7,
          westernZodiac: 'Capricorn',
          chineseZodiac: 'Dragon'
        }
      ];
      setFamilyMembers(sampleData);
      localStorage.setItem('familyTreeData', JSON.stringify(sampleData));
    }
  }, []);

  // Save to localStorage whenever family members change
  useEffect(() => {
    if (familyMembers.length > 0) {
      localStorage.setItem('familyTreeData', JSON.stringify(familyMembers));
    }
  }, [familyMembers]);

  // Calculate Life Path Number (Pythagorean)
  const calculateLifePath = (birthdate: string): number => {
    if (!birthdate || !birthdate.match(/^\d{2}\/\d{2}\/\d{4}$/)) return 0;
    
    const [month, day, year] = birthdate.split('/').map(part => parseInt(part, 10));
    
    // Reduce month to single digit
    let monthNum = month;
    while (monthNum > 9 && monthNum !== 11 && monthNum !== 22 && monthNum !== 33) {
      monthNum = monthNum.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }
    
    // Reduce day to single digit
    let dayNum = day;
    while (dayNum > 9 && dayNum !== 11 && dayNum !== 22 && dayNum !== 33) {
      dayNum = dayNum.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }
    
    // Reduce year to single digit
    let yearNum = year;
    while (yearNum > 9 && yearNum !== 11 && yearNum !== 22 && yearNum !== 33) {
      yearNum = yearNum.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }
    
    // Add all reduced numbers
    let lifePath = monthNum + dayNum + yearNum;
    
    // Final reduction to single digit or master number
    while (lifePath > 9 && lifePath !== 11 && lifePath !== 22 && lifePath !== 33) {
      lifePath = lifePath.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }
    
    return lifePath;
  };

  // Calculate Chaldean Number
  const calculateChaldeanNumber = (name: string): number => {
    if (!name) return 0;
    
    // Chaldean number chart
    const chaldeanChart: {[key: string]: number} = {
      'a': 1, 'i': 1, 'j': 1, 'q': 1, 'y': 1,
      'b': 2, 'k': 2, 'r': 2,
      'c': 3, 'g': 3, 'l': 3, 's': 3,
      'd': 4, 'm': 4, 't': 4,
      'e': 5, 'h': 5, 'n': 5, 'x': 5,
      'u': 6, 'v': 6, 'w': 6,
      'o': 7, 'z': 7,
      'f': 8, 'p': 8
    };
    
    // Calculate the sum of all letters
    const nameSum = name.toLowerCase().split('')
      .filter(char => /[a-z]/.test(char))
      .reduce((sum, char) => sum + (chaldeanChart[char] || 0), 0);
    
    // In Chaldean numerology, compound numbers have special meanings
    // We'll return the compound number if it's significant, otherwise reduce to single digit
    if ([10, 11, 12, 13, 14, 15, 16, 19, 22, 33].includes(nameSum)) {
      return nameSum;
    }
    
    // Reduce to single digit
    let result = nameSum;
    while (result > 9) {
      result = result.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }
    
    return result;
  };

  // Determine Western Zodiac sign
  const getWesternZodiac = (birthdate: string): string => {
    if (!birthdate || !birthdate.match(/^\d{2}\/\d{2}\/\d{4}$/)) return '';
    
    const [month, day] = birthdate.split('/').map(part => parseInt(part, 10));
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    return 'Pisces';
  };

  // Determine Chinese Zodiac sign
  const getChineseZodiac = (birthdate: string): string => {
    if (!birthdate || !birthdate.match(/^\d{2}\/\d{2}\/\d{4}$/)) return '';
    
    const year = parseInt(birthdate.split('/')[2], 10);
    const zodiacSigns = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep/Goat'];
    
    return zodiacSigns[(year - 4) % 12];
  };

  // Handle adding a new family member
  const handleAddMember = () => {
    if (!newMember.name || !newMember.birthdate) return;
    
    const id = Date.now().toString();
    const lifePath = calculateLifePath(newMember.birthdate);
    const chaldeanNumber = calculateChaldeanNumber(newMember.name);
    const westernZodiac = getWesternZodiac(newMember.birthdate);
    const chineseZodiac = getChineseZodiac(newMember.birthdate);
    
    const member: FamilyMember = {
      id,
      name: newMember.name,
      birthdate: newMember.birthdate,
      parentId: newMember.parentId === 'none' ? null : newMember.parentId,
      spouseId: newMember.spouseId === 'none' ? null : newMember.spouseId,
      children: [],
      lifePath,
      chaldeanNumber,
      westernZodiac,
      chineseZodiac
    };
    
    // Update parent's children array if parent is selected
    const updatedMembers = [...familyMembers];
    if (member.parentId) {
      const parentIndex = updatedMembers.findIndex(m => m.id === member.parentId);
      if (parentIndex !== -1) {
        updatedMembers[parentIndex].children.push(id);
      }
    }
    
    // Update spouse relationship if spouse is selected
    if (member.spouseId) {
      const spouseIndex = updatedMembers.findIndex(m => m.id === member.spouseId);
      if (spouseIndex !== -1) {
        updatedMembers[spouseIndex].spouseId = id;
      }
    }
    
    setFamilyMembers([...updatedMembers, member]);
    setNewMember({
      name: '',
      birthdate: '',
      parentId: 'none',
      spouseId: 'none'
    });
  };

  // Handle input changes for new member form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMember({
      ...newMember,
      [name]: value
    });
  };

  // Export data as JSON
  const handleExportData = () => {
    const dataStr = JSON.stringify(familyMembers, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = 'family_tree_data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import data from JSON file
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedData)) {
          setFamilyMembers(importedData);
          localStorage.setItem('familyTreeData', JSON.stringify(importedData));
        }
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Invalid data format. Please upload a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Render family tree recursively
  const renderFamilyTree = (members: FamilyMember[], parentId: string | null = null, level = 0) => {
    const children = members.filter(member => member.parentId === parentId);
    
    if (children.length === 0) return null;
    
    return (
      <div className="family-tree-level" style={{ marginLeft: `${level * 20}px` }}>
        {children.map(child => (
          <div key={child.id} className="flex flex-col items-center">
            <div className="family-member-card">
              <h3 className="text-lg font-semibold">{child.name}</h3>
              <div className="flex flex-wrap gap-1 mt-2">
                <span className={`tag tag-life-path-${child.lifePath}`}>Life Path {child.lifePath}</span>
                <span className={`tag tag-chaldean-${child.chaldeanNumber}`}>Chaldean {child.chaldeanNumber}</span>
              </div>
              <div className="mt-2 text-sm">
                <span className="tag">{child.westernZodiac}</span>
                <span className="tag ml-1">{child.chineseZodiac}</span>
              </div>
              <p className="mt-2 text-xs opacity-70">{child.birthdate}</p>
            </div>
            
            {renderFamilyTree(members, child.id, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
        Family Tree
      </h1>

      <div className="mb-8 flex flex-wrap gap-2">
        <button 
          className={`tab-button ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          View Family Tree
        </button>
        <button 
          className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Family Member
        </button>
        <button 
          className={`tab-button ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Relationships
        </button>
      </div>

      <div className="flex gap-2 mb-8">
        <button 
          className="btn"
          onClick={handleExportData}
        >
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
            <h3 className="text-xl font-semibold mb-4">All Family Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {familyMembers.map(member => (
                <div key={member.id} className="family-member-card">
                  <h4 className="text-lg font-semibold">{member.name}</h4>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className={`tag tag-life-path-${member.lifePath}`}>Life Path {member.lifePath}</span>
                    <span className={`tag tag-chaldean-${member.chaldeanNumber}`}>Chaldean {member.chaldeanNumber}</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="tag">{member.westernZodiac}</span>
                    <span className="tag ml-1">{member.chineseZodiac}</span>
                  </div>
                  <p className="mt-2 text-xs opacity-70">{member.birthdate}</p>
                </div>
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
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-md"
              />
            </div>
            
            <div>
              <label className="block mb-2">Birthdate (MM/DD/YYYY):</label>
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
                  <option key={member.id} value={member.id}>{member.name}</option>
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
                {familyMembers.map(member => (
                  <option key={member.id} value={member.id}>{member.name}</option>
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
                        ? familyMembers.find(m => m.id === member.parentId)?.name || 'Unknown'
                        : 'None'}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Spouse:</h5>
                    <p>
                      {member.spouseId 
                        ? familyMembers.find(m => m.id === member.spouseId)?.name || 'Unknown'
                        : 'None'}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Children:</h5>
                    {member.children.length > 0 ? (
                      <ul className="list-disc pl-6">
                        {member.children.map(childId => (
                          <li key={childId}>
                            {familyMembers.find(m => m.id === childId)?.name || 'Unknown'}
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
