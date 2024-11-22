import { request } from "graphql-request";

export const fetchApi = async (url: string) => {
  if (!url) return null;
  try {
    const data = await fetch(url).then(async (res) => {
      if (!res.ok) {
        throw new Error(res.statusText ?? `Failed to fetch ${url}`);
      }
      const data = await res.json();
      return data;
    });
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : `Failed to fetch ${typeof url === "string"}`
    );
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchApiWithRetry = async (
  url: string,
  attempts: number = 1,
  timeoutInSeconds: number = 0
) => {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetchApi(url);
    } catch (error) {
      if (i === attempts - 1) throw error;
      await delay(timeoutInSeconds * 1000);
    }
  }
};

// I'm not familiar with the graphql-request library, so I need to double-check if this correctly throws response errors.
export const graphQlRequest = async (
  url: string,
  query: string,
  variables?: any
) => {
  if (!url || !query) return null;
  try {
    const data = await request(url, query, variables);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error ? error.message : `Failed to fetch ${url}`
    );
  }
};

export const graphQlRequestlWithRetry = async (
  url: string,
  query: string,
  variables?: any,
  attempts: number = 1,
  timeoutInSeconds: number = 0
) => {
  for (let i = 0; i < attempts; i++) {
    try {
      return await graphQlRequest(url, query, variables);
    } catch (error) {
      if (i === attempts - 1) throw error;
      await delay(timeoutInSeconds * 1000);
    }
  }
};
