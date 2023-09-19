import { NavLink } from "react-router-dom";

export default function TestNav() {
    return (
        <div className="fixed z-100 left-1/2 top-5 flex transform translate-x--1/2 space-x-5 font-black">
            <NavLink to={`/`}>Home</NavLink>
            <NavLink to={`/login`}>Login</NavLink>
            <NavLink to={`/404`}>Error</NavLink>
        </div>
    );
}