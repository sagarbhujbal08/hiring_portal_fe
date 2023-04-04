import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import "./AddOpening.css";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOpening } from "../services/openingServices";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const EditOpening = (props) => {
  const positions = [
    {
      id: 1,
      name: "DevOps Engineer",
    },
    {
      id: 2,
      name: "Android Developer",
    },
    {
      id: 3,
      name: "iOS Developer",
    },
    {
      id: 4,
      name: "Software Tester",
    },
    {
      id: 5,
      name: "Data Engineer",
    },
    {
      id: 6,
      name: "Software Engineer",
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const initialFormState = {
    _id: null,
    jobdescription: "",
    noofvacancy: "",
    position: "",
    yearofexperience: "",
  };
  const [submitted, setSubmitted] = useState(false);
  const [opening, setOpening] = useState(initialFormState);
  const [jdWordCount, setJdWordCount] = useState(0);

  useEffect(() => {
    setOpening(location.state.opening);
  }, [location.state.opening]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "jobdescription") {
      setJdWordCount(value.split(" ").length);
    }
    setOpening({ ...opening, [name]: value });
  };

  const getOpeningInfo = () => {
    return opening;
  };

  const updateCurrentOpening = async (updatedOpening) => {
    await updateOpening(updatedOpening);
    setSubmitted(false);
    navigate("/view");
  };

  const card = (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        if (
          !opening.jobdescription ||
          !opening.noofvacancy ||
          !opening.position ||
          !opening.yearofexperience
        )
          return;
        if (
          jdWordCount > 500 ||
          opening.noofvacancy > 100 ||
          opening.yearofexperience > 15 ||
          opening.noofvacancy < 1 ||
          opening.yearofexperience < 0
        ) {
          return;
        }
        updateCurrentOpening(opening);
      }}
      className="needs-validation"
    >
      <div className="form-grop">
        <FormControl className="form-element">
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            variant="outlined"
            label="Job Description"
            name="jobdescription"
            value={opening.jobdescription}
            onChange={handleInputChange}
          />
          <FormHelperText className="error-text" id="my-helper-text">
            {getOpeningInfo().jobdescription === "" && submitted === true
              ? "Please enter job description"
              : null}
          </FormHelperText>
          <FormHelperText className="error-text" id="my-helper-text">
            {jdWordCount > 500
              ? "Job description max limit is 500 word."
              : null}
          </FormHelperText>
        </FormControl>

        <FormControl className="form-element">
          <InputLabel htmlFor="jd">Number of Vacancy</InputLabel>
          <Input
            id="jd"
            variant="outlined"
            aria-describedby="my-helper-text"
            type="number"
            name="noofvacancy"
            maxRows={4}
            inputProps={{ maxLength: 100 }}
            value={opening.noofvacancy}
            onChange={handleInputChange}
          />
          <FormHelperText className="error-text" id="my-helper-text">
            {getOpeningInfo().noofvacancy > 100
              ? "You can enter max 100 vacancies."
              : null}
          </FormHelperText>
          <FormHelperText className="error-text" id="my-helper-text">
            {getOpeningInfo().noofvacancy === "" && submitted === true
              ? "Please enter number of vacancies."
              : null}
          </FormHelperText>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-label">Position</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-small"
            name="position"
            label="Position"
            value={opening.position}
            onChange={handleInputChange}
          >
            {positions.map((pos) => (
              <MenuItem key={pos.id} value={pos.name}>
                {pos.name}{" "}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText className="error-text" id="my-helper-text">
            {getOpeningInfo().position === "" && submitted === true
              ? "Please enter position."
              : null}
          </FormHelperText>
        </FormControl>

        <FormControl className="form-element">
          <InputLabel htmlFor="jd">Year of Experience</InputLabel>
          <Input
            id="jd"
            variant="outlined"
            aria-describedby="my-helper-text"
            type="number"
            name="yearofexperience"
            value={opening.yearofexperience}
            onChange={handleInputChange}
          />
          <FormHelperText className="error-text" id="my-helper-text">
            {getOpeningInfo().yearofexperience > 15
              ? "You can enter max 15 year experience."
              : null}
          </FormHelperText>
          <FormHelperText className="error-text" id="my-helper-text">
            {getOpeningInfo().yearofexperience === "" && submitted === true
              ? "Please enter experience."
              : null}
          </FormHelperText>
        </FormControl>

        <CardActions>
          <Button type="submit" size="small" variant="outlined">
            Submit
          </Button>
        </CardActions>
      </div>
    </form>
  );

  return (
    <div className="layout">
      <Box>
        <Card variant="outlined" className="cardContant">
          {card}
        </Card>
      </Box>
    </div>
  );
};

export default EditOpening;
