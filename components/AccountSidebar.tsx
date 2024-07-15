import Link from "next/link";


export default function AccountSidebar() {


    return (
        <div className="flex-col items-center p-2 border min-w-64">
            <AccountLink href="/account/profile"> Profile </AccountLink>
            <AccountLink href="/account/clinic"> Clinic </AccountLink>
        </div>
    )
}

function AccountLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <div>
            <Link href={href}> {children} </Link>
        </div>
    )
}