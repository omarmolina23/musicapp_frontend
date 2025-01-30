import { Loader2 } from "lucide-react";

export function SignButton({classNameProps, classNameButtonProps, disableButtonProps, loading, message}) {
    return (
        <div className={classNameProps}>
              <button
                className={`${
                 classNameButtonProps && !loading
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-gray-400"
                } flex items-center justify-center gap-2 text-white text-sm font-bold py-3 px-3 rounded-full focus:outline-none focus:shadow-outline w-full transition duration-200 ease-in-out`}
                disabled={disableButtonProps || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Enviando...
                  </>
                ) : (
                  message
                )}
              </button>
            </div>
      )
}