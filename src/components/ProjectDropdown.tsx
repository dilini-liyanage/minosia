'use client';
import React, { useState } from 'react';

import { ChevronUp, ChevronDown } from 'lucide-react';

interface Project {
  id: number;
  title: string;
}

const projects: Project[] = [
  { id: 0, title: 'Project 1' },
  { id: 1, title: 'Project 2' },
  { id: 2, title: 'Project 3' },
  { id: 3, title: 'Project 4' },
  // Add more projects as needed
];

export function ProjectDropdown(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const navigateUp = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const navigateDown = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < projects.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div className="bg-[#F9F9FB] rounded-lg border border-[#F1F1F3] p-1 px-3 w-full">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs text-gray-500 font-light pt-1">
            Selected Project
          </div>
          <div className="text-sm font-semibold">
            {projects[currentIndex].title}
          </div>
        </div>

        <div className="flex flex-col">
          <button
            onClick={navigateUp}
            className=""
            disabled={currentIndex === 0}
          >
            <ChevronUp
              size={20}
              className={currentIndex === 0 ? 'text-gray-300' : 'text-gray-600'}
            />
          </button>
          <button
            onClick={navigateDown}
            className=""
            disabled={currentIndex === projects.length - 1}
          >
            <ChevronDown
              size={20}
              className={
                currentIndex === projects.length - 1
                  ? 'text-gray-300'
                  : 'text-gray-600'
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}
