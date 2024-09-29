import { useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  async function generateAns() {
    setAnswer("Loading...");
    try {
      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC7mau7wb1zMbjQUhFPUBIpV89Dxi0RE0s',
        method: "post",
        data: { "contents": [{ "parts": [{ "text": question }] }] }
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error(error);
      setAnswer("Error generating response");
    }
  }

  return (
    <>
      <h1 style={{ color: "#000" }}>chat boat AI</h1> {/* Changed text color to black to ensure it's visible */}
      <div className="card">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something you donn't know :)"
        ></textarea>
        <button onClick={generateAns}>Generate</button>
        <pre>{answer}</pre>
      </div>
    </>
  )
}

export default App
