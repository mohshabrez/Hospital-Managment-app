import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { validatePatientInput } from "../utils/patientUtils";
import { addPatient, updatePatientAsync } from "../redux/PatientSlice";
import { fetchwards } from "../redux/WardSlice";

export const PatientForm = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const wards = useSelector((state) => state.wards.wards)
    const patient = state ? state: null;

    const [patientInput, setpatientInput] = useState({
        name: patient ? patient.name : "",
        age: patient ? patient.age : 0,
        gender: patient ? patient.gender : "Male",
        medicalHistory: patient ? patient.medicalHistory : "",
        contactInformation: patient ? patient.contactInformation : 0,
        wardNumber: patient ? patient.wardNumber : wards[0]
    })

    useEffect(() => {
        dispatch(fetchwards())
    },[])

    
    const handleSubmit = (e) => {
        e.preventDefault();

        const isValidated = validatePatientInput(patientInput)
        
        if(isValidated){
            setError("");

            if(patient){
                dispatch(
                    updatePatientAsync({ PatientId: patient._id, updatedpatient: patientInput })    
                )
                navigate(`/patients/${patient._id}`)
            }else{
                dispatch(addPatient(patientInput))
                navigate('/')
            }
        }else{
            setError("Please fill all the required fields")
        }
    }

    return(
        <div className="flex flex-col justify-center items-center py-20">
            <div className="flex flex-col flex-wrap justify-between rounded-md  max-w-max gap-2 px-5 py-5 text-center bg-slate-700 text-white  place-items-center">
            <h1>{patient ? "Edit patient" : "Add patient"}</h1>
            <form className="flex flex-col gap-5 py-2">
                <label className="flex justify-between px-2">Name:
                    <input className="bg-gray-800 rounded-md" required placeholder="Enter Name" type="text" value={patientInput.name} onChange={(e) => setpatientInput({...patientInput, name: e.target.value})}/>
                </label>
                <label className="flex justify-between px-2">
                    Age:
                    <input className="rounded-md bg-gray-800" required placeholder="Age" type="number" min={0} value={patientInput.age} onChange={(e) => setpatientInput({ ...patientInput, age: e.target.value})}/>
                </label>
                <div>
                    <label className="flex justify-between  px-2">
                        Gender:
                        <label>
                            <input type="radio" value="Male" name="gender" checked={patientInput.gender === "Male"} onChange={(e) => setpatientInput({ ...patientInput, gender: e.target.value})}/>
                            Male:
                        </label>
                        <label>
                            <input type="radio" value="Female" name="gender" checked={patientInput.gender === "Female"} onChange={(e) => setpatientInput({ ...patientInput, gender: e.target.value})}/>
                            Female:
                        </label>
                    </label>
                </div>
                <label className="flex justify-between px-2">
                    Medical History:
                    <input className="rounded-md bg-gray-800" type="text" required value={patientInput.medicalHistory} name="medicalHistory" min={0} placeholder="Medical History" onChange={(e) => setpatientInput({ ...patientInput, medicalHistory: e.target.value})}/>
                </label>
                <label className="flex justify-between px-2">
                    Contact:
                    <input className="rounded-md bg-gray-800" type="number" required value={patientInput.contactInformation} name="contactInformation" max={100} placeholder="Contact" onChange={(e) => setpatientInput({ ...patientInput, contactInformation: e.target.value})}/>
                </label>
                <label className="flex justify-between px-2">
          Wards:
            <select className="text-black"
              onChange={(e) =>
                setpatientInput({ ...patientInput, wardNumber: e.target.value })
              }
              value={patientInput.wardNumber}
            >
              {wards?.map(({ _id, wardNumber, specialization }) => (
                <option value={_id} key={_id}>
                  {wardNumber} - {specialization}
                </option>
              ))}
            </select>
        </label>
                {error && <small>*{error}</small>}
                <button className="bg-gray-800 rounded-md w-fit-content px-2 py-0.5 font-semibold" onClick={handleSubmit}>
                    {patient ? "Update": "Add"}
                </button>
            </form>
        </div>
        </div>
        
    )
}