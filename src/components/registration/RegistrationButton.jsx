import { Loader2 } from "lucide-react"

export function RegistrationButton({classNameProps, validName, validEmail, validPassword, loading, message}) {
  return (
    <div className={classNameProps}>
          <button
            className={`${
              validName && validEmail && validPassword && !loading
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-400"
            } flex items-center justify-center gap-2 text-white text-sm font-bold py-3 px-3 rounded-full focus:outline-none focus:shadow-outline w-full`}
            disabled={!validName || !validEmail || !validPassword || loading}
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
