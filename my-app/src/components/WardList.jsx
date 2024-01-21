import { useNavigate } from "react-router-dom"

export const WardList = ({ wards}) => {
    const navigate = useNavigate()
    return(
        <div>
            <div className="w-[100%] overflow-x-scroll text-black">
                <table className="w-[100%]">
                    <thead className="bg-gray-200 border-2 border-gray-300">
                        <tr className="hover: cursor-pointer shadow-sm font-bold">
                            <th className="text-center px-2">Ward Number</th>
                            <th className="text-center px-2">Capacity</th>
                            <th className="text-center px-2">Specialization</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wards?.map((ward) => (
                            <tr key={ward?._id} onClick={() => navigate(`/wards/${ward?._id}`)} className="bg-gray-200 text-center px-2">
                                <td className="hover: cursor-pointer font-bold">{ward?.wardNumber}</td>
                                <td className="hover: cursor-pointer font-bold">{ward?.capacity}</td>
                                <td className="hover: cursor-pointer font-bold">{ward?.specialization}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}