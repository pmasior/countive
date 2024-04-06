import useSWR from "swr";

export const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

export const useFetchSWR = <ResponseType = any>(url: string) => {
  const { data, error } = useSWR<ResponseType>(url, fetcher);
  return {
    data,
    loading: !error && !data,
    error,
  };
};
