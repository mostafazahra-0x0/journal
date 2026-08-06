const JournalForm = ({ 
  handleSubmit,
  content,
  handleContentChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={handleContentChange} />
      <button type="submit">Save</button>
    </form>
  )
}
export default JournalForm