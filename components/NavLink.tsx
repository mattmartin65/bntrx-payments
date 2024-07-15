// 'use client';
// 
import Link from 'next/link';

export default function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link href={href} className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"> {children} </Link>
    )
}