// =============================
// FOCUS OS FINAL BOSS (SINGLE FILE VERSION)
// =============================
// NOTE: This is a simplified but WORKING mega-file version
// You can later split into files if needed

import React, { useState, useEffect } from "react";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiOutput, setAiOutput] = useState([]);
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")||"[]"));
  const [music, setMusic] = useState(null);

  // ================= TIMER =================
  useEffect(()=>{
    let interval;
    if(running){
      interval = setInterval(()=>{
        setTime(t=> t>0 ? t-1 : 0);
      },1000);
    }
    return ()=> clearInterval(interval);
  },[running]);

  const formatTime = (t)=>{
    const m = Math.floor(t/60);
    const s = t%60;
    return `${m}:${s<10?"0":""}${s}`;
  }

  // ================= THEME =================
  useEffect(()=>{
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  },[theme]);

  // ================= AI =================
  const sendAI = async ()=>{
    if(!aiInput) return;
    const key = localStorage.getItem("geminiKey");
    const newMsgs = [...aiOutput, {role:"user", text:aiInput}];
    setAiOutput(newMsgs);
    setAiInput("");

    if(!key){
      setAiOutput([...newMsgs, {role:"bot", text:"Add Gemini API key in settings"}]);
      return;
    }

    try{
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`,
      {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({contents:[{parts:[{text: aiInput}]}]})
      });

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error";

      setAiOutput(prev=> [...prev, {role:"bot", text:reply}]);
    }catch(e){
      setAiOutput(prev=> [...prev, {role:"bot", text:"AI failed"}]);
    }
  }

  // ================= TODO =================
  const addTodo = (text)=>{
    const newTodos = [...todos, {text, done:false}];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  const toggleTodo = (i)=>{
    const newTodos = [...todos];
    newTodos[i].done = !newTodos[i].done;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  // ================= UI =================
  return (
    <div style={{padding:20,fontFamily:"sans-serif"}}>

      <h1>🔥 Focus OS Final Boss</h1>

      {/* THEME */}
      <button onClick={()=> setTheme(theme==="dark"?"light":"dark")}>Toggle Theme</button>

      {/* TIMER */}
      <div>
        <h2>Pomodoro</h2>
        <h1>{formatTime(time)}</h1>
        <button onClick={()=> setRunning(!running)}>{running?"Pause":"Start"}</button>
        <button onClick={()=> setTime(25*60)}>Reset</button>
      </div>

      {/* TODO */}
      <div>
        <h2>To-Do</h2>
        <input onKeyDown={(e)=>{if(e.key==='Enter') addTodo(e.target.value)}} placeholder="Add task"/>
        {todos.map((t,i)=>(
          <div key={i} onClick={()=>toggleTodo(i)} style={{textDecoration:t.done?"line-through":"none"}}>
            {t.text}
          </div>
        ))}
      </div>

      {/* MUSIC */}
      <div>
        <h2>Music</h2>
        <input type="file" onChange={(e)=> setMusic(URL.createObjectURL(e.target.files[0]))}/>
        {music && <audio controls src={music}></audio>}
      </div>

      {/* AI */}
      <div>
        <h2>AI Assistant</h2>
        <div style={{height:200,overflow:"auto",border:"1px solid gray"}}>
          {aiOutput.map((m,i)=>(
            <p key={i}><b>{m.role}:</b> {m.text}</p>
          ))}
        </div>
        <input value={aiInput} onChange={e=>setAiInput(e.target.value)} />
        <button onClick={sendAI}>Send</button>
      </div>

      {/* SETTINGS */}
      <div>
        <h2>Settings</h2>
        <input placeholder="Gemini API Key" onBlur={(e)=> localStorage.setItem("geminiKey", e.target.value)} />
      </div>

    </div>
  );
}

// =============================
// END OF FINAL BOSS VERSION
// =============================
