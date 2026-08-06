
import styled from 'styled-components'

const JournalTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  max-width: 700px;
  height: 70vh;
  border:5px solid ;
  border-radius: 20px;
  border-color: #463221;
  background: #74634d;
`
const JournalForm = ({ 
  handleSubmit,
  content,
  handleContentChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <JournalTextArea value={content} onChange={handleContentChange} />
      <button type="submit">Save</button>
    </form>
  )
}
export default JournalForm