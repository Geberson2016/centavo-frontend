import { useForm } from "react-hook-form";
import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";
import { BankIcon } from "../../components/BankIcon";

interface TransactionFormData {
  description: string;
  value: number;
  date: string;
  accountId: number;
  categoryId: number;
  type: "RECEITA" | "DESPESA";
}

export function Transactions() {
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();
  const { mutate: createTransaction, isPending } = useCreateTransaction();

  const { register, handleSubmit, watch, resetField } =
    useForm<TransactionFormData>({
      defaultValues: {
        date: new Date().toISOString().split("T")[0],
        type: "DESPESA",
      },
    });

  const selectedAccountId = watch("accountId");

  const selectedAccount = accounts?.find(
    (acc) => acc.id === Number(selectedAccountId),
  );

  const selectedType = watch("type");
  const filteredCategories =
    categories?.filter((cat) => cat.type === selectedType) || [];

  const onSubmit = (data: TransactionFormData) => {
    createTransaction(data, {
      onSuccess: () => {
        resetField("description");
      },
      onError: (err: any) => {
        alert(err.response?.data?.message || "Erro ao criar transação");
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Nova Transação
        </h1>
      </header>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              O que aconteceu?
            </label>
            <div className="flex gap-4">
              {["DESPESA", "RECEITA"].map((t) => (
                <label
                  key={t}
                  className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all text-center font-bold ${selectedType === t ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-100 text-slate-400"}`}
                >
                  <input
                    type="radio"
                    {...register("type")}
                    value={t}
                    className="hidden"
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Descrição
            </label>
            <input
              {...register("description", { required: true })}
              placeholder="Ex: Cemig Energia"
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Valor
              </label>
              <input
                type="number"
                step="0.01"
                {...register("value", { required: true, valueAsNumber: true })}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Data
              </label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600"
              />
            </div>
          </div>

          <div className="flex justify-between items-end">
            <BankIcon name={selectedAccount?.name} className="w-12 h-12" />
            <div className="flex-1 ml-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Conta
              </label>
              <select
                {...register("accountId", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600 bg-white"
              >
                <option value="">Selecione uma conta</option>
                {accounts?.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Categoria
            </label>
            <select
              {...register("categoryId", {
                required: true,
                valueAsNumber: true,
              })}
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600 bg-white"
            >
              <option value="">Selecione uma categoria</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-slate-900 text-white p-4 rounded-xl font-black hover:bg-slate-800 transition-all disabled:opacity-50 mt-4"
          >
            {isPending ? "SALVANDO..." : "CONFIRMAR TRANSAÇÃO"}
          </button>
        </form>
      </div>
    </div>
  );
}
