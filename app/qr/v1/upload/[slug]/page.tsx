

import React from "react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import UploadNavbar from "@/components/qrcode/upload-navbar";
import ScriptForm from "@/components/ScriptUploadForm";

import Image from 'next/image'

export default async function Page({ params }: { params: { slug: string } }) {
    const supabase = createClient();

    let { data: script, error } = await supabase
        .from('scripts')
        .select("*")
        .eq('upload_id', params.slug)
        // .eq('is_submitted', false)
        .single()

    // console.log('scripts', script, error);
    const current = new Date();
    const date = new Date(script?.updated_at);
    const expiry = 1000 * 60 * 15; // 15 minutes

    let message = '';

    console.log('date', current, date, date.getTime() + expiry, current.getTime());
    if (date.getTime() + expiry < current.getTime()) {
        console.log('old token');
        message = 'This QR code has expired';
        script = null;
    }
    else if (script?.is_submitted === true) {
        message = 'This QR code has already been used';
        script = null;
    }
    else {
        message = 'Invalid URL';
    }

    console.log('script', script);

    // Invalid/expired tokens should return expired html here
    // if (!script) {
    //     return
    // }

    return (
        <>
            <UploadNavbar />
            <div className="flex flex-col p-3 gap-5">
                {/* <p> Order: {script.order_id} </p>
                <p> UUID: {script.upload_id} </p> */}

                {script ?
                    <>
                        <ScriptForm script={script} />
                    </> :
                    <>

                        <div className="flex flex-col items-center gap-5">
                            <p className="text-center"> {message}  <br /> </p>
                            <Image
                                src={"/delete.png"}
                                alt="Script Image"
                                className="avatar image"
                                width={250}
                                height={250}
                            />
                            <p className="text-center"> Please rescan the QR code in the clinic app <br /> </p>

                        </div>
                    </>
                }
            </div >
        </>
    )
}
