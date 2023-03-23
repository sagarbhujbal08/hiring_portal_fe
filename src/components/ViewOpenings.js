import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';
import { Link, useNavigate } from "react-router-dom";
import './ViewOpenings.css';
import { getAllOpenings, deleteOpening } from '../services/openingServices';
import LoadingSpinner from "./LoadingSpinner";


const ViewOpenings = () =>{
    const [cnt, setCnt] = useState(0);
    const [openings, setOpenings] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchData() {
            const response = await getAllOpenings();
            if(response.length){
                setOpenings(response);
            }
          }
          fetchData();
    },[cnt])
    
    const editOpening = opening => {
        navigate('/edit',{state: {opening : opening}});
    };

    const deleteCurrentOpening = async (data) => {
        await deleteOpening(data);
        setCnt(cnt+1);
    };

    return (
        <div className='tableContent'>
            {openings.length === 0 ? (<LoadingSpinner />) : null}
            {openings.length ? 
            (<>
                <TableContainer component={Paper} className="tableContainer container">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center" width="30%">Job Description</TableCell>
                    <TableCell align="center">No. of vacancy</TableCell>
                    <TableCell align="center">Position</TableCell>
                    <TableCell align="center">Year of experience</TableCell>
                    <TableCell align="center">Action</TableCell>
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
                    <TableCell align="center" style={{ verticalAlign: 'top' }}>
                        <Icon className='action-icon' onClick={() => { editOpening(row)}}>edit</Icon>
                        <Icon className='action-icon' onClick={() => { deleteCurrentOpening(row)}}>delete</Icon>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
             <div className='container pt-3'><Link to="/report">Generate Report</Link></div>
            </>)
             : null}
        </div>
    )
}

export default ViewOpenings;