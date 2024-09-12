'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import alert from '../../../public/sidebar/alerts.svg';
import assistant from '../../../public/sidebar/assistant.svg';
import library from '../../../public/sidebar/library-gradient.svg';
import regulationReview from '../../../public/sidebar/regulation-review.svg';

interface HeaderInfo {
  title: string;
  icon: string;
}

export function Header() {
  const pathname = usePathname();

  const getHeaderInfo = (): HeaderInfo => {
    switch (pathname) {
      case '/assistant':
        return { title: 'Assistant', icon: assistant };
      case '/regulation-review':
        return { title: 'Regulation Review', icon: regulationReview };
      case '/library':
        return { title: 'Library', icon: library };
      case '/alerts':
        return { title: 'Alerts', icon: alert };
      default:
        return { title: 'Assistant', icon: assistant };
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
          />
          <h1 className="text-xl font-semibold ml-3">{headerInfo.title}</h1>
        </div>
      </div>
    </header>
  );
}
