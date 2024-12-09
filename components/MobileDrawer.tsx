'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { menuItems } from '@/config/menu';

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className="p-6 rounded-full hover:bg-foreground/5 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </DrawerTrigger>
      <DrawerHeader className="hidden">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
      <DrawerContent>
        <div className="p-6">
          <ul className="flex flex-col gap-4">
            {menuItems.map(({ href, label, Icon }) => (
              <li key={href} className="w-full">
                <DrawerClose asChild>
                  <Link
                    href={href}
                    className="w-full p-6 rounded-xl hover:bg-foreground/5 flex items-center gap-4 text-lg font-medium font-mono"
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                    {label}
                  </Link>
                </DrawerClose>
              </li>
            ))}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
