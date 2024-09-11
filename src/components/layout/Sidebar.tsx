'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import assistant from '../../../public/sidebar/assistant.svg';
import library from '../../../public/sidebar/library.svg';
import menuIcon from '../../../public/sidebar/menu-icon.svg';
import regulationReview from '../../../public/sidebar/regulation-review.svg';
import settings from '../../../public/sidebar/settings.svg';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`bg-white border-r px-2 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'} flex flex-col`}
    >
      <Button
        variant="ghost"
        size="icon"
        className={`${isExpanded ? 'self-end' : 'self-center'} my-4`}
        onClick={toggleSidebar}
      >
        <Image src={menuIcon} alt="Menu" width={28} height={28} />
      </Button>
      <nav className="flex-1 space-y-3 font-semibold">
        <SidebarLink
          href="/regulation-review"
          icon={assistant}
          text="Assistant"
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/library"
          icon={regulationReview}
          text="Regulation Review"
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/library"
          icon={library}
          text="Library"
          isExpanded={isExpanded}
        />
      </nav>
      <div className="mb-4">
        <SidebarLink
          href="/settings"
          icon={settings}
          text="Settings"
          isExpanded={isExpanded}
        />
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  text,
  isExpanded,
}: {
  href: string;
  icon: string;
  text: string;
  isExpanded: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center p-2 hover:bg-custom-hover-gradient hover:rounded-lg hover:shadow-lg ${isExpanded ? 'justify-start' : 'justify-center'}`}
    >
      <Image src={icon} alt={text} width={24} height={24} />
      {isExpanded && <span className="ml-2">{text}</span>}
    </Link>
  );
}
