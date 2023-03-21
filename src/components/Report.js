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
        <div className='report'>
        {screenshot === true ? (<div className='hideVisibility'><Screenshot openings={openings} handleScreenshotBlob={handleScreenshotBlob}/></div>) : null}
            
            <TableContainer component={Paper} className="tableContainer container">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left">Job Description</TableCell>
                    <TableCell align="left">No. of vacancy</TableCell>
                    <TableCell align="left">Position</TableCell>
                    <TableCell align="left">Year of experience</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {openings.map((row) => (
                    <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="left">{row.jobdescription}</TableCell>
                    <TableCell align="left">{row.noofvacancy}</TableCell>
                    <TableCell align="left">{row.position}</TableCell>
                    <TableCell align="left">{row.yearofexperience}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
      {openings.length && screenshotBlob ? (<div className='container'>
      <button className="btn btn-primary mt-3" onClick={downloadFile}>Download</button>
        </div>) : null}
        </div>
    );
}

export default Report;