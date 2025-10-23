import React, { SetStateAction } from 'react'
import { IoIosArrowDown } from "react-icons/io";

import handleDrop from './helpers/handleDrop';
import handleDragOver from './helpers/handleDragOver';
import handleManualUpload from './helpers/handleManualUpload';
import useGlobalContext from '../../../customHooks/useContexts';
interface ScanFormProps {
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>,
}

const ScanForm: React.FC<ScanFormProps> = ({setFileList}) => {
    const globalContext = useGlobalContext()
    return(
        <form action="" className='scan-form'>
            <label htmlFor="file-input"
                onDrop={(e) => handleDrop(e, setFileList, globalContext)}
                onDragOver={(e) => handleDragOver(e)}
                className='file-input-label'
            >   <h1>Upload Statement</h1>
                <div>
                    <p>Choose Files</p>
                    <div>
                        <IoIosArrowDown />
                    </div>
                </div>
                <p>By proceeding, you agree to our Terms of Service</p>
            </label>
            <input type="file" id='file-input' name='transactionDocuments' onChange={(e) => handleManualUpload(e, setFileList, globalContext)}/>
        </form>
    )
}

export default ScanForm