'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import alert from '../../../public/sidebar/alerts.svg';
import assistantGradient from '../../../public/sidebar/assistant-gradient.svg';
import library from '../../../public/sidebar/library-gradient.svg';
import regulationReviewGradient from '../../../public/sidebar/regulation-review-gradient.svg';

interface HeaderInfo {
  title: string;
  icon: string;
  time: number;
}

export function Header() {
  const pathname = usePathname();

  const getHeaderInfo = (): HeaderInfo => {
    switch (pathname) {
      case '/assistant':
        return { title: 'Assistant', icon: assistantGradient, time: 20 };
      case '/regulation-review':
        return {
          title: 'Regulation Review',
          icon: regulationReviewGradient,
          time: 5,
        };
      case '/library':
        return { title: 'Library', icon: library, time: 10 };
      case '/alerts':
        return { title: 'Alerts', icon: alert, time: 20 };
      default:
        return { title: 'Assistant', icon: assistantGradient, time: 20 };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <header>
      <div className="bg-[#F9F9FB] py-3 border-b border-[#F1F1F3] px-4">
        <div className="flex items-center">
          <Image
            src={headerInfo.icon}
            alt={headerInfo.title}
            width={24}
            height={24}
            className="h-[24px] w-[24px]"
          />
          <h1 className="text-sm font-semibold ml-2">{headerInfo.title}</h1>
          <span className="ms-5 text-sm text-[#1E1E1E]">
            {headerInfo.time} Hours ago
          </span>
        </div>
      </div>
    </header>
  );
}
