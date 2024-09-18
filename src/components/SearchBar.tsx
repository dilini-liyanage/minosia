'use client';
import React, { useState } from 'react';

import { Paperclip } from 'lucide-react';
import Image from 'next/image';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const focusOptions = [
  {
    id: 'regulatory',
    label: 'Regulatory Approval',
    description:
      'Retrieve information on the approval status of drugs or medical devices across different regions.',
    imgSrc: '/searchbar/regulatory-approval.svg',
  },
  {
    id: 'pricing',
    label: 'Pricing and Reimbursement',
    description:
      'Provide details on the pricing and reimbursement status of drugs in various countries.',
    imgSrc: '/searchbar/pricing-and-reimbursement.svg',
  },
  {
    id: 'clinical',
    label: 'Clinical Trials',
    description:
      'Access information about ongoing or completed clinical trials for specific drugs or conditions.',
    imgSrc: '/searchbar/clinical-trials.svg',
  },
  {
    id: 'surveillance',
    label: 'Post-Market Surveillance',
    description:
      'Get insights on post-market safety data or surveillance issues related to a drug or device.',
    imgSrc: '/searchbar/post-market-surveillance.svg',
  },
  {
    id: 'academic',
    label: 'Academic',
    description:
      'Search for relevant academic publications and research on regulatory and market access topics.',
    imgSrc: '/searchbar/academic.svg',
  },
];
interface SearchBarProps {
  onSendMessage: (message: string) => void;
}

export function SearchBar({ onSendMessage }: SearchBarProps) {
  const [searchInternet, setSearchInternet] = useState(false);
  const [focusOption, setFocusOption] = useState('Focus');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-[#F9F9FB] p-4 mt-8">
      <div className="flex justify-between gap-3 mb-4">
        <Textarea
          placeholder="Send a message to Minosia"
          className="border-none text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Paperclip className="text-gray-400 self-stretch" />
      </div>
      <div className="flex justify-between space-x-4">
        <div className="flex items-center space-x-8">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex gap-2 items-center bg-[#F0F0F2] p-1 px-3 rounded-full">
                <Image
                  src="/icons/focus-menu.svg"
                  alt="focus-menu"
                  width={24}
                  height={24}
                />
                <span className="text-sm font-normal text-gray-700">
                  {focusOption}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[90vh] mb-4 p-0"
              align="start"
              sideOffset={5}
            >
              <div className="grid grid-cols-3 gap-0 ">
                {focusOptions.map((option) => (
                  <button
                    key={option.id}
                    className="text-left p-3 hover:bg-gray-100 hover:rounded-lg m-2 transition-colors"
                    onClick={() => setFocusOption(option.label)}
                  >
                    <div className="flex gap-2 mb-1">
                      <Image
                        src={option.imgSrc}
                        alt="arrow-up"
                        width={12}
                        height={12}
                      />
                      <div className="text-sm font-semibold">
                        {option.label}
                      </div>
                    </div>

                    <div className="text-xs font-normal text-gray-500">
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex gap-2">
            <Switch
              checked={searchInternet}
              onCheckedChange={setSearchInternet}
            />
            <span className="text-sm font-normal text-gray-700">
              Search Internet
            </span>
          </div>
        </div>
        <button
          className="flex justify-center items-center rounded-full bg-[#1E2124] w-[26px] h-[26px] p-0"
          onClick={handleSendMessage}
        >
          <Image
            src="/icons/arrow-up.svg"
            alt="arrow-up"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
}
