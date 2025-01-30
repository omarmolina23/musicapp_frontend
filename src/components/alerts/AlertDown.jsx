export function AlertDown({params, message}) {
  return (
    <>
      {params && (
        <p className="text-red-500 text-xs mt-1">
          {message}
        </p>
      )}
    </>
  )
}
