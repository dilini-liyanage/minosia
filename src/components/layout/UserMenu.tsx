import React from 'react';

import { ChevronDown } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center bg-white rounded-xl py-1 px-2 border border-gray-300 outline-none">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarFallback className="bg-primary text-primary-foreground">
            MA
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-gray-700 mr-2">
          Maya@pharmaspace.com
        </span>
        <ChevronDown size={16} className="text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
