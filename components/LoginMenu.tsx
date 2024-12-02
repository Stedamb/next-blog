import { Github, LogOutIcon, PanelsTopLeft, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';

export async function LoginMenu() {

  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {session ? (
          <div className="p-4 flex items-center justify-center rounded-full hover:bg-foreground/5">

            <button
              className="size-10"
              aria-label="User menu"
            >
              <div className="relative size-10">
                <Image
                  src={session?.user?.image || ""}
                  alt="Profile picture"
                  className="rounded-full"
                  fill
                  sizes="40px"
                />
              </div>
            </button>
          </div>
        ) : (
          <button
            className="rounded-full p-6 hover:bg-foreground/5 flex items-center justify-center"
            aria-label="User menu"
          >
            <User className="size-6" />
          </button>

        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56 p-2">
        {session ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="text-base font-mono mb-1">
                <User />
                <span>{session?.user?.name}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/studio" className="text-base font-mono mb-1">
                <PanelsTopLeft />
                <span>Admin</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}>
                <button type="submit" className="flex items-center gap-2 text-base font-mono">
                  <LogOutIcon className="size-5" />
                  <span>Sign out</span>
                </button>
              </form>
            </DropdownMenuItem>

          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <form action={async () => {
                "use server";
                await signIn('github');
              }}>
                <button type="submit" className="flex items-center gap-2 py-2 text-base font-mono">
                  <Github className="w-5 h-5" />
                  <span>Sign in with GitHub</span>
                </button>
              </form>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
