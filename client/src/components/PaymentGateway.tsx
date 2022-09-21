import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// https://github.com/ushelp/EasyQRCodeJS#react-support

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
        websocket: {
            url: string
            message: any
        }
    }
}) {
    const wsUrl = order.websocket.url

    const [status, setStatus] = useState(order.display.status)

    const [ws, setWs] = useState<WebSocket | null>()

    useEffect(() => {
        startWebsocket()
    }, [])

    function startWebsocket() {
        var wss = new WebSocket(wsUrl)

        wss.onclose = function () {
            // connection closed, discard old websocket and create a new one in 5s
            setTimeout(startWebsocket, 5000)
        }

        wss.onopen = e => {
            console.log('WebSocket Connected')
            // Subscribe to order.update
            wss.send(JSON.stringify(order.websocket.message))
        }

        wss.onmessage = e => {
            const message = JSON.parse(e.data)
            console.log('MESSAGE', message)
            // result: type: 'started'

            const isInit = message?.result?.type === 'started'

            if (isInit) {
            }

            const o = message?.result?.data
            if (o?.id !== order.id) {
                // CHeck this
                // return
            }
            setStatus(o.display.status)
            toast('Order updated')
            toast(o.display.status)
            toast(o.display.status_message)
        }

        setWs(wss)
    }
    // startWebsocket()

    const OrderStatus = {
        PENDING_PAYMENT: 'PENDING_PAYMENT',
        COMPLETED: 'COMPLETED',
        COMPLETED_BY_SELLER: 'COMPLETED_BY_SELLER',
        AVOIDED_BY_PAYER: 'AVOIDED_BY_PAYER',
        CANCELED_BY_SELLER: 'CANCELED_BY_SELLER',
        INCOMPLETE_PAYMENT: 'INCOMPLETE_PAYMENT',
        OVERPAID: 'OVERPAID',
        EXPIRED: 'EXPIRED'
    }

    const backgroundColor = () => {
        switch (status) {
            case OrderStatus.COMPLETED:
                return 'bg-green-600'
            case OrderStatus.OVERPAID:
                return 'bg-orange-600'
            case OrderStatus.INCOMPLETE_PAYMENT:
                return 'bg-red-800'
            default:
                return 'bg-sky-700'
        }
    }

    return (
        <main className="flex w-full h-full rounded">
            <ToastContainer position="top-center" />
            <div
                className={`flex flex-col w-full ${backgroundColor()} px-3 py-6 rounded`}
            >
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
                                    {/* TODO: Change this magic number 3 - to match the lengt of otp/2 ? or better for strategy */}
                                    {formatDivider(
                                        order.display.description,
                                        '',
                                        'ml-1 text-pink-500',
                                        3
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

const formatDivider = (
    amount: string,
    prefix = 'CRC ',
    spanClass = 'ml-1 text-gray-500',
    divider = 2
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
