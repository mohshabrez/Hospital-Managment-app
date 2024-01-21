import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchwards } from "../redux/WardSlice"

export const PatientList = ({ patients}) => {
    const wards = useSelector((state) => state.wards.wards)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchwards())
    },[])
    const navigate = useNavigate()
    return(
        <div>
            <div className="w-[100%] overflow-x-scroll text-black">
                <table className="w-[100%]">
                    <thead className="bg-gray-200 border-2 border-gray-300">
                        <tr className="hover: cursor-pointer shadow-sm font-bold">
                            <th className="text-center px-2">Name</th>
                            <th className="text-center px-2">Age</th>
                            <th className="text-center px-2">Gender</th>
                            <th className="text-center px-2">Medical History</th>
                            <th className="text-center px-2">Contact Information</th>
                            <th className="text-center px-2">Ward</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients?.map((patient) => {
                            const findWard = wards?.find((ward) => ward?._id === patient?.wardNumber)
                            return(
                                <tr key={patient?._id} onClick={() => navigate(`/patients/${patient?._id}`)} className="bg-gray-200 text-center px-2">
                                <td className="hover: cursor-pointer font-bold">{patient?.name}</td>
                                <td className="hover: cursor-pointer font-bold">{patient?.age}</td>
                                <td className="hover: cursor-pointer font-bold">{patient?.gender}</td>
                                <td className="hover: cursor-pointer font-bold">{patient?.medicalHistory}</td>
                                <td className="hover: cursor-pointer font-bold">{patient?.contactInformation}</td>
                                <td className="hover: cursor-pointer font-bold">{findWard?.wardNumber}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}