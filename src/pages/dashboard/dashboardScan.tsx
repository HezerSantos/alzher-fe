import React, { useContext } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'

const ScanHeader: React.FC = () => {
    return(
        <div className='scan-header'>
            <h1>
                Scan
            </h1>
        </div>
    )
}

const ScanForm: React.FC = () => {
    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e.dataTransfer.files)
    }

    const check = (e) => {
        e.preventDefault();

        const form = e.target;
        const input = form.transactionDocuments;
        console.log(input.files);  // This will log the FileList object
    }
    return(
        <form action="" className='scan-form' onSubmit={(e) => check(e)}>
            <label htmlFor="file-input"
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => handleDragOver(e)}
            
            >hello</label>
            <input type="file" id='file-input' name='transactionDocuments'/>
            <button>
                submit
            </button>
        </form>
    )
}

const DashboardScan: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    return(
        <>
            <div className="page-section">
                <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                    <DashboardNav />
                    <DashboardMiniNav />
                    <div className='scan-container'>
                        <ScanHeader />
                        <ScanForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardScan