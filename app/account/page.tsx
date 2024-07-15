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
    else {
        redirect('/account/profile');
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

            <div className='w-full'>
                <AccountSidebar />

            </div>
            <section className="mb-32 bg-black">
                <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
                    <div className="sm:align-center sm:flex sm:flex-col">
                        <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
                            Account
                        </h1>
                        <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
                            We partnered with Stripe for a simplified billing.
                        </p>
                    </div>
                </div>
                <div className="p-4">
                    {/* <CustomerPortalForm subscription={subscription} /> */}
                    {/* <NameForm userName={userDetails?.full_name ?? ''} /> */}
                    {/* <EmailForm userEmail={user.email} /> */}
                </div>
            </section>



            {/* <Footer /> */}
        </div>



    );
}