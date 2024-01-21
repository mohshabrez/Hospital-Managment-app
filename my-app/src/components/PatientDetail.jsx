import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { deletePatient } from "../redux/PatientSlice";
import { useEffect } from "react";
import { fetchwards } from "../redux/WardSlice";

export const PatientDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const patients = useSelector((state) => state?.patients?.patients)
    const patient = patients?.find((patient) => patient?._id === id)
    const wards = useSelector((state) => state.wards.wards)
    useEffect(() => {
        dispatch(fetchwards())
    },[])
    const findWard = wards?.find((ward) => ward?._id === patient?.wardNumber)
    if(!patient){
        return <div className="text-white font-semibold">patient not found.</div>
    }

    const handleDelete = (PatientId) => {
        dispatch(deletePatient(PatientId));
        navigate('/')
    }
    
    return(
        <div className="flex flex-col flex-wrap bg-gray-700 text-white">
            <div className="flex flex-col justify-center text-center gap-1 px-1 py-1">
            <h1 className="underline py-3">Patient Detail</h1>
            <div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Name:</p>
                    <p>{patient?.name}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Age:</p>
                    <p>{patient?.age}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Gender:</p>
                    <p>{patient?.gender}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Contact:</p>
                    <p>{patient?.contactInformation}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Ward:</p>
                    <p>{findWard?.wardNumber}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Medical History:</p>
                    <p>{patient.medicalHistory}</p>
                </div>
                <div className=" flex flex-row justify-center py-3 gap-3">
                    <Link to={`/patients/edit/${patient._id}`} state={patient}>
                        <button className="bg-gray-800 text-orange-600 px-3 rounded-md">Edit Details</button>
                    </Link>
                    <button className="bg-gray-800 text-orange-600 px-3 rounded-md" onClick={() => handleDelete(patient._id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
        </div>
        
    )
}