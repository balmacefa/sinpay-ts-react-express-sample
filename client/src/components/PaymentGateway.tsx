import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// https://github.com/ushelp/EasyQRCodeJS#react-support

const formatDivider = (
    amount: string,
    prefix = 'CRC ',
    spanClass = 'ml-1 text-gray-500',
    divider = 3
) => {
    // if amount is null or amount is undefined or amount is 0 then return
    if (!amount) return
    // remove spaces and -, , . from amount
    const amountStr = amount
        .replace(/\s/g, '')
        .replace(/-/g, '')
        .replace(/,/g, '')
        .replace(/\./g, '')
    if (amountStr.length <= divider) {
        return `${prefix}${amountStr}`
    }
    //substring of the last divider digits
    const last = amountStr.substring(amountStr.length - divider)
    // the rest of the string
    const rest = amountStr.substring(0, amountStr.length - divider)
    return (
        <>
            {prefix}
            {rest}
            <span className={spanClass}>{last}</span>
        </>
    )
}

// response samples order.
// "display": {
//   "id": "631e64d8220cc442bae26225",
//   "tracking_code": "EGPY3742",
//   "sinpe_number": "70640928",
//   "sinpe_account_name": "Cafeë Los Santos",
//   "price_crc": "undefined",
//   "description": "EGPY3742",
//   "status": "undefined",
//   "sinpay_qr_img_url": "undefined",
//   "sinpay_redirect_url": "undefined"
// }
const URL = 'ws://localhost:3332'

export default function PaymentGateway({
    order
}: {
    order: {
        id: string
        display: {
            sinpe_number: string
            sinpe_account_name: string
            price_crc: string
            description: string
            status: string
        }
    }
}) {
    const [ws, setWs] = useState(new WebSocket(URL))

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket Connected')
            // Subscribe to order.update
            const message = {
                id: 'RANDOM_id',
                jsonrpc: '2.0',
                method: 'subscription',
                params: {
                    path: 'order.onUpdate'
                }
            }
            ws.send(JSON.stringify(message))
        }

        ws.onmessage = e => {
            const message = JSON.parse(e.data)
            console.log('MESSAGE')
            console.log(message)

            const o = message.result.data
            if (o.id !== order.id) {
                return
            }
            toast('Order updated')
            toast(o.display.status)
            toast(o.display.status_message)
        }

        return () => {
            ws.onclose = () => {
                console.log('WebSocket Disconnected')
                setWs(new WebSocket(URL))
            }
        }
    }, [ws.onmessage, ws.onopen, ws.onclose])

    return (
        <main className="flex w-full h-full rounded">
            <ToastContainer />
            <div className="flex flex-col w-full bg-sky-700 px-3 py-6 rounded">
                <div className="flex flex-col items-center h-full">
                    {/* show label text "Número" white text */}
                    <div className="flex flex-col w-full max-w-xs space-y-6">
                        <div className="!mt-0 text-center">
                            <h2 className="font-mono text-2xl text-white mb-4">
                                {order.display.sinpe_account_name ||
                                    'Cafetería Los Santos'}
                            </h2>
                            <h1 className="text-white text-xl normal-case">
                                Detalle del pago
                            </h1>
                            <p className="mt-3 font-mono text-xs text-white">
                                Use estos datos en su app sinpe
                            </p>
                        </div>

                        <div></div>

                        <div>
                            <h1 className="text-white mb-2"># Número Sinpe:</h1>
                            <div className="bg-gray-100 hover:bg-gray-300 hover:cursor-pointer shadow-md px-1 py-2 text-center font-mono font-bold text-gray-600 rounded-sm relative">
                                <h1 className="text-2xl">
                                    {formatDivider(
                                        order.display.sinpe_number,
                                        '',
                                        'ml-1 text-gray-500',
                                        4
                                    )}
                                </h1>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-white  mb-2">Monto</h1>
                            <div className="bg-gray-100 hover:bg-gray-300 hover:cursor-pointer shadow-md px-1 py-2 text-center font-mono font-bold text-gray-600 rounded-sm relative">
                                <h1 className="text-2xl">
                                    {formatDivider(
                                        order.display.price_crc,
                                        '',
                                        'ml-1 text-gray-500'
                                    )}
                                </h1>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-white  mb-2">Descripción</h1>
                            <div className="bg-gray-100 hover:bg-gray-300 hover:cursor-pointer shadow-md px-1 py-2 text-center font-mono font-bold text-gray-600 rounded-sm relative">
                                <h1 className="text-2xl">
                                    {formatDivider(
                                        order.display.description,
                                        '',
                                        'ml-1 text-pink-500',
                                        4
                                    )}
                                </h1>
                            </div>
                            <div className="flex flex-col items-center mt-3 font-mono text-xs text-center text-white">
                                {/* inline block */}
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className=" inline-block text-yellow-300 h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="inline-block text-yellow-300 h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <p>Este código identifica la transacción</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
