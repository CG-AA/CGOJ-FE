import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"

export default function MP_LIST() {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger>Management</DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem><Link to="/manage/profile" className="nav-link">Profile</Link></DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}