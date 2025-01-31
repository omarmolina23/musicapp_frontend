export function SideButton({ label, active }) {
  return (
    <div
      className={`w-[100px] items-center mt-2 mb-2 ml-2 mr-1 transition-all duration-300 ease-in-out${
        active ? "bg-gray-900" : "bg-transparent"
      }`}
    >
      <button
        className={`bg-slate-700 flex justify-center  gap-2 py-1 px-4 rounded-full text-sm font-medium w-full  hover:bg-gray-800 hover:text-white ${
          active ? "text-black" : "text-gray-400"
        }`}
      >
        {label}
      </button>
    </div>
  );
}
