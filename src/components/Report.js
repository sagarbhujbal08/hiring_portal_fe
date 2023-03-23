import { useEffect, useState } from 'react';
import './Report.css';
import { getAllOpenings } from '../services/openingServices';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Screenshot from './Screenshot';
import Button from '@mui/material/Button';
import LoadingSpinner from "./LoadingSpinner";

const Report = () =>{
    const [openings, setOpenings] = useState([]);
    const [screenshot, setScreenshot] = useState(false);
    const [screenshotBlob, setScreenshotBlob] = useState(null);
    useEffect(()=>{
        async function fetchData() {
            // You can await here
            const response = await getAllOpenings();
            setOpenings(response);
            setScreenshot(true);
          }
          fetchData();
    },[])

    const handleScreenshotBlob = async (data) =>{
        setScreenshotBlob(data);
        setScreenshot(false);
    }

    const downloadFile = () =>{
        const link = document.createElement('a');
        link.download = 'report.png';
        link.href = screenshotBlob
        link.click();
    }


    return(
        <div className='report tableContent'>
            {screenshot === true ? (<div className='hideVisibility'><Screenshot openings={openings} handleScreenshotBlob={handleScreenshotBlob}/></div>) : null}
            
            {(openings.length === 0 || screenshotBlob == null) ? (<LoadingSpinner />) : null}
            {openings.length && screenshotBlob ? (
                <>
                    <TableContainer component={Paper} className="tableContainer container">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center" width="30%">Job Description</TableCell>
                                <TableCell align="center">No. of vacancy</TableCell>
                                <TableCell align="center">Position</TableCell>
                                <TableCell align="center">Year of experience</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {openings.map((row) => (
                                <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center" style={{ verticalAlign: 'top' }}>{row.jobdescription}</TableCell>
                                <TableCell align="center" style={{ verticalAlign: 'top' }}>{row.noofvacancy}</TableCell>
                                <TableCell align="center" style={{ verticalAlign: 'top' }}>{row.position}</TableCell>
                                <TableCell align="center" style={{ verticalAlign: 'top' }}>{row.yearofexperience}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        <div className='container p-3'>
                        <Button type='submit' size="small" variant="outlined" onClick={downloadFile}>Download</Button>
                            </div>
                </>
            ) : null}
            
        </div>
    );
}

export default Report;