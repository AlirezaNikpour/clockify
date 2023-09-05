import React from "react";
import { Outlet } from "react-router-dom";
import styles from './GeneralLayout.module.css'
import Header from "../Header";
import Sidebar from "../Sidebar";
import ProjectsProvider from "../../context/ProjectsContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TaskProvider } from "../../context/TaskContext";
import ClientsProvider from "../../context/ClientContext";

const GeneralLayout = () => {
    return <>
        <div className={styles.outlet}>
            <Header />
            <div className={styles.layout}>
                <ClientsProvider>
                    <ProjectsProvider>
                        <TaskProvider>
                            <Sidebar />
                            <div className={styles.main}>
                                <Outlet />
                                <ToastContainer />
                            </div>
                        </TaskProvider>
                    </ProjectsProvider>
                </ClientsProvider>
            </div>
        </div>
    </>
}

export default GeneralLayout;