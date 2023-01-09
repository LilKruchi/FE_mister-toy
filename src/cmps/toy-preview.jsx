
export function ToyPreview({ toy }) {
    return (
        <div className="toy-content">
            <div className="toy-img-container">
                <img src={toy.img} alt="toy img" />
            </div>

            <p>{toy.name}</p>
            <p>Price: {toy.price}</p>
        </div>
    )
}