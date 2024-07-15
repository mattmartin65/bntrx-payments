// import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
// import EmailForm from '@/components/ui/AccountForms/EmailForm';
// import NameForm from '@/components/ui/forms/NameForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AccountSidebar from '@/components/AccountSidebar';

import Nav from '@/components/Nav';
// import Footer from '@/components/Footer';

export default async function Account() {
    const supabase = createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    const { data: userDetails } = await supabase
        .from('users')
        .select('*')
        .single();

    // const { data: subscription, error } = await supabase
    //     .from('subscriptions')
    //     .select('*, prices(*, products(*))')
    //     .in('status', ['trialing', 'active'])
    //     .maybeSingle();

    // if (error) {
    //     console.log(error);
    // }

    if (!user) {
        return redirect('/signin');
    }


    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">

            <div className="w-full">
                <div className="py-6 font-bold text-black bg-purple-950 text-center">
                    This is a protected page that you can only see as an authenticated
                    user
                </div>
                <Nav />
            </div>

            <div className='w-full flex flex-row justify-between p-2'>
                <AccountSidebar />


                <div className="w-full border">

                    <h3 className="text-2xl font-extrabold text-black sm:text-center sm:text-2xl"> Account/Clinic </h3>


                    <p className='sm:text-center'> Clinic admins can change the below information </p>
                    <div className='max-w-sm p-2'>
                        <label className="text-black">Clinic Name</label>
                        <input type="text" placeholder="Clinic Name" className="w-full border rounded" />
                    </div>

                </div>
            </div>
            {/* <Footer /> */}
        </div>



    );
}