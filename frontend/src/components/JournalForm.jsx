const JournalForm = ({ 
  handleSubmit,
  content,
  handleContentChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={handleContentChange} />
    </form>
  )
}

export default JournalForm