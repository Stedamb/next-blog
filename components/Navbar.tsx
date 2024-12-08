import Link from 'next/link';
import { ThemeSwitch } from './ThemeSwitch';
import { MobileDrawer } from './MobileDrawer';
import { menuItems } from '@/config/menu';
import { LoginMenu } from './LoginMenu';

export function Navbar() {
    return (
        <nav
            className={`fixed z-50 left-1/2 -translate-x-1/2 top-8 p-2 
        bg-white/60 dark:bg-background/60 backdrop-blur-md border border-border
        rounded-full shadow-sm transition-[transform,background-color] duration-300 ease-in-out`}
        >
            <div className="relative flex items-center justify-between sm:justify-start">
                {/* Mobile drawer */}
                <div className="md:hidden">
                    <MobileDrawer />
                </div>

                {/* Desktop menu */}
                <ul className="hidden md:flex items-center gap-2 text-lg font-mono">
                    {menuItems.map(({ href, label, Icon }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className="rounded-full px-8 py-6 hover:bg-foreground/5 flex items-center gap-3"
                            >
                                <Icon className="size-6" />
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="w-px h-8 bg-border/50 mx-4 hidden sm:block" />
                <div className="flex items-center">
                    <LoginMenu />
                    <ThemeSwitch />
                </div>
            </div>
        </nav>
    );
}
