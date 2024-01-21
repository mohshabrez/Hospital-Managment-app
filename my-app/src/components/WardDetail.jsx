import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteward } from "../redux/WardSlice";

export const WardDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wards = useSelector((state) => state?.wards?.wards)
    const ward = wards?.find((ward) => ward?._id === id)
    
    if(!ward){
        return <div className="text-white font-semibold">ward not found.</div>
    }

    const handleDelete = (wardId) => {
        dispatch(deleteward(wardId));
        navigate('/')
    }
    
    return(
        <div className="flex flex-col flex-wrap bg-gray-700 text-white">
            <div className="flex flex-col justify-center text-center gap-1 px-1 py-1">
            <h1 className="underline py-3">Ward Detail</h1>
            <div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Ward Number:</p>
                    <p>{ward.wardNumber}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Capacity:</p>
                    <p>{ward.capacity}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Specialization:</p>
                    <p>{ward.specialization}</p>
                </div>
                <div className=" flex flex-row justify-center py-3 gap-3">
                    <Link to={`/wards/edit/${ward._id}`} state={ward}>
                        <button className="bg-gray-800 text-orange-600 px-3 rounded-md">Edit Details</button>
                    </Link>
                    <button className="bg-gray-800 text-orange-600 px-3 rounded-md" onClick={() => handleDelete(ward._id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
        </div>
        
    )
}