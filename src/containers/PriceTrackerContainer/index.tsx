import { fetchAllPrices } from "@/api/prices";
import { useEffect, useState } from "react";
import { IFetchAllPricesResponse } from "@/api/prices/types";
import BarChartComponent from "@/components/ECharts/BarChart";
import styled from "styled-components";

const ChartContainer = styled.div`
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
  min-height: 350px;
  min-width: 300px;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// TODO: Modify to accept props.
export default function PriceTrackerContainer() {
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
    return cryptoCurrencyList.map((cryptocurrency) => [
      cryptocurrency.name,
      cryptocurrency.price,
    ]);
  }

  return (
    <ChartContainer>
      <BarChartComponent
        chartData={formattedChartData}
        title="Current Cryptocurrency Prices"
        yAxisLabel="Price"
        formatYAxisAsUSD={true}
      />
    </ChartContainer>
  );
}
