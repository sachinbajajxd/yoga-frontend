import {BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import {Toaster} from 'react-hot-toast'


function App() {
  return (
    <div className='App'>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
