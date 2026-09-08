import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

export type TransactionType = "INCOME" | "EXPENSE";
export type BudgetType = "FIXED" | "VARIABLE";

interface CategoryRequest {
  name: string;
  type: TransactionType;
  userId: number;
  budgetType: BudgetType;
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory: CategoryRequest) => {
      return api.post("/categories", newCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
