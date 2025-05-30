// src/app/chaldean/UserInfoForm.tsx
'use client';
import React, { useState } from 'react';
import { useUserInfo } from './UserInfoContext';

export default function UserInfoForm() {
  const { userInfo, setUserInfo } = useUserInfo();
  const [name, setName] = useState(userInfo.name);
  const [birthdate, setBirthdate] = useState(userInfo.birthdate);
  const [show, setShow] = useState(!userInfo.name || !userInfo.birthdate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserInfo({ name, birthdate });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Enter Your Info</h2>
        <label className="block mb-2">Name
          <input
            className="w-full border rounded px-2 py-1 mt-1"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">Birthdate (MM/DD/YYYY)
          <input
            className="w-full border rounded px-2 py-1 mt-1"
            value={birthdate}
            onChange={e => setBirthdate(e.target.value)}
            pattern="\d{2}/\d{2}/\d{4}"
            required
          />
        </label>
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Save</button>
      </form>
    </div>
  );
}
