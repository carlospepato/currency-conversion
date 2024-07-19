import Link from 'next/link';
import Image from 'next/image';
import { History, House } from 'lucide-react';

export function Header() {
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <h1 className="text-white text-2xl font-bold">Currency Conversion App</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Link href="/" className='text-sm hover:underline flex gap-1'>
            <House size={18} />
            Home
          </Link>
          <Link href="/history" className='text-sm hover:underline flex gap-1'>
            <History size={18} />
            History
          </Link>
        </div>
        <div className="w-px h-4 bg-zinc-700 mx-1"></div>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:underline">
            <span className="text-sm">Account</span>
            <Image
              src="https://github.com/carlospepato.png"
              alt=""
              className="h-6 w-6 rounded-full"
              width={24}
              height={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
