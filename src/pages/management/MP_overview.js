import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@radix-ui/react-dropdown-menu"
import { Link, Route } from "react-router-dom";
import Profile from "./Profile";
import Problems from "./Problems";

export default function MP_LIST() {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger>Management</DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem><Link to="/manage/profile" className="nav-link">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to="/manage/problems" className="nav-link">Problems</Link></DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function MP_ROUTES() {
    return (
        <>
            <Route path="/manage/profile" element={<Profile />} />
            <Route path="/manage/problems" element={<Problems />} />
        </>
    )
}