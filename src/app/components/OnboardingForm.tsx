

"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingForm() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Optionally, collect and store user info here
    router.push('/profiles');
  }

  return (
    <form className="flex flex-col gap-7 items-center max-w-md mx-auto p-6" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name" className="text-lg font-semibold">Your Name</label>
        <input id="name" name="name" type="text" className="w-full p-3 rounded bg-black border border-purple-700 text-white" placeholder="Enter your name" required />
      </div>

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="dob" className="text-lg font-semibold">Date of Birth</label>
        <input id="dob" name="dob" type="date" className="w-full p-3 rounded bg-black border border-purple-700 text-white" required />
      </div>

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="birthplace" className="text-lg font-semibold">Birthplace (City, State) <span className="text-xs">(optional)</span></label>
        <input id="birthplace" name="birthplace" type="text" className="w-full p-3 rounded bg-black border border-purple-700 text-white" placeholder="e.g. Chicago, IL" />
      </div>

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="birthtime" className="text-lg font-semibold">Time of Birth <span className="text-xs">(optional)</span></label>
        <input id="birthtime" name="birthtime" type="time" className="w-full p-3 rounded bg-black border border-purple-700 text-white" />
      </div>

      <button type="submit" className="btn-primary mt-6 text-lg py-3 px-8">Start Exploring</button>
    </form>
  );
}
