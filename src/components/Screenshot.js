import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import Header from './Header';
import Footer from './Footer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Screenshot.css';

export default function Screenshot(props) {
  const [canvasHeight, setCanvasHeight] = useState(0)
  // var canvasHeight;//props.openings.length * 0 + 610;
  var canvas,
    ctx,
    flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0;
    var tooltype = 'draw';
  var w = 0,
    h = 0;

  const init = () => {
    
    canvas = document.getElementById("imgLayer");
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener(
      "mousemove",
      function(e) {
        findxy("move", e);
      },
      false
    );
    canvas.addEventListener(
      "mousedown",
      function(e) {
        findxy("down", e);
      },
      false
    );
    canvas.addEventListener(
      "mouseup",
      function(e) {
        findxy("up", e);
      },
      false
    );
    canvas.addEventListener(
      "mouseout",
      function(e) {
        findxy("out", e);
      },
      false
    );
    setTimeout(() => {
      capture();
    }, 200);
  };

  const findxy = (res, e) => {
    // debugger;
    if (res === "down") {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;

      flag = true;
    }
    if (res === "up" || res === "out") {
      flag = false;
    }
    if (res === "move") {
      if (flag) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        draw();
      }
    }
  };

  const draw = () => {
    ctx.beginPath();
    if(tooltype === 'draw'){
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
    }
    else{
       ctx.globalCompositeOperation = 'destination-out';
       ctx.lineWidth = 15;
    }
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
   
    ctx.stroke();
    ctx.closePath();
  };

  useEffect(() => {
    init();
    getHeight();
  });

  const getHeight = (e)=>{
    var body = document.body,
    html = document.documentElement;
    let canvasHeigt = Math.max( body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight );
    setCanvasHeight(canvasHeigt +490)
    }
                      
  
  const capture = () => {
    html2canvas(document.querySelector("#app"),{scale:2})
      .then(canvas1 => {
        let imgLayer = document.getElementById("bgLayer");
        let ctx = imgLayer.getContext("2d");
        ctx.drawImage(canvas1, 0, 0, 700, +canvasHeight);
        var dataURL = imgLayer.toDataURL();
        props.handleScreenshotBlob(dataURL);
      })
      .catch(console.log);
  };
  return (
    <div className="App main-container" id="app">
        
      <div className="canvasContainer">
        <Header />
        <section className='tableContent'>
            <TableContainer component={Paper}>
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
                {props.openings.map((row) => (
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
            </section>
        <Footer />
      
        <canvas className="canvas" id="bgLayer" width="700" height={canvasHeight} />
        <canvas className="canvas" id="imgLayer" width="700" height={canvasHeight} />
      </div>
    </div>
  );
}
