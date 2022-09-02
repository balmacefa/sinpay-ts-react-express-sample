// https://github.com/ushelp/EasyQRCodeJS#react-support

const formatDivider = (amount: number, prefix = "CRC ", spanClass = "ml-1 text-gray-500", divider = 3) => {
    // if amount is null or amount is undefined or amount is 0 then return
    if (!amount) return;
    // remove spaces and -, , . from amount
    const amountStr = amount.toString().replace(/\s/g, "").replace(/-/g, "").replace(/,/g, "").replace(/\./g, "");
    if (amountStr.length <= divider) {
        return `${prefix}${amountStr}`;
    }
    //substring of the last divider digits
    const last = amountStr.substring(amountStr.length - divider);
    // the rest of the string
    const rest = amountStr.substring(0, amountStr.length - divider);
    return (<>{prefix}{rest}<span className={spanClass}>{last}</span></>)
}

export default function PaymentGateway({ order }: { order: any }) {

    return (
        <main className="flex w-full h-full">
            <div className="flex flex-col w-full bg-stone-800 px-3 py-6 rounded">
                <div className="flex flex-col items-center h-full">
                    {/* show label text "Número" white text */}
                    <div className="flex flex-col w-full max-w-xs space-y-6">

                        <div className="!mt-0 text-center">
                            <h2 className="font-mono text-2xl text-white mb-4">{order.seller_name || "Cafetería Los Santos"}</h2>
                            <h1 className="text-white text-xl normal-case">Detalle del pago</h1>
                            <p className="mt-3 font-mono text-xs text-white">Use estos datos en su app sinpe</p>
                        </div>

                        <div>
                        </div>


                        <div>
                            <h1 className="text-white mb-2"># Número Sinpe:</h1>
                            <div className="bg-gray-100 hover:bg-gray-300 hover:cursor-pointer shadow-md px-1 py-2 text-center font-mono font-bold text-gray-600 rounded-sm relative">
                                <h1 className="text-2xl">{formatDivider(order.number, '', "ml-1 text-gray-500", 4)}</h1>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-white  mb-2">Monto</h1>
                            <div className="bg-gray-100 hover:bg-gray-300 hover:cursor-pointer shadow-md px-1 py-2 text-center font-mono font-bold text-gray-600 rounded-sm relative">
                                <h1 className="text-2xl">{formatDivider(order?.amount, "", "ml-1 text-gray-500")}</h1>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-white  mb-2">Descripción</h1>
                            <div className="bg-gray-100 hover:bg-gray-300 hover:cursor-pointer shadow-md px-1 py-2 text-center font-mono font-bold text-gray-600 rounded-sm relative">
                                <h1 className="text-2xl">{formatDivider(order?.otp, '', "ml-1 text-pink-500", 4)}</h1>
                            </div>
                            <div className="flex flex-col items-center mt-3 font-mono text-xs text-center text-white">

                                {/* inline block */}
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className=" inline-block text-yellow-300 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block text-yellow-300 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <p>Este código identifica la transacción</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
