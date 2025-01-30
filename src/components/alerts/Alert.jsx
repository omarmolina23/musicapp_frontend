export function Alert({message}) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
      <span>
      <span className="font-semibold">Error: </span>{message}
      </span>
    </div>
  )
}


