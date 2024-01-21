import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { fetchPatients } from "../redux/PatientSlice";
import { PatientList } from "./PatientList";

export const PatientView = () => {
    const dispatch = useDispatch()
    const patients = useSelector((state) => state.patients.patients);
    const status = useSelector((state) => state.patients.status)
    const error = useSelector((state) => state.patients.error)


    useEffect(() => {
        if(status === "idle"){
            dispatch(fetchPatients())
        }
    },[status, dispatch])

    return(
        <div className="px-4 py-4 flex flex-col gap-2 text-white">
            <h1>Patient View</h1>
            <Link to={'/patients/add'} className="flex flex-col justify-center items-center">
                <button className="px-2 py-2 bg-gray-600 font-semibold rounded-md">Add Patient</button>
            </Link>
            {status === "loading" && <p>Loading....</p>}
            {error && <p className="text-red-800">*Error: {error}</p>}

            <PatientList patients={patients}/>
        </div>
    )

}  
