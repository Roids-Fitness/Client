import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>}/>
        <Route path="/class-timetable" element={<h1>Calendar Page</h1>}/>
        <Route path="/register" element={<h1>Register Page</h1>}/>
        <Route path="/login" element={<h1>Login Page</h1>}/>
        <Route path="/class/:id" element={<h1>Class Details Page</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
