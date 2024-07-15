

import React from "react";

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import QRCode from '@/components/QRCode';
import { v4 } from "uuid";


export default async function Page({ params, searchParams }: { params: { slug: string }, searchParams: { name: string, type: string } }) {
    const supabase = createClient();

    let uuid = v4();
    const orderId = params?.slug ? params.slug : '';
    const name = searchParams?.name ? searchParams.name : '';
    let type = searchParams?.type ? searchParams.type : '';

    console.log('params', params);
    console.log('search', searchParams);

    let getMessage = '';
    let editMessage = '';
    let errorMessage = '';

    if (!uuid) {
        errorMessage = 'Failed to generate UUID';
    }
    else if (!params.slug) {
        errorMessage = 'Failed to generate Script';
    }
    else if (!searchParams.name) {
        errorMessage = 'Failed to process Patient';
    }
    else if (!searchParams.type) {
        // errorMessage = 'Failed to process Type';
        type = 'primary';
    }

    const getScript = async (orderId: string, type: string) => {
        console.log('getScript pre', orderId, type);

        const { data, error } = await supabase
            .from('scripts')
            .select("*")
            // .eq('order_id', orderId, 'type', type)
            .eq('order_id', orderId)
            .eq('type', type)
            .single()

        console.log('getScript post', data, error);

        if (error) {
            // getMessage = error.message;
            // errorMessage = error.message;
            return false;
        }
        else if (!data) {
            getMessage = 'No data found';
            return false;
        }
        else {
            getMessage = 'successful'
        }


        return data;
    }

    const postScript = async (orderId: string, upload_id: string, name: string, type: string) => {
        console.log('postScript pre', orderId, upload_id, name, type);

        const { data, error } = await supabase
            .from('scripts')
            .insert({ order_id: orderId, upload_id: uuid, name: name, type: type })
            // .eq({ order_id: orderId, type: type })
            .select()

        console.log('postScript post', data, error);

        if (error) {
            errorMessage = error.message;
            editMessage = 'No data found';
            return false;
        }
        else {
            editMessage = 'successful'
        }
        return true;
    }

    const updateScript = async (orderId: string, upload_id: string, name: string, type: string) => {
        console.log('updateScript pre', orderId, upload_id, name, type);

        const { data, error } = await supabase
            .from('scripts')
            // .update({ upload_id: upload_id, name: name })
            .update({ upload_id: upload_id, is_submitted: false })
            // .eq({ order_id: orderId, type: type })
            .eq('order_id', orderId)
            .eq('type', type)
            .select()

        console.log('updateScript', data, error);

        if (error) {
            errorMessage = error.message;
            editMessage = 'No data found';
            return false;
        }
        else {
            editMessage = 'successful'
        }
        return true;
    }

    console.log('qr', uuid, orderId, name, type)
    if (uuid && orderId && name && type) {

        const script = await getScript(orderId, type);
        if (script) {
            // primary or secondary row exists - update row
            const updated = await updateScript(orderId, uuid, name, type);
        }
        else {
            // primary or secondary row does not exist - insert row
            const posted = await postScript(orderId, uuid, name, type);
        }

        // const { data, error } = await supabase
        //     .from('scripts')
        //     .upsert({ order_id: orderId, upload_id: uuid, name: name, type: type})
        //     .eq({order_id: orderId, type: type})
        //     .select()

        // if (error) {
        //     errorMessage = error.message;
        // }
    }

    return (
        <div className="flex flex-row w-full">
            {errorMessage ?
                <div className="flex flex-col text-center p-2">
                    <QRCode uuid={'failed'} className="opacity-5" />
                    <div className=""> {errorMessage} <br /> Please contact an administrator </div>
                </div>
                :
                <div className="flex flex-col text-center p-2">
                    {/* <a target="_blank" href={`/qr/v1/upload/${uuid}`}> */}
                        <QRCode uuid={uuid} className="" />
                        {/* <input type="text" value={uuid} className="w-full" /> */}
                    {/* </a> */}

                    {/* {getMessage || editMessage ?
                        <>
                            <div className=""> GET: {getMessage} </div>
                            <div className=""> POST/EDIT: {editMessage} </div>
                        </>
                        : <> </>
                    } */}
                </div>
            }
        </div>
    );
}
