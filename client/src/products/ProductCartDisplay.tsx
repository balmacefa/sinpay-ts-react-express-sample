import { IProduct } from "../components/MockDB";

// props item, this can be null or OrderItem
export default function ProductCartDisplay({
    item,
    removeProduct,
    updateAmount
}: {
    item: IProduct;
    removeProduct: (product: IProduct) => void;
    updateAmount: (amount: number, id: string) => void;
}) {
    // (item: IProduct) {
    const displayPrice = () => {
        return `Unit Price: ${item.price} ${item.currency}`
    }
    const displayTotalPrice = () => {
        return `${item.price * (item.amount || 1)} ${item.currency}`
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateAmount(parseInt(e.target.value), item.id);
    }

    const itemCountSelect = () => {
        return (
            <select
                aria-label="Select quantity"
                className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                value={item.amount}
                onChange={handleAmountChange}
            >
                {/* loop up to 10 */}
                {Array(10)
                    .fill(0)
                    .map((_, i) => (
                        <option key={i} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
            </select>
        );
    };

    return (
        <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-slate-300 mt-4">
            <div className="md:w-4/12 2xl:w-1/4 w-full">
                <img
                    src={item.img}
                    alt="Product"
                    className="h-full object-center object-cover md:block"
                />

            </div>
            <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center p-8">
                <div className="flex items-center justify-between w-full">
                    <p className="text-xl font-black leading-none text-gray-800 dark:text-white">
                        {item.name}
                    </p>
                    {itemCountSelect()}
                </div>
                <p className="text-xs text-gray-600 pt-2">
                    {item.description}
                </p>

                <div className="flex items-center justify-between pt-5">
                    <div className="flex itemms-center">
                        <p
                            onClick={() => removeProduct(item)}
                            className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                            Remove
                        </p>
                    </div>
                    <p className="text-base font-black leading-none text-gray-800 dark:text-white">
                        {displayPrice()}
                    </p>
                    <p className="text-base font-black leading-none text-gray-800 dark:text-white">
                        {displayTotalPrice()}
                    </p>
                </div>
            </div>
        </div>
    )
}
