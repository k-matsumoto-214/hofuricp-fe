import useSWRImmutable from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useImmutable = (url: string) => {
  const { data, error } = useSWRImmutable(url, fetcher, {
    shouldRetryOnError: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
