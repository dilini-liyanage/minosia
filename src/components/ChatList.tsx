import React from 'react';

import { MoreVertical, Share, Edit, Archive, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Task {
  id: string;
  name: string;
}

interface TaskGroup {
  date: string;
  tasks: Task[];
}

const TaskItem: React.FC<Task> = ({ name }) => (
  <div className="flex items-center justify-between p-1 border-gray-700 hover:bg-custom-hover-gradient hover:rounded-lg active:bg-custom-hover-gradient active:rounded-lg">
    <p className="text-black text-sm font-semibold truncate flex-1 min-w-0 mr-4">
      {name}
    </p>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 bg-white hover:bg-none">
        <DropdownMenuItem className="text-red-500">
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const TaskGroup: React.FC<TaskGroup> = ({ date, tasks }) => (
  <div className="mb-2 ">
    <p className="text-xs text-[#4A4A4A] font-semibold mb-1">{date}</p>
    {tasks.map((task) => (
      <TaskItem key={task.id} {...task} />
    ))}
  </div>
);

const ChatList = () => {
  const taskGroups: TaskGroup[] = [
    {
      date: 'Today',
      tasks: [
        { id: '1', name: 'Grammar Correction Request' },
        { id: '2', name: 'Code Review for Project X' },
        { id: '3', name: 'Grammar Correction Request' },
        { id: '4', name: 'Code Review for Project X' },
        { id: '1', name: 'Grammar Correction Request' },
        { id: '2', name: 'Code Review for Project X' },
        { id: '3', name: 'Grammar Correction Request' },
        { id: '4', name: 'Code Review for Project X' },
        { id: '1', name: 'Grammar Correction Request' },
        { id: '2', name: 'Code Review for Project X' },
        { id: '3', name: 'Grammar Correction Request' },
        { id: '4', name: 'Code Review for Project X' },
        { id: '1', name: 'Grammar Correction Request' },
        { id: '2', name: 'Code Review for Project X' },
        { id: '3', name: 'Grammar Correction Request' },
        { id: '4', name: 'Code Review for Project X' },
      ],
    },
    {
      date: 'Yesterday',
      tasks: [{ id: '1', name: 'Grammar Correction Request' }],
    },
  ];

  return (
    <div className="text-black">
      {taskGroups.map((group, index) => (
        <TaskGroup key={index} {...group} />
      ))}
    </div>
  );
};

export default ChatList;
