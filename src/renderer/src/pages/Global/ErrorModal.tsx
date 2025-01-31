export const ErrorModal = ({ error, onClose }: { error: string | null; onClose: () => void }) => {
  if (!error) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'red',
        color: 'white',
        padding: '10px'
      }}
    >
      <p>{error}</p>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
