"use client";
import styles from "./page.module.css";
import { fetchAllPrices } from "@/api/prices";
import { useEffect, useState } from "react";
import BarChartComponent from "@/components/ECharts/BarChart";
import { IFetchAllPricesResponse } from "@/api/prices/types";

export default function Home() {
  // TODO: Move all of following to appropriate modules/components.
  const [formattedChartData, setFormattedChartData] = useState<
    Array<[string, number]>
  >([]);

  useEffect(() => {
    const fetchData = () => {
      fetchAllPrices().then((allPriceData) => {
        const formattedData = formatChartData(allPriceData) as any;
        setFormattedChartData(formattedData);
      });
    };

    fetchData(); // Initial fetch
    const timeout = setInterval(fetchData, 60000); // Fetch every minute

    return () => clearInterval(timeout); // Cleanup on unmount
  }, []);

  function formatChartData(allPriceData: IFetchAllPricesResponse) {
    const cryptoCurrencyList = allPriceData.cryptocurrencys;
    return cryptoCurrencyList.map((crytpocurrency) => [
      crytpocurrency.name,
      crytpocurrency.price,
    ]);
  }

  //  TODO: I think using CSS for chartContainer is not a good practice, this should be changed to a component.
  return (
    <div className={styles.page}>
      <h1>Cryptocurrency Price Tracker</h1>
      <main className={styles.main}>
        <div className={styles.chartContainer}>
          <BarChartComponent
            chartData={formattedChartData}
            title="Current Cryptocurrency Prices"
            yAxisLabel="Price (USD)"
          />
        </div>
      </main>
    </div>
  );
}
