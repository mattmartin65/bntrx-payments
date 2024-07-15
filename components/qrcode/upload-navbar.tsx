


import Image from 'next/image'

export default function UploadNavbar() {


    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center px-5 py-2 text-lg text-black">
                <div className="flex">
                    <Image src="/logo.png" width="100" height="64" alt="Logo" />
                </div>
                <p> Prescription Uploader</p>
                <div className="flex hidden sm:block">
                    <Image src="/logo.png" width="100" height="64" alt="logo" className="invisible" />
                </div>
            </div>
        </nav>
    )
}