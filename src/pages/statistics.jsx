import { ToyPriceChart } from "../cmps/statistics/toy-price-chart.jsx";

export function Statistics() {
    return (
        <section>
            <div style={{ height: "55vh", position: "relative", marginBottom: "1%", padding: "1%" }}>
                <ToyPriceChart />
            </div>
        </section>
    )
}