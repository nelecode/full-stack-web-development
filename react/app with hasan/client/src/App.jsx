import Entry from './components/entry'
import './App.css'

function App() {

  return (
    <>
    <h1>
      <span>
        emojipedia
      </span>
    </h1>
    <dl className="dictionary">
      <Entry />
      <Entry />
      <Entry />

    </dl>
    </>
  )
}

export default App
