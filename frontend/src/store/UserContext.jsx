import React from 'react'
import { useEffect } from 'react';
import { createContext, useState } from 'react'

export const GlobalContext = createContext();



export function UserContext({ children }) {

    const [user, setUser] = useState("");
    async function getData() {

        try {

            let res = await fetch("http://localhost:9000/api/user/v1/userProfile", {
                method: "GET",
                credentials: "include"
            });


            res = await res.json();
            // console.log(res);
            setUser(res.data);


        } catch (error) {
            console.log();

        }
    }

    useEffect(() => {
        getData();
    }, []);
    // console.log(data)

    return (

        <GlobalContext.Provider value={{ user, setUser, getData }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default UserContext