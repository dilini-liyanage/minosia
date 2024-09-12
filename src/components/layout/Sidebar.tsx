'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import alert from '../../../public/sidebar/alerts.svg';
import assistant from '../../../public/sidebar/assistant.svg';
import library from '../../../public/sidebar/library.svg';
import menuIcon from '../../../public/sidebar/menu-icon.svg';
import regulationReview from '../../../public/sidebar/regulation-review.svg';
import settings from '../../../public/sidebar/settings.svg';
import { ProjectDropdown } from '../ProjectDropdown';
import { Separator } from '../ui/separator';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`bg-white border-r transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'} flex flex-col`}
    >
      <div
        className={`flex ${isExpanded ? 'justify-between' : 'justify-center'} my-3 mb-5 px-3`}
      >
        {isExpanded && (
          <div className="flex items-center gap-1">
            <Image
              src="/logo/logo-white.svg"
              alt="arrow-up"
              width={32}
              height={32}
              className="bg-[#5664D2] p-1.5 m-1 rounded-sm"
            />
            <span className="text-2xl font-bold">Minosia</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Image src={menuIcon} alt="Menu" width={28} height={28} />
        </Button>
      </div>
      <div className="px-3 py-4">{isExpanded && <ProjectDropdown />}</div>
      <div className="flex-1 ">
        <nav className="space-y-3 font-semibold px-3">
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
          <SidebarLink
            href="/library"
            icon={alert}
            text="Allert"
            isExpanded={isExpanded}
          />
        </nav>
        <Separator className="my-4" />
      </div>

      <div className="flex flex-col gap-3 mb-3">
        <div className="px-3">
          <div className="flex border border-gray-300 rounded-lg py-2 px-2 items-center">
            <Avatar className="h-7 w-7 self-center">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm p-1">
                MA
              </AvatarFallback>
            </Avatar>
            {isExpanded && (
              <span className="text-sm font-medium text-gray-700 ms-2">
                Maya@pharmaspace.com
              </span>
            )}
          </div>
        </div>
        <Separator />
        <div className="px-3">
          <SidebarLink
            href="/settings"
            icon={settings}
            text="Settings"
            isExpanded={isExpanded}
          />
        </div>
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
      className={`flex items-center p-2 hover:bg-[#73A1E5] hover:bg-opacity-10 hover:rounded-lg hover:shadow-lg ${isExpanded ? 'justify-start' : 'justify-center'}`}
    >
      <Image src={icon} alt={text} width={24} height={24} />
      {isExpanded && <span className="ml-3">{text}</span>}
    </Link>
  );
}
