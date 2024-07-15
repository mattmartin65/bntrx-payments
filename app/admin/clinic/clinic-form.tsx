'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
// import { type User } from '@supabase/supabase-js'
import { Database, Tables, Enums } from "@/database.types.ts";

type Clinic = Tables<'clinics'>

export default function AccountForm({ clinic }: { clinic: Clinic | null }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);

    // const [fullname, setFullname] = useState<string | null>(null)
    // const [username, setUsername] = useState<string | null>(null)
    // const [website, setWebsite] = useState<string | null>(null)
    // const [avatar_url, setAvatarUrl] = useState<string | null>(null)

    const getClinic = useCallback(async () => {
        if (!clinic?.id) {
            setLoading(false);
            return null;
        }

        try {
            setLoading(true)


            const { data, error, status } = await supabase
                .from('clinics')
                .select(`name, address`)
                .eq('id', clinic?.id)
                .single()

            if (error && status !== 406) {
                console.log(error)
                throw error
            }

            if (data) {
                setName(data.name)
                setAddress(data.address)
            }
        } catch (error) {
            alert('Error loading clinic data!')
        } finally {
            setLoading(false)
        }
    }, [clinic, supabase])

    useEffect(() => {
        getClinic();
    }, [clinic, getClinic])

    async function addClinic({
        name,
        address
    }: {
        name: string | null
        address: string | null
        // website: string | null
        // avatar_url: string | null
    }) {
        try {
            setLoading(true)

            const { error } = await supabase.from('clinics').upsert({
                id: clinic?.id as string,
                name: name,
                address: address,
                // username,
                // website,
                // avatar_url,
                // updated_at: new Date().toISOString(),
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    async function updateClinic({
        name,
        address
    }: {
        name: string | null
        address: string | null
        // website: string | null
        // avatar_url: string | null
    }) {
        try {
            setLoading(true)

            const { error } = await supabase.from('clinics').upsert({
                id: clinic?.id as string,
                name: name,
                address: address,
                // username,
                // website,
                // avatar_url,
                // updated_at: new Date().toISOString(),
            })
            if (error) throw error
            alert('Clinic updated!')
        } catch (error) {
            alert('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-widget">
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    type="text"
                    value={address || ''}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            {/* <div>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="url"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div> */}

            <div>
                {clinic?.id ?
                    < button
                        className="button primary block"
                        onClick={() => updateClinic({ name, address })}
                        disabled={loading}
                    >
                        {loading ? 'Loading ...' : 'Update'}
                    </button>
                    :
                    <button
                        className="button primary block"
                        onClick={() => addClinic({ name, address })}
                        disabled={loading}
                    >
                        {loading ? 'Loading ...' : 'Add'}
                    </button>
                }


            </div>

            {/* <div>
                <form action="/auth/signout" method="post">
                    <button className="button block" type="submit">
                        Sign out
                    </button>
                </form>
            </div> */}
        </div >
    )
}


// <form className="flex flex-col gap-y-5">

// <div className="flex flex-row gap-2">
//     <div className="w-full flex flex-col gap-2">
//         <label htmlFor="name">Name</label>
//         <input type="text" id="name" />
//     </div>
//     <div className="w-full flex flex-col gap-2">
//         <label htmlFor="name">Address</label>
//         <input type="text" id="address" />
//     </div>
// </div>

// <div className="flex flex-row gap-2">
//     <div className="w-full flex flex-col gap-2">
//         <label htmlFor="name">Name</label>
//         <input type="text" id="name" />
//     </div>
//     <div className="w-full flex flex-col gap-2">
//         <label htmlFor="name">Name</label>
//         <input type="text" id="name" />
//     </div>
// </div>

// <div className="flex flex-row">
//     <button className="bg-primary text-black rounded-md border p-2"> Submit </button>
// </div>


// </form>