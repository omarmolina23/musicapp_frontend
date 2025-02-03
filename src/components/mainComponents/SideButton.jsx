export function SideButton({ label, active }) {
  return (
    <div className="flex justify-center">
      <button
        className={`bg-slate-700/80 backdrop-blur-md flex justify-center gap-2 py-1 px-4 rounded-full text-sm font-medium w-auto hover:bg-white/20 transition-all duration-300 ${
          active ? "text-white" : "text-gray-400"
        }`}
      >
        {label}
      </button>
    </div>
  );
}
