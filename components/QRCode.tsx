
import React from "react";
import QRCode from "react-qr-code";
// import { useRouter } from 'next/navigation'

import { headers } from "next/headers"

export default function QRCodeGenerator({ uuid, className }: { uuid: string | null, className: string }) {
    const headersList = headers()
    const host = headersList.get("host")

    const value = `https://${host}/qr/v1/upload/${uuid}`

    return (
        <div className={className}>
            <div className="bg-white border p-3">
                <QRCode size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={value}
                    viewBox={`0 0 256 256`} />
            </div>
        </div >
    );
}
