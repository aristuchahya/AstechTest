import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/validation/transactions";
import {
  addTransaction,
  deleteTransaction,
  fetchTransaction,
  Transactions,
} from "@/lib/api";
import { showToast } from "@/components/ui/showToast";

export const useFetchTransaction = () => {
  const { data, isLoading } = useQuery<Transactions[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransaction,
  });

  return { data, isLoading };
};
export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<Transactions>({
    resolver: zodResolver(transactionSchema),
    mode: "onChange",
  });

  const mutation = useMutation<Transactions, Error, Transactions>({
    mutationFn: async (transaction: Transactions) => {
      return await addTransaction(transaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      showToast("Transaction added successfully", "success");
      reset();
    },
    onError: () => {
      showToast("Failed to add transaction", "error");
    },
  });

  const onSubmit: SubmitHandler<Transactions> = (data) => {
    data.transaction_date = new Date(data.transaction_date).toISOString();
    mutation.mutate(data);
  };

  return { register, handleSubmit, errors, onSubmit, setValue };
};

export const useDeleteTransaction = (): UseMutationResult<
  void,
  Error,
  number
> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await deleteTransaction(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      showToast("Transaction deleted successfully", "success");
    },
    onError: () => {
      showToast("Failed to delete transaction", "error");
    },
  });
};
