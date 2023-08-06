
import Notification from "@/Pages/Notification";
import UserPage from "@/Pages/UserPage";
import { Children } from "react";
import { createContext, useState } from "react";
const ProfileContext = createContext();
const NavContext = createContext();
export function ProfileProvider({ children }) {
    const [receiver, setReceiver] = useState([]);
    const [dash, setDash] = useState(true);
    const [auth_profile, setProfile] = useState(false);
    const [notification, setNotification] = useState(false);
    const [setting, setSetting] = useState(false);
    const [authenticated, setAuthenticated] = useState([]);
    return (
        <>
            <ProfileContext.Provider value={{ receiver, setReceiver, dash, setDash, auth_profile, setProfile, notification, setNotification, setting, setSetting, authenticated, setAuthenticated }}>
                {children}
            </ProfileContext.Provider>
        </>

    )
}
export default ProfileContext;