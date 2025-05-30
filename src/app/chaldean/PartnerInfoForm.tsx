// src/app/chaldean/PartnerInfoForm.tsx
import React, { useState } from 'react';
import { usePartnerInfo } from './PartnerInfoContext';
import { Dialog } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function PartnerInfoForm() {
  const { partnerInfo, setPartnerInfo } = usePartnerInfo();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(partnerInfo.name);
  const [birthdate, setBirthdate] = useState(partnerInfo.birthdate);

  const handleSave = () => {
    setPartnerInfo({ name, birthdate });
    setOpen(false);
  };

  return (
    <>
      <Button variant="outline" className="mb-4" onClick={() => setOpen(true)}>
        Set Partner/Friend Info
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="p-6 bg-white rounded shadow max-w-sm mx-auto">
          <h2 className="text-xl font-bold mb-4">Partner/Friend Info</h2>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Birthdate</label>
            <Input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!name || !birthdate}>Save</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
