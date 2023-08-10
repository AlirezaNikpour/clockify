import React from "react";
import { Outlet } from "react-router-dom";
import styles from './GeneralLayout.module.css'
import Header from "../Header";
import Sidebar from "../Sidebar";
import ProjectsProvider from "../../context/ProjectsContext";
const GeneralLayout = () => {
    return <>
        <div className={styles.outlet}>
            <Header />
            <div className={styles.layout}>
                <ProjectsProvider>
                    <Sidebar />
                    <div className={styles.main}>
                        <Outlet />
                    </div>
                </ProjectsProvider>
            </div>
        </div>
    </>
}

export default GeneralLayout;