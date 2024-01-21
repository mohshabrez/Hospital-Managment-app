import { NavLink } from "react-router-dom"

export const NavBar = () => {
    return(
        <nav className="px-4 py-3 flex flex-wrap justify-between shadow-md rounded-b-md">
             <h1 className="bg-gradient-to-r from-orange-600 to-red-500 text-transparent bg-clip-text">
                <NavLink to="/">Hospital Managment</NavLink>    
            </h1>  
            <ul className="flex items-center gap-3 md:gap-4 text-white flex-wrap font-semibold">
                <li className="hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 hover:text-transparent hover:bg-clip-text">
                   <NavLink to="/">Patients</NavLink>
                </li>
                <li className="hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 hover:text-transparent hover:bg-clip-text">
                   <NavLink to="/wards">Wards</NavLink>
                </li>
                <li className="hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 hover:text-transparent hover:bg-clip-text">
                   <NavLink to="/hospitals">Hospitals</NavLink>
                </li>
            </ul> 
        </nav>
    )
}