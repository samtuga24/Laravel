
import Notification from "@/Pages/Notification";
import UserPage from "@/Pages/UserPage";
import { Children } from "react";
import { createContext, useState } from "react";
const ProfileContext = createContext();
export function ProfileProvider({children}){
    const [receiver, setReceiver] = useState([]);
    return(
        <ProfileContext.Provider value={{ receiver, setReceiver }}>
            {children}
        </ProfileContext.Provider>
    )
}
export default ProfileContext;