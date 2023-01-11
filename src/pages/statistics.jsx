import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToyLabelCount } from "../cmps/statistics/toy-label-count.jsx";
import { ToyPriceChart } from "../cmps/statistics/toy-price-chart.jsx";
import { toyService } from "../services/toy.service.js";
import { loadToys } from "../store/actions/toy.action.js";
export function Statistics() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    let labels = toyService.labels
    useEffect(() => {
        loadToys()
    }, [])

    function getChartsData() {
        const chartsData = toys.reduce(
            (acc, toy) => {
                toy.labels.forEach((label) => {
                    acc.labelsCountMap[label] = acc.labelsCountMap[label] ? ++acc.labelsCountMap[label] : 1
                    acc.labelsPriceMap[label] = acc.labelsPriceMap[label] ? (acc.labelsPriceMap[label] += toy.price) : toy.price
                })

                return acc
            },
            { labelsCountMap: {}, labelsPriceMap: {} }
        )
        Object.keys(chartsData.labelsPriceMap).forEach((label) => (chartsData.labelsPriceMap[label] /= chartsData.labelsCountMap[label]))

        return chartsData
    }
    const { labelsPriceMap, labelsCountMap } = getChartsData()


    return (
        <section>
            <div className="chart-container">
                <div className="chart">
                    <h2>Sum prices:</h2>
                    <ToyPriceChart dataMap={labelsPriceMap} />
                </div>

                <div className="chart">
                    <h2>Lable count:</h2>
                    <ToyLabelCount dataMap={labelsCountMap} />
                </div>
            </div>
        </section >
    )
}