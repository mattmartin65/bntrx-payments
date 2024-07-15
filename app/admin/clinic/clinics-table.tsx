'use client';

import React, { useState } from "react";


export default function ClinicsTable({ clinics }: { clinics: any }) {

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                    <tr>
                        <th className="border border-slate-600 p-2"> Name</th>
                        <th className="border border-slate-600 p-2"> Address</th>
                        <th className="border border-slate-600 p-2"> Owner</th>
                        <th className="border border-slate-600 p-2"> Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {clinics.map((clinic: any) => {
                        return <TableRow {...clinic} />
                    })}
                </tbody>
            </table >
        </div>
    )
}

function TableRow({ name, address, owner }: { name: string, address: string, owner: string }) {
    'use client'


    const [isDeleted, setDelete] = useState(false);

    return (
        <tr className="bg-white border-b  dark:border-gray-700">
            <td className="p-2"> {name} </td>
            <td className="p-2"> {address} </td>
            <td className="p-2"> {owner} </td>
            <td className="flex flex-row justify-end p-2 gap-2">
                {isDeleted ?
                    <>
                        <button className="w-20 bg-primary text-black rounded-md border p-2" onClick={() => setDelete(false)}> No </button>
                        <button className="w-20 bg-primary text-black rounded-md border p-2">Yes</button>
                    </>
                    :
                    <button className="w-20 bg-primary text-black rounded-md border p-2" onClick={() => setDelete(true)}> Delete</button>
                }
            </td>
        </tr>
    )
}

