import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { PatientView } from './components/PatientView';
import { PatientForm } from './components/PatientForm';
import { PatientDetail } from './components/PatientDetail';
import { WardView } from './components/WardView';
import { WardDetail } from './components/WardDetail';
import { WardForm } from './components/WardForm';
import { HospitalView } from './components/HospitalView';

function App() {
  return (
    <div className="App bg-gray-800 min-h-screen">
      <NavBar/>
      <Routes>
        <Route path='/' element={<PatientView/>}/>
        <Route path='/patients/:id' element={<PatientDetail/>}/>
        <Route path='/patients/add' element={<PatientForm/>}/>
        <Route path='/patients/edit/:id' element={<PatientForm/>}/>
        <Route path='/wards' element={<WardView/>}/>
        <Route path='/wards/:id' element={<WardDetail/>}/>
        <Route path='/wards/add' element={<WardForm/>}/>
        <Route path='/wards/edit/:id' element={<WardForm/>}/>
        <Route path='/hospitals' element={<HospitalView/>}/>
      </Routes>
    </div>
  );
}

export default App;
