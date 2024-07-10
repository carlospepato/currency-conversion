import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <h1 className="text-white text-2xl font-bold">Currency Conversion App</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Link href="/" className='text-sm hover:underline'>
            Home
          </Link>
          <Link href="/history" className='text-sm hover:underline'>
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
            height={24}/>
          </Link>
        </div>
      </div>
    </div>
  );
}
