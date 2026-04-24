import { useForm } from "react-hook-form";
import {
  useCreateCategory,
  type TransactionType,
  type BudgetType,
} from "../../hooks/useCreateCategory";

interface CategoryFormData {
  name: string;
  type: TransactionType;
  userId: number;
  budgetType: BudgetType;
}

const TRANSACTION_TYPES: TransactionType[] = ["RECEITA", "DESPESA"];
const BUDGET_TYPES: BudgetType[] = ["FIXO", "VARIAVEL"];

export function Categories() {
  const { mutate: createCategory, isPending } = useCreateCategory();

  const { register, handleSubmit, resetField, watch } =
    useForm<CategoryFormData>({
      defaultValues: {
        type: "DESPESA",
        budgetType: "FIXO",
        userId: 1,
      },
    });

  const selectedType = watch("type");
  const selectedBudget = watch("budgetType");

  const onSubmit = (data: CategoryFormData) => {
    createCategory(data, {
      onSuccess: () => {
        resetField("name");
      },
      onError: (err: any) => {
        alert(err.response?.data?.message || "Erro ao criar categoria");
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Nova Categoria
        </h1>
      </header>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nome da Categoria */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Nome da Categoria
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="Ex: Supermercado ou Salário"
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tipo de Transação */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Tipo
              </label>
              <div className="flex gap-3">
                {TRANSACTION_TYPES.map((type) => (
                  <label
                    key={type}
                    className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all text-center text-xs font-black ${
                      selectedType === type
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                        : "border-slate-100 text-slate-400 hover:border-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      {...register("type")}
                      value={type}
                      className="hidden"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Tipo de Orçamento */}
            <div className="md:border-l md:border-slate-100 md:pl-8">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Orçamento
              </label>
              <div className="flex gap-3">
                {BUDGET_TYPES.map((bType) => (
                  <label
                    key={bType}
                    className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all text-center text-xs font-black ${
                      selectedBudget === bType
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                        : "border-slate-100 text-slate-400 hover:border-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      {...register("budgetType")}
                      value={bType}
                      className="hidden"
                    />
                    {bType}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-slate-900 text-white p-4 rounded-xl font-black hover:bg-slate-800 transition-all disabled:opacity-50 mt-4"
          >
            {isPending ? "SALVANDO..." : "CADASTRAR CATEGORIA"}
          </button>
        </form>
      </div>
    </div>
  );
}
