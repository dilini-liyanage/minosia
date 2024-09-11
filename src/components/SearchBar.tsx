'use client';
import React, { useState } from 'react';

import { Paperclip } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export function SearchBar() {
  const [searchInternet, setSearchInternet] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-[#F9F9FB] p-4 mt-8">
      <div className="flex justify-between gap-3 mb-4">
        <Textarea
          placeholder="Send a message to Minosia"
          className="border-none"
        />
        <Paperclip className="text-gray-400 self-stretch" />
      </div>
      <div className="flex justify-between space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Focus</span>
          <Switch
            checked={searchInternet}
            onCheckedChange={setSearchInternet}
          />
        </div>
        <Button className="rounded-l-none bg-[#1E2124] hover:bg-[#2C3036] text-white">
          Search
        </Button>
      </div>
      <div className="flex justify-between">
        {/* <Button className="rounded-l-none bg-[#1E2124] hover:bg-[#2C3036] text-white">
          Search
        </Button> */}
      </div>
    </div>
  );
}
