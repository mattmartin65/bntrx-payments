import React from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NavAuth() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const signOut = async () => {
        "use server";

        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect("/");
    };

    return (
        <div>
            {user ?
                <>
                    <div className="flex items-center gap-4">
                        {/* {user?.fullName ? user.fullName : user.email} */}

                        <div className="flex items-center gap-4">
                            {/* <div className="border w-10 h-10 rounded-full justify-center items-center">
                                ?
                            </div> */}

                            <Link href="/account/profile">
                                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                </div>
                            </Link>

                        </div>

                        <form action={signOut}>
                            <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                                Logout
                            </button>
                        </form>
                    </div>

                </>
                :
                <Link href="/login" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                    Login
                </Link>
            }
        </div>
    )
}
