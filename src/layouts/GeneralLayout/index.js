import React from "react";
import { Outlet } from "react-router-dom";
import styles from './GeneralLayout.module.css'
import Header from "../Header";
import Sidebar from "../Sidebar";
const GeneralLayout = () => {
    return <>
        <div className={styles.outlet}>
            <Header />
            <div className={styles.layout}>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    </>
}

export default GeneralLayout;