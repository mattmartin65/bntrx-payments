'use client'
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

import { createClient } from '@/utils/supabase/client'
import { Database, Tables, Enums } from "@/database.types.ts";
import { FunctionsHttpError } from '@supabase/supabase-js'

type Script = Tables<'scripts'>

import { usePathname, useSearchParams } from 'next/navigation'

export default function ScriptUploadForm({ script }: { script: Script | null }) {
    const supabase = createClient()

    const ref = useRef<HTMLInputElement>(null);
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [localImage, setLocal] = useState<any | null>()
    const [localURL, setLocalURL] = useState<any | null>()

    const [scriptPath, setPath] = useState<string | null>()
    const [scriptUrl, setScriptUrl] = useState<string | null>()

    const [uploading, setUploading] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [failed, setFailed] = useState(false)
    let message = '';

    const host = '/qr/v1/upload/';
    const uploadId = pathname.slice(host.length);

    // const [time, setTime] = useState(0);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         // console.log('time', time);
    //         setTime(time+1);
    //     }, 1000)
    //     return () => clearInterval(interval)
    // },[time])

    const getScriptFile = async () => {

    }

    const getScript = async () => {

    }

    const updateScript = async (upload_id: string) => {
        console.log('updateScript pre', upload_id);

        const { data, error } = await supabase
            .from('scripts')
            // .update({ upload_id: upload_id, name: name })
            .update({ is_submitted: true })
            // .eq({ order_id: orderId, type: type })
            .eq('upload_id', upload_id)
            .select()

        console.log('updateScript', data, error);

        if (error) {
            // errorMessage = error.message;
            // editMessage = 'No data found';
            setFailed(true);
            message = 'Failed to update image url'
            return false;
        }
        else {
            // editMessage = 'successful'
        }
        return true;
    }


    const uploadScript = async () => {
        try {
            // setUploading(true)

            // if (!event.target.files || event.target.files.length === 0) {
            //     throw new Error('You must select an image to upload.')
            // }

            const file = localImage;
            const fileExt = localImage?.name.split('.').pop();
            // const filePath = `bntrx/script-1234.${fileExt}`;
            const filePath = `bntrx/script-${script?.order_id}.${fileExt}`;

            const { error } = await supabase.storage.from('scripts').upload(filePath, file, { upsert: true });

            if (error) {
                console.log('error uploading script:', error);
                setFailed(true);
                message = 'Failed to upload image url'
                throw error
            }
            else {
                const { data } = await supabase.storage.from('scripts').getPublicUrl(filePath);
                if (error) {
                    console.log('error downloading script:', error);
                    setFailed(true);
                    message = 'Failed to get updated image url'
                    throw error
                }
                console.log('data?', data);
                setPath(data?.publicUrl);
                return data?.publicUrl;
            }
            return null;
        } catch (error) {
            // alert('Error uploading script')
            console.log('error uploading script:', error)
            setUploading(false);
        } finally {
            // setUploading(false)
        }
    }

    const saveImage = async () => {
        console.log('saveImage', localImage, script);
        if (!localImage) {
            return;
        }
        setUploading(true)

        const path = await uploadScript();

        console.log('upload', uploadId, scriptPath, path);

        const { data, error } = await supabase.from('scripts')
            .update({ upload_id: uploadId, url: path })
            .eq('upload_id', uploadId)
            .eq('type', script?.type)
            .select()


        // const { data, error } = await supabase
        // .from('scripts')
        // .update({ other_column: 'otherValue' })
        // .eq('some_column', 'someValue')
        // .select()

        console.log('glide', script?.order_id, path);

        if (error) {
            console.log('Error saving script:', error);
            return;
        }
        else {
            const { data, error } = await supabase.functions.invoke('glide-scripts', { body: { orderId: script?.order_id, type: script?.type, imageUrl: path } });
            // const { data, error } = await supabase.functions.invoke('glide-scripts', { body: { name: 'Functions' } });

            // const { data, error } = await supabase.functions.invoke('...')

            if (error && error instanceof FunctionsHttpError) {
                const errorMessage = await error.context.json()
                console.log('Function returned an error', errorMessage, error);
                setFailed(true);
                message = 'Failed to sync image url'
                return;
            }

            // if (error) {
            //     console.log('Error saving script:', error);
            //     return;
            // }
            else {
                console.log('uploaded');
                const update = await updateScript(uploadId);
                setUploaded(true);
            }
        }

        console.log('Script saved:', data);
        setUploading(false);
    }

    const getImage: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0];
            // const fileExt = file.name.split('.').pop()
            // const filePath = `bntrx/script-${script.order_id}.${fileExt}`

            const url = URL.createObjectURL(file)

            setLocal(file);
            setLocalURL(url);

            console.log('file', file, url);
        } catch (error) {
            console.log('error uploading image:', error)
            setFailed(true);
            message = 'Failed to load image'

        } finally {
            setUploading(false)
        }
    }

    const clearImage = () => {
        console.log('clearImage', localImage);
        if (localImage) {
            setLocal(null);
            setLocalURL(null);
            setFailed(false);

            if (ref && ref.current) {
                ref.current.value = '';
            }
        }
    }

    const handleInputClick = () => {
        if (ref && ref.current) {
            ref.current.click();
        }
    }

    return (
        <div className='flex flex-col gap-5'>

            {failed ?
                <>
                    <div className="flex flex-col items-center gap-5">
                        <p> Image failed to upload  </p>

                        <Image
                            src={"/delete.png"}
                            alt="Script Image"
                            className="avatar image"
                            width={300}
                            height={300}
                        />

                        <p> Please reset and try again </p>
                        <p> {message} </p>
                        <button className={`w-full button primary block border rounded p-2`} onClick={clearImage}>Reset</button>
                    </div>
                </>
                :
                <>
                    {!uploaded ?
                        <>
                            {/* <p> Time: {time} </p> */}
                            <p> Patient Name: {script?.name ? script.name : 'no name available'} </p>
                            <p> Take a photo of the patient or upload an existing file. <br />
                                It will instantly appear in the patient records.
                            </p>

                            <div className="flex flex-col justify-center gap-5">
                                <label className="w-full button primary block border rounded text-white p-3 text-center" style={{ backgroundColor: '#64A4F5' }} onClick={handleInputClick} >
                                    {uploading ? 'Uploading ...' : 'Take a picture or upload image'}
                                </label>
                                <input
                                    ref={ref}
                                    style={{
                                        visibility: 'hidden',
                                        position: 'absolute',
                                    }}
                                    type="file"
                                    id="uploadFile"
                                    accept="image/*"
                                    onChange={getImage}
                                    disabled={uploading}
                                />
                                <label className="flex flex-col items-center border border-dashed rounded text-white p-3" htmlFor="uploadFile">
                                    {localURL ?
                                        <Image
                                            src={localURL}
                                            alt="Script Image"
                                            className="avatar image"
                                            width={320}
                                            height={320}
                                        />
                                        :
                                        <Image
                                            src={"/preview.png"}
                                            alt="Script Image"
                                            className="avatar image"
                                            width={320}
                                            height={320}
                                        />
                                    }
                                </label>
                            </div>
                            <div className="flex flex-row justify-center gap-5">
                                {localImage ?
                                    <>
                                        <button className={`w-full button primary block border rounded p-2 ${localImage ? '' : 'disabled'}`} onClick={clearImage}>Clear</button>
                                        <button className="w-full button primary block border rounded p-2" style={{ backgroundColor: "#3C6CA8" }} onClick={saveImage}> {uploading ? 'Uploading....' : 'Save'}</button>
                                    </>
                                    :
                                    <>
                                        <button className="w-full button primary block border rounded p-2 disabled opacity-30" disabled={localImage}>Clear</button>
                                        <button className="w-full button primary block border rounded p-2 disabled opacity-30" disabled={localImage} style={{ backgroundColor: "#3C6CA8" }}>Save</button>
                                    </>
                                }
                            </div>
                        </>
                        :
                        <>
                            <div className="flex flex-col items-center">
                                <p> Image has been successfully uploaded </p>

                                <Image
                                    src={"/check.png"}
                                    alt="Script Image"
                                    className="avatar image"
                                    width={300}
                                    height={300}
                                />

                                <p> Please close this page and return back to the form </p>
                            </div>
                        </>}
                </>
            }
        </div>
    )
}