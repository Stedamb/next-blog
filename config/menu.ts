import { Code2, Home, Mail, User } from 'lucide-react';

export const menuItems = [
  { 
    href: '/', 
    label: 'Home',
    Icon: Home,
  },
  { 
    href: '/blog', 
    label: 'Blog',
    Icon: User,
  },
  { 
    href: '/projects', 
    label: 'Projects',
    Icon: Code2,
  },
  {
    href: '/contact',
    label: 'Contact',
    Icon: Mail,
  },
] as const;
