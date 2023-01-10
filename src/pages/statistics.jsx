import { ToyPriceChart } from "../cmps/statistics/toy-price-chart.jsx";
import { toyService } from "../services/toy.service.js";
export function Statistics() {
    let labels = toyService.labels
    return (
        <section>
            <div style={{ height: "55vh", position: "relative", marginBottom: "1%", padding: "1%" }}>
                <ToyPriceChart labels={labels} />
            </div>
        </section>
    )
}