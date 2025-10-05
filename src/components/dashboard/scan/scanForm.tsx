import React, { SetStateAction } from 'react'
import { IoIosArrowDown } from "react-icons/io";

import handleDrop from './helpers/handleDrop';
import handleDragOver from './helpers/handleDragOver';
import handleManualUpload from './helpers/handleManualUpload';
interface ScanFormProps {
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>,
}

const ScanForm: React.FC<ScanFormProps> = ({setFileList}) => {
    return(
        <form action="" className='scan-form'>
            <label htmlFor="file-input"
                onDrop={(e) => handleDrop(e, setFileList)}
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
            <input type="file" id='file-input' name='transactionDocuments' onChange={(e) => handleManualUpload(e, setFileList)}/>
        </form>
    )
}

export default ScanForm