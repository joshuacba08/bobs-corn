import { Sale, useSalesStore } from "@/store/salesStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchSales = async (clientId: number) => {
  const { data } = await apiClient.get(`/sales/clients/${clientId}`);
  return data;
};

export const createSale = async (clientId: number) => {
  const { data } = await apiClient.post("/sales", {
    client_id: clientId.toString(),
    amount: 1.99,
  });
  return data;
};

export const useSales = (clientId: number) => {
  return useQuery({
    queryKey: ["sales", clientId],
    queryFn: () => fetchSales(clientId),
  });
};

export const useCreateSale = (
  notificationCallback: (sale: Sale | AxiosError) => void
) => {
  const addSale = useSalesStore((state) => state.addSale);

  return useMutation({
    mutationFn: createSale,
    onSuccess: (newSale) => {
      addSale(newSale);
      notificationCallback(newSale);
    },
    onError: (error: AxiosError) => {
      notificationCallback(error);
      console.log(error);
    },
  });
};
