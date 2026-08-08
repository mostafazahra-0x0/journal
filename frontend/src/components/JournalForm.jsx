const JournalForm = ({
  handleSubmit,
  content,
  handleContentChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="journal-entry" className="field">Today&rsquo;s inscription</label>
      <textarea
        id="journal-entry"
        value={content}
        onChange={handleContentChange}
        placeholder="Write the day as it happened&hellip;"
      />
      <button type="submit" className="btn btn-gold">
        Inscribe on paper <span className="btn-arrow" aria-hidden="true">&rarr;</span>
      </button>
    </form>
  )
}
export default JournalForm