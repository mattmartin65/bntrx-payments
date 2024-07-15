
import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

import Nav from "@/components/Nav";
import Link from "next/link";


import ClinicsTable from "./clinics-table";

import { Database, Tables, Enums } from "@/database.types.ts";

type TypeClinics = Tables<'clinics'>;

export default async function AdminClinics() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    const { data: clinics, error } = await supabase.from('clinics').select('*');

    if (!user) {
        return redirect("/login");
    }

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
                    <Link href="/admin">
                        <button className="bg-primary text-black rounded-md border p-2">Back </button>
                    </Link>
                    <h1 className="text-2xl">Clinics</h1>
                    <div className="flex flex-row gap-x-2">
                        <button className="bg-primary text-black rounded-md border p-2">Refresh</button>
                        <Link href="/admin/clinic/add">
                            <button className="bg-primary text-black rounded-md border p-2">Add Clinic</button>
                        </Link>
                    </div>
                </div>

                <ClinicsTable clinics={clinics} />
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

