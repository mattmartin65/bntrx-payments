import React from "react";

import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

import Nav from "@/components/Nav";
import Link from "next/link";

import ClinicForm from "../clinic-form";

export default async function ProtectedPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }


    const { data, error } = await supabase
        .from('clinics')
        .insert([
            { some_column: 'someValue', other_column: 'otherValue' },
        ])
        .select()



    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="w-full">
                <div className="py-6 font-bold bg-purple-950 text-center">
                    ADMIN ONLY
                </div>
                <Nav />
            </div>

            <div className="w-full animate-in flex-1 flex flex-col opacity-0 max-w-4xl px-3 py-5 gap-2">
                <div className="flex justify-between">
                    <Link href="/admin/clinic">
                        <button className="bg-primary text-black rounded-md border p-2">Back </button>
                    </Link>
                    <h1 className="text-2xl">Add new clinic</h1>
                    <button className="bg-primary text-black rounded-md border p-2"> ... </button>
                </div>

                <ClinicForm clinic={null} />
            </div>

            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
                <p>
                    Powered by{" "}
                    <a
                        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noreferrer"
                    >
                        Supabase
                    </a>
                </p>
            </footer>
        </div>
    );
}


function ClinicsTable({ clinics }: any) {



    return (
        <table className="w-full border-separate border-spacing-0 border border-slate-500" >
            <thead>
                <tr>
                    <th className="border border-slate-600 p-2"> Name</th>
                    <th className="border border-slate-600 p-2"> Address</th>
                    <th className="border border-slate-600 p-2"> Owner</th>
                </tr>
            </thead>
            <tbody>
                {clinics.map((clinic: any) => {
                    return <TableRow {...clinic} />
                })}
            </tbody>
        </table >
    )
}

function TableRow({ name, address, owner }: { name: string, address: string, owner: string }) {


    return (
        <tr>
            <td className="border border-slate-700 p-2"> {name} </td>
            <td className="border border-slate-700 p-2"> {address} </td>
            <td className="border border-slate-700 p-2"> {owner} </td>
        </tr>
    )
}

