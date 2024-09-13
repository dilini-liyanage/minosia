'use client';

import React, { useState, useCallback } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import alert from '../../../public/sidebar/alerts.svg';
import assistantGradient from '../../../public/sidebar/assistant-copy.svg';
import assistant from '../../../public/sidebar/assistant.svg';
import libraryGradient from '../../../public/sidebar/library-gradient.svg';
import library from '../../../public/sidebar/library.svg';
import menuIcon from '../../../public/sidebar/menu-icon.svg';
import regulationReviewGradient from '../../../public/sidebar/regulation-review-copy.svg';
import regulationReview from '../../../public/sidebar/regulation-review.svg';
import settings from '../../../public/sidebar/settings.svg';
import { ProjectDropdown } from '../ProjectDropdown';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`bg-white border-r transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      } flex flex-col`}
    >
      <div
        className={`flex ${
          isExpanded ? 'justify-between' : 'justify-center'
        } my-3 mb-5 px-3`}
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
      <div className="flex-1">
        <nav className="space-y-3 font-semibold px-3">
          <SidebarLink
            href="/assistant"
            icon={assistant}
            gradientIcon={assistantGradient}
            text="Assistant"
            iconAlt="Assistant icon"
            isExpanded={isExpanded}
          />
          <SidebarLink
            href="/regulation-review"
            icon={regulationReview}
            gradientIcon={regulationReviewGradient}
            text="Regulation Review"
            iconAlt="Regulation Review icon"
            isExpanded={isExpanded}
          />
          <SidebarLink
            href="/library"
            icon={library}
            gradientIcon={libraryGradient}
            text="Library"
            iconAlt="Library icon"
            isExpanded={isExpanded}
          />
          <SidebarLink
            href="/alerts"
            icon={alert}
            text="Alerts"
            iconAlt="Alerts icon"
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
            iconAlt="Settings icon"
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
  gradientIcon,
  text,
  iconAlt,
  isExpanded,
}: {
  href: string;
  icon: string;
  gradientIcon?: string;
  text: string;
  iconAlt: string;
  isExpanded: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const iconSrc = (isHovered || isActive) && gradientIcon ? gradientIcon : icon;

  return (
    <Link
      href={href}
      className={`flex items-center p-2 hover:bg-custom-hover-gradient hover:bg-opacity-10 hover:rounded-lg hover:shadow-lg ${
        isExpanded ? 'justify-start' : 'justify-center'
      } ${isActive ? 'bg-custom-hover-gradient bg-opacity-10 rounded-lg shadow-lg' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image src={iconSrc} alt={iconAlt} width={24} height={24} />
      {isExpanded && <span className="ml-3">{text}</span>}
    </Link>
  );
}
