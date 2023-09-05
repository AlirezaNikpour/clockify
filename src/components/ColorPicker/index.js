import React from 'react'
import styles from './ColorPicker.module.css'
import InputColor from 'react-input-color';
import { useProjectsContext } from '../../context/ProjectsContext';
function ColorPicker() {

    const { setColor } = useProjectsContext()
    return (
        <div className={styles[`color-picker`]}>
            <span>Choose a color for project</span>
            <InputColor
                initialValue="#5e72e4"
                onChange={setColor}
                placement="right"
            />
        </div>
    )
}

export default ColorPicker