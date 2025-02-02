import { useNavigate } from "react-router-dom";

export function SuccessfulRegister () {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-900 text-white p-6">
      {/* Nombre de la app arriba del cuadro */}
      <div className="px-10 py-2 rounded-lg shadow-md text-xl font-bold text-blue-400 mb-6">
        MusicApp
      </div>

      {/* Cuadro con el mensaje */}
      <div className="bg-slate-100 text-black p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">¡Registro Exitoso! 🎉</h1>
        <p className="text-lg mb-6">
          Ya puedes disfrutar de todo el catálogo de música que tenemos para ti.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold italic transition"
        >
          ¡Vamos allá!
        </button>
      </div>
    </div>
  );
};


