import axios from "axios";

export interface Transactions {
  id: number;
  type: string;
  category: string;
  amount: number;
  total: number;
  transaction_date: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTransaction = async (): Promise<Transactions[]> => {
  const response = await apiClient.get("/transactions");
  return response.data.transaction;
};

export const addTransaction = async (
  transaction: Transactions
): Promise<Transactions> => {
  const response = await apiClient.post("/transactions", transaction);
  console.log("add data:", response.data);
  return response.data;
};

export const deleteTransaction = async (id: number): Promise<void> => {
  await apiClient.delete(`/transactions/${id}`);
};
