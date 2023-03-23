import { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import './AddOpening.css';
import { createOpening } from '../services/openingServices';
import { useNavigate } from 'react-router';
// import Toaster from "./Toaster";


const AddOpening = () =>{
    const initialFormState = { jobdescription: '', noofvacancy: '', position: '', yearofexperience: '' }
    const [submitted, setSubmitted] = useState(false);
    const [toasterObj, setToasterObj] = useState(null);
    const [opening, setOpening] = useState(initialFormState);
    const [jdWordCount, setJdWordCount] = useState(0);
    const navigate = useNavigate();
    
    const positions = [
        {
            'id':1,
            'name':'DevOps Engineer'
        },
        {
            'id':2,
            'name':'Android Developer'
        },
        {
            'id':3,
            'name':'iOS Developer'
        },
        {
            'id':4,
            'name':'Software Tester'
        },
        {
            'id':5,
            'name':'Data Engineer'
        },
        {
            'id':6,
            'name':'Software Engineer'
        }
      ];

    const addOpening = async (opening) => {
        let response = await createOpening(opening);
        console.log("response = ",response)
        setToasterObj(response);
        setOpening(initialFormState);
        setSubmitted(false);
        navigate("/view");
    };

    const handleInputChange = event =>{
        const { name, value } = event.target;
        if(name === 'jobdescription'){
            setJdWordCount(value.split(' ').length);
        }
        setOpening({...opening, [name]: value});
    }

    const getOpeningInfo = () =>{
        return opening;
    }


    const card = (
    <>
        {/* {toasterObj ? (<Toaster data={toasterObj}/>) : null} */}
        <form
        onSubmit={event => {
            event.preventDefault();
            setSubmitted(true);
            if (!opening.jobdescription || !opening.noofvacancy || !opening.position || !opening.yearofexperience) return;
            if(jdWordCount > 500 || opening.noofvacancy > 100 || opening.yearofexperience > 15 || opening.noofvacancy < 1 || opening.yearofexperience < 0){
                return;
            }

            addOpening(opening);
        }}
        className="needs-validation"     
      >
        <div className='form-grop'>
            <FormControl className='form-element'>
                <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                variant="outlined"
                label="Job Description"
                name="jobdescription"
                onChange={handleInputChange}
                />
                <FormHelperText className="error-text" id="my-helper-text">{(getOpeningInfo().jobdescription === '' && submitted === true) ? 'Please enter job description' : null}</FormHelperText>
                <FormHelperText className="error-text" id="my-helper-text">{jdWordCount > 500 ? 'Job description max limit is 500 word.' : null}</FormHelperText>
            </FormControl>

            <FormControl className='form-element'>
                <InputLabel htmlFor="jd">Number of Vacancy</InputLabel>
                <Input id="jd" variant="outlined" aria-describedby="my-helper-text" type="number" name="noofvacancy"
                maxRows={4} inputProps={{ maxLength: 100 }} onChange={handleInputChange} />
                <FormHelperText className="error-text" id="my-helper-text">{getOpeningInfo().noofvacancy > 100 ? 'You can enter max 100 vacancies.' : null}</FormHelperText>
                <FormHelperText className="error-text" id="my-helper-text">{(getOpeningInfo().noofvacancy === '' && submitted === true) ? 'Please enter number of vacancies.' : null}</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-small"
                    name="position"
                    label="Position"
                    onChange={handleInputChange}
                >
                    {positions.map(pos => ( 
                    <MenuItem key={pos.id} value={pos.name}>{pos.name} </MenuItem>
                    ))}
                </Select>
                <FormHelperText className="error-text" id="my-helper-text">{(getOpeningInfo().position === '' && submitted === true) ? 'Please enter position.' : null}</FormHelperText>
            </FormControl>

            <FormControl className='form-element'>
                <InputLabel htmlFor="jd">Year of Experience</InputLabel>
                <Input id="jd" variant="outlined" aria-describedby="my-helper-text" type="number" name="yearofexperience"
                onChange={handleInputChange} />
                <FormHelperText className="error-text" id="my-helper-text">{getOpeningInfo().yearofexperience > 15 ? 'You can enter max 15 year experience.' : null}</FormHelperText>
                <FormHelperText className="error-text" id="my-helper-text">{(getOpeningInfo().yearofexperience === '' && submitted === true) ? 'Please enter experience.' : null}</FormHelperText>
            </FormControl>

            <CardActions>
                <Button type='submit' size="small" variant="outlined">Submit</Button>
            </CardActions>
        </div>
        
        </form>
    </>
    );

    return(
        <>
            {card}
        </>
    )
}

export default AddOpening;