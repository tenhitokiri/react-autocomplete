import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('https://reqres.in/api/users')
      setUsers(response.data.data)
    }
    loadUsers()
  }, []
  )
  const suggestionHandler = (text) => {
    setText(text)
    setSuggestions([])
  }
  const onChangeHandler = (text) => {
    let matches = []
    if (text.length>0) {
      matches = users.filter(user => {
        const regex = new RegExp(`${text}`,"gi")
        return user.email.match(regex)
      })
    }
    setSuggestions(matches)
    setText(text)
  }
  return (
    <div className="container">
      <input type="text"
        placeholder="Enter your Email"
        style={{ marginTop: 10 }}
        className="col-md-12 input"
        onChange={e=>onChangeHandler(e.target.value)}
        onBlur={() => { 
          setTimeout(() =>{
            setSuggestions([])
          }, 1000)
        }}
        value={text}
      />
      {suggestions && suggestions.map((suggestion, i) =>
          <div key={i} className="suggestion col-md-12 justify-content-md-center"
          onClick={()=>suggestionHandler(suggestion.email)}
          >{suggestion.email}</div>
        )}
    </div>
  );
}

export default App;
