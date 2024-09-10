'use client';

import React, { useState } from 'react';

import { Menu, X, FileText, BookOpen, Settings } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`bg-white border-r transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'} flex flex-col`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="self-end m-2"
        onClick={toggleSidebar}
      >
        {isExpanded ? <X size={24} /> : <Menu size={24} />}
      </Button>
      <nav className="flex-1 px-4 font-semibold">
        <SidebarLink
          href="/regulation-review"
          icon={<FileText />}
          text="Assistant"
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/library"
          icon={<BookOpen />}
          text="Regulation Review"
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/library"
          icon={<BookOpen />}
          text="Library"
          isExpanded={isExpanded}
        />
      </nav>
      <SidebarLink
        href="/settings"
        icon={<Settings />}
        text="Settings"
        isExpanded={isExpanded}
      />
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
  icon: React.ReactNode;
  text: string;
  isExpanded: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center p-2 hover:bg-gray-100 ${isExpanded ? 'justify-start' : 'justify-center'}`}
    >
      {icon}
      {isExpanded && <span className="ml-2">{text}</span>}
    </Link>
  );
}
