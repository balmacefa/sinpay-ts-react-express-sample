export default function Layout({
    leftPanel,
    mainPanel,
    rightPanel,
}: {
    leftPanel: React.ReactNode | React.ReactNode[];
    mainPanel: React.ReactNode | React.ReactNode[];
    rightPanel: React.ReactNode | React.ReactNode[];
}) {
    return (
        <div
            className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
            id="chec-div"
        >
            {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}

            <div
                className="flex items-end lg:flex-row flex-col"
                id="cart"
            >
                <div className="lg:w-96 md:w-8/12 w-full bg-stone-800 text-slate-100 h-full">
                    {leftPanel}
                </div>
                <div
                    className="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-orange-50 dark:bg-gray-800 overflow-y-hidden overflow-x-hidden lg:h-screen h-auto"
                    id="scroll"
                >
                    {mainPanel}
                </div>
                <div className="lg:w-96 md:w-8/12 w-full bg-orange-200 h-full">
                    <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
                        {rightPanel}
                    </div>
                </div>
            </div>
        </div>
    )
}
