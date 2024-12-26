import { create } from "zustand";

export interface Sale {
  id: number;
  client_id: string;
  purchase_time: string;
  amount: string;
}

interface SalesState {
  confirmedSales: Sale[];
  setSales: (sales: Sale[]) => void;
  addSale: (sale: Sale) => void;
}

export const useSalesStore = create<SalesState>((set) => ({
  confirmedSales: [],
  setSales: (sales) => set({ confirmedSales: sales }),
  addSale: (sale) =>
    set((state) => ({
      confirmedSales: [...state.confirmedSales, sale],
    })),
}));
