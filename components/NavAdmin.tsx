import React from 'react'
// Packages
import Link from 'next/link';
// 
import { createClient } from '@/utils/supabase/server';


export default async function AuthAdmin() {

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: userDetails } = await supabase.from('users').select('*').single();

    return (
        <>
            { true || user && userDetails ?
                <div className="flex items-center gap-4">

                    {true || userDetails?.is_admin ?
                        <Link href="/admin" className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"> Admin </Link>
                        :
                        null}
                </div>
                :
                null
            }
        </>
    )
}
