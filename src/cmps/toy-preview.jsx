
export function ToyPreview({ toy, isInStockClass }) {
    return (
        <div className="toy-content">
            <div className={"toy-img-container " + isInStockClass}>
                <img src={toy.img} alt="toy img" />
            </div>

            <p className={isInStockClass}>{isInStockClass ? 'Not in stock' : toy.name}</p>
            <p className={isInStockClass}>{isInStockClass ? '' : `Price: ${toy.price}`}</p>
        </div>
    )
}