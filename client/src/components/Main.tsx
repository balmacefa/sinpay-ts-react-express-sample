export default function MainPanel({
    productList
}: {
    productList: React.ReactNode | React.ReactNode[]
}) {
    return (
        <>
            <p className="text-5xl font-black leading-10  text-slate-400 m-8">
                Bag
            </p>
            <div>{productList}</div>
        </>
    )
}
