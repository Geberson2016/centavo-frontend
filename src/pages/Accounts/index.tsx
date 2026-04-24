import { useForm } from "react-hook-form";
import {
  useCreateAccount,
  type AccountType,
} from "../../hooks/useCreateAccount";

interface AccountFormData {
  name: string;
  type: AccountType;
  userId: number;
}

const ACCOUNT_TYPES: AccountType[] = [
  "CORRENTE",
  "POUPANCA",
  "INVESTIMENTO",
  "DINHEIRO",
  "CARTAO_CREDITO",
];

export function Accounts() {
  const { mutate: createAccount, isPending } = useCreateAccount();

  const { register, handleSubmit, resetField, watch } =
    useForm<AccountFormData>({
      defaultValues: {
        type: "CORRENTE",
        userId: 1,
      },
    });

  const selectedType = watch("type");

  const onSubmit = (data: AccountFormData) => {
    createAccount(data, {
      onSuccess: () => {
        resetField("name");
      },
      onError: (err: any) => {
        alert(err.response?.data?.message || "Erro ao criar conta");
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Nova Conta
        </h1>
      </header>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nome da Conta */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Nome da Conta
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="Ex: Bradesco Corrente"
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600"
            />
          </div>

          {/* Tipo de Conta */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Tipo de Conta
            </label>
            <div className="grid grid-cols-2 gap-3">
              {ACCOUNT_TYPES.map((type) => (
                <label
                  key={type}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center text-xs font-black tracking-tighter ${
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
                  {type.replace("_", " ")}
                </label>
              ))}
            </div>
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-slate-900 text-white p-4 rounded-xl font-black hover:bg-slate-800 transition-all disabled:opacity-50 mt-4"
          >
            {isPending ? "SALVANDO..." : "CADASTRAR CONTA"}
          </button>
        </form>
      </div>
    </div>
  );
}
