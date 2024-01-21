import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { validateWardInput, wardSpecialization } from "../utils/wardUtils";
import { addward, updatewardAsync } from "../redux/WardSlice";
import { fetchwards } from "../redux/WardSlice";

export const WardForm = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const wards = useSelector((state) => state.wards.wards)

    const ward = state ? state: null;

    const [wardInput, setwardInput] = useState({
        wardNumber: ward ? ward.wardNumber : "",
        capacity: ward ? ward.capacity : "",
        specialization: ward ? ward.specialization : wardSpecialization[0]
    })

    useEffect(() => {
        if(wards?.length === 0){
            dispatch(fetchwards())
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidated = validateWardInput(wardInput)
        if(isValidated){
            setError("");

            if(ward){
                dispatch(
                    updatewardAsync({ id: ward._id, updatedward: wardInput })    
                )
                navigate(`/wards/${ward._id}`)
            }else{
                dispatch(addward(wardInput))
                navigate('/')
            }
        }else{
            setError("Please fill all the required fields")
        }
    }

    return(
        <div className="flex flex-col justify-center items-center py-20">
            <div className="flex flex-col flex-wrap justify-between rounded-md  max-w-max gap-2 px-5 py-5 text-center bg-slate-700 text-white  place-items-center">
            <h1>{ward ? "Edit ward" : "Add ward"}</h1>
            <form className="flex flex-col gap-5 py-2">
                <label className="flex justify-between px-2">Ward Number:
                    <input className="bg-gray-800 rounded-md" required placeholder="Enter Ward Number" type="number" value={wardInput.wardNumber} onChange={(e) => setwardInput({...wardInput, wardNumber: e.target.value})}/>
                </label>
                <label className="flex justify-between px-2">
                    Capacity:
                    <input className="rounded-md bg-gray-800" required placeholder="Enter Capacity" type="number" min={0} value={wardInput.capacity} onChange={(e) => setwardInput({ ...wardInput, capacity: e.target.value})}/>
                </label>
                <label className="flex justify-between px-2">
          Specialization:
            <select
              onChange={(e) =>
                setwardInput({ ...wardInput, specialization: e.target.value })
              }
              value={wardInput.ward}
              className="text-black"
            >
              {wardSpecialization?.map(( specialization) => (
                <option className="text-black" value={specialization} key={specialization}>
                  {specialization}
                </option>
              ))}
            </select>
        </label>
                {error && <small className="text-red-800">*{error}</small>}
                <button className="bg-gray-800 rounded-md w-fit-content px-2 py-0.5 font-semibold" onClick={handleSubmit}>
                    {ward ? "Update": "Add"}
                </button>
            </form>
        </div>
        </div>
        
    )
}