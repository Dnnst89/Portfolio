"use client";

import React from "react";
import Navbar from "./includes/Navbar";
import TopMenu from "./includes/TopMenu";
import { useQuery } from "@apollo/client";
//import GET_USERS from "@/src/graphQl/queries/getUsers";

const MainLayour = ({ children }) => {
    //const { data } = useQuery(GET_USERS);
    // console.log(data);
    return (
        <>
            <div className="">
                <TopMenu />
                <Navbar />
            </div>

            <main className="">{children}</main>

            <div>foot</div>
        </>
    );
};

export default MainLayour;
