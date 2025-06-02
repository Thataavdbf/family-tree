"use client";
import React, { useEffect, useState } from 'react';

type UserInfo = {
  id: number;
  name: string;
  birthdate: string;
  birthplace?: string;
  birthtime?: string;
  createdAt: string;
};

export default function ProfilesPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserInfo() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/user-info');
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        const user = data as UserInfo;
        setUserInfo(user && user.id ? user : null);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="section-title">Profiles</h1>
      <div className="section-card">
        {loading && <p>Loading profile...</p>}
        {error && <p style={{ color: '#ff2222' }}>Error: {error}</p>}
        {!loading && !error && userInfo && (
          <div>
            <h2 className="text-xl font-bold mb-4">Your Profile</h2>
            <ul className="space-y-2">
              <li><strong>Name:</strong> {userInfo.name}</li>
              <li><strong>Date of Birth:</strong> {userInfo.birthdate}</li>
              {userInfo.birthplace && <li><strong>Birthplace:</strong> {userInfo.birthplace}</li>}
              {userInfo.birthtime && <li><strong>Time of Birth:</strong> {userInfo.birthtime}</li>}
              <li><strong>Created:</strong> {new Date(userInfo.createdAt).toLocaleString()}</li>
            </ul>
          </div>
        )}
        {!loading && !error && !userInfo && (
          <p>No profile found. Please complete onboarding.</p>
        )}
      </div>
    </div>
  );
}
