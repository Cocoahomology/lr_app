import { graphQlRequestlWithRetry } from "@/utils/async";
import { gql } from "graphql-request";
import { LR_SERVER } from "@/constants/endpoints";
import { IFetchAllPricesResponse } from "./types";

export const fetchAllPrices = async (): Promise<IFetchAllPricesResponse> => {
  const query = gql`
    query {
      cryptocurrencys {
        name
        symbol
        price
        lastUpdated
      }
    }
  `;

  const response = await graphQlRequestlWithRetry(LR_SERVER, query);
  return response as IFetchAllPricesResponse;
};
