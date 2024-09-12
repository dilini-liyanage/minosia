'use client';
import React, { useState } from 'react';

import { Paperclip } from 'lucide-react';
import Image from 'next/image';

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
      <div className="flex justify-between space-x-4">
        <div className="flex items-center space-x-8">
          <div className="flex gap-2">
            <Image
              src="/icons/focus-menu.svg"
              alt="focus-menu"
              width={24}
              height={24}
            />
            <span className="text-sm font-medium text-gray-700">Focus</span>
          </div>
          <div className="flex gap-2">
            <Switch
              checked={searchInternet}
              onCheckedChange={setSearchInternet}
            />
            <span className="text-sm font-medium text-gray-700">
              Search Internet
            </span>
          </div>
        </div>
        <button className="rounded-full bg-[#1E2124] p-2">
          <Image
            src="/icons/arrow-up.svg"
            alt="arrow-up"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
