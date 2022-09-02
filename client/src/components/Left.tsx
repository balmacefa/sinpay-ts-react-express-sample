import { IProduct, mockDB } from "./MockDB";

export default function LeftPanel({
    addProductToCart
}: {
    addProductToCart: (product: IProduct) => void
}) {
    const list = mockDB.store;

    const renderAll = () => list.map((item) => (
        <div key={item.id}>
            <div className="flex items-strech py-8 md:py-10 lg:py-8 border-t border-slate-400">
                <div className="flex items-strech flex-col items-center space-y-4">
                    <img
                        src={item.img}
                        alt="Product"
                        className="h-full object-center object-cover md:block"
                    />
                    <p className="text-base font-black leading-none dark:text-white">
                        {item.name}
                    </p>
                    <p className="text-base font-black leading-none dark:text-white">
                        {`Unit Price: ${item.price} ${item.currency}`}
                    </p>
                    <div className="flex itemms-center">
                        <p
                            onClick={() => addProductToCart(item)}
                            className="w-16 py-2 bg-gray-800 border-gray-800 border">
                            Add
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <>
            {/* loop through the list and DisplayProduct */}

            <div className="flex flex-col scrollbar lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
                {renderAll()}
            </div>
        </>
    );
}


