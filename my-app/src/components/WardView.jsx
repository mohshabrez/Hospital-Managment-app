import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { fetchwards } from "../redux/WardSlice";
import { WardList } from "./WardList";

export const WardView = () => {
    const dispatch = useDispatch()
    const wards = useSelector((state) => state.wards.wards);
    const status = useSelector((state) => state.wards.status)
    const error = useSelector((state) => state.wards.error)

    
    

    useEffect(() => {
        if(status === "idle"){
            dispatch(fetchwards())
        }
    },[status])

    return(
        <div className="px-4 py-4 flex flex-col gap-2 text-white">
            <h1>ward View</h1>
            <Link to={'/wards/add'} className="flex flex-col justify-center items-center">
                <button className="px-2 py-2 bg-gray-600 font-semibold rounded-md">Add ward</button>
            </Link>
            {status === "loading" && <p>Loading....</p>}
            {error && <p className="text-red-800">*Error: {error}</p>}

            <WardList wards={wards}/>
        </div>
    )

}  
