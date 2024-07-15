
'use server';

import React from 'react';

// Auth 
import { cookies } from 'next/headers';

// Packages
import Link from 'next/link';

// Components
// import AuthButton from "../components/AuthButton";
import NavAuth from "@/components/NavAuth";
import NavAdmin from "@/components/NavAdmin";
import NavLink from "@/components/NavLink";

export default async function Nav() {

    const cookieStore = cookies();
    // const session = auth({ cookieStore });

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm space-x-1">
                <Link href="/" className="w-48  py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover"> BnTRx Clinic </Link>

                <NavAdmin />

                <div className="w-full flex space-x-1">
                    {/* <NavLink href="/stock"> Stock </NavLink> */}
                    {/* <NavLink href="/orders"> Orders </NavLink> */}
                    {/* <NavLink href="/patients"> Patients </NavLink> */}
                    {/* <NavLink href="/clinic"> Clinic </NavLink> */}
                </div>
                {/* {<AuthButton />} */}
                <NavAuth />
            </div>
        </nav>
    )
}
