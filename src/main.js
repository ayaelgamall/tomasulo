import logo from './logo.svg';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from 'react';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow
} from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// import './App.css';
// const useStyles = makeStyles(styles);
let data = [];
let idx=0;
export default function Main() {
  // const classes = useStyles();
  const [Instructions, setInstructions] = useState([]);
  const [tables,setTable]=useState(data);
  
    function addInstruction(){
        console.log("data");
        console.log(Instructions);


        data.push(
        {
            id : ++idx,
            Instruction:Instructions,
            Issue:"", ExecStart:"", ExecEnd:"", WB:"",tag:"", address:"", RD:"", RS:"", RT:""
        });
        setTable(data);
        console.log(data);

    }
  return (
    <div>
        <div
            // className={classes.pageHeader}
            // style={{
            //     backgroundImage: "url(" + image + ")",
            //     backgroundSize: "cover",
            //     backgroundPosition: "top center",
            // }}
        >
            <div >

                <Container component="main" maxWidth="" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            TOMASOLO
                        </Typography>
                        <React.Fragment>
                            <React.Fragment>
                        <Grid container spacing={2} justifyContent="space-around"  alignItems="center" direction={'row'} >
                         <Grid item xs={12} sm={5} textalign='center'>
                        <Grid item xs textalign='center' component={Paper} elevation={6} square>
                          <Box sx={{
                              my: 8,
                              mx: 4,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}>
                            <Typography component="h1" variant="h5">Instructions</Typography>
                            <Box component="form" noValidate  sx={{ mt: 1 }}>
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Insert instruction"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={ (e)=> {
                                        setInstructions(e.target.value);
                                    
                                }
                            }
                              />
                              
                              
                              <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={addInstruction}
                              >
                                Add Instruction
                               
                              </Button>
                              
                            </Box>
                          </Box>
                          
                        </Grid>
                        {/*<Grid item xs={12} sm={1}  square>*/}
                        {/*</Grid>*/}


                        <Grid item xs textalign='center'component={Paper} elevation={6} square>
                          <Box
                            sx={{
                              my: 8,
                              mx: 4,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <Typography component="h1" variant="h5">
                            Change Latency 
                                                      </Typography>
                            <Box component="form" noValidate  sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Change ADD latency"
                                name="email"
                                value="1"
                                autoComplete="email"
                                autoFocus
                              />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                              <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Change SUB latency"
                                name="email"
                                autoComplete="email"
                                value="1"
                                autoFocus
                              />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                              <TextField
                              margin="normal"
                              fullWidth
                              id="email"
                              label="Change MUL latency"
                              name="email"
                              autoComplete="email"
                              value="1"
                              autoFocus
                              /></Grid>
                              <Grid item xs={12} sm={6}>
                              <TextField
                              margin="normal"
                              fullWidth
                              id="email"
                              label="Change DIV latency"
                              name="email"
                              autoComplete="email"
                              value="1"
                              autoFocus
                            /></Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Change LD latency"
                            name="email"
                            autoComplete="email"
                            value="1"
                            autoFocus
                            /></Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Change ST latency"
                            name="email"
                            autoComplete="email"
                            value="1"
                            autoFocus
                            />
                            </Grid>
                              
                              
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                              >
                                Change
                              </Button>
                              </Grid>
                            </Box>
                          </Box>
                        </Grid>
                        </Grid>

                            <Grid item xs={12} sm={5}  textalign='center' component={Paper} elevation={6} square>
                                <Box sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                    <Typography component="h1" variant="h5">
                                        Your Instructions
                                    </Typography>
                                    <Box component="form" noValidate  sx={{ mt: 1 }}>
                                    <Table>
                                     {/* <TableHead>
                                   <TableRow >
                                     <TableCell><strong>id</strong></TableCell>
                                     <TableCell>name</TableCell>
                                     <TableCell>action</TableCell>
                                   </TableRow> 
                                 </TableHead>*/}
                                 <TableBody>
                                 {tables.map(item => (
                                    <TableRow key={item.id}>
                                      <TableCell align="left">
                                        <p style={{ fontSize: "13px", margin: "0px" }}>{item.Instruction}</p>
                                      </TableCell>
                                      <TableCell align="left">
                                        <p style={{ fontSize: "13px", margin: "0px" }}>{item.id}</p>
                                      </TableCell>
                                      <TableCell>
                                        <button >remove</button>{" "}
                                      </TableCell>
                                    </TableRow>
                                  ))
                                }</TableBody>
                              </Table>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                            </React.Fragment>
                        <React.Fragment>


                            <Box  sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                <Button
                                    variant="contained"
                                    href="/Anim"
                                    onClick={() => {
                                       
                                    }}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                  Execute program
                                    
                                </Button>
                            </Box>


                        </React.Fragment>
                        </React.Fragment>
                    </Paper>
                </Container>


            </div>
            {/* <Footer /> */}
        </div>
    </div>
)
}

// import * as React from 'react';
// import ReactDOM from 'react-dom';
// import Button from '@mui/material/Button';

// function App() {
//   return <Button variant="contained">Hello World</Button>;
// }

// ReactDOM.render(<App />, document.querySelector('#app'));
// export default App;

// import React, { useState, useRef } from "react";
// // import TextField from "@material-ui/core/TextField";

// import {
//   Table,
//   TableCell,
//   TableBody,
//   TableHead,
//   TableRow
// } from "@material-ui/core";
// const data = [
//   {
//     id: 1,
//     name: "tom1"
//   },
//   {
//     id: 2,
//     name: "tom2"
//   },
//   {
//     id: 3,
//     name: "tom3"
//   },
//   {
//     id: 4,
//     name: "mike"
//   }
// ];
// const Demo = () => {
//   const key = useRef(null);
//   const [word, setWord] = useState("");
//   const focusText = (id, name) => {
//     setWord(name);
//   };

//   return (
//     <>
//       <TextField
//         style={{ width: "100%" }}
//         id="outlined-basic"
//         variant="outlined"
//         value={word}
//         size="small"
//         color="primary"
//         ref={key}
//         onChange={e => {
//           setWord(e.target.value);
//         }}
//       />
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>id</TableCell>
//             <TableCell>name</TableCell>
//             <TableCell>action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//         {
//           data.map(item => (
//             <TableRow key={item.id}>
//               <TableCell align="left">
//                 <p style={{ fontSize: "13px", margin: "0px" }}>{item.id}</p>
//               </TableCell>
//               <TableCell align="left">
//                 <p style={{ fontSize: "13px", margin: "0px" }}>{item.name}</p>
//               </TableCell>
//               <TableCell>
//                 <button onClick={() => focusText(item.id, item.name)}>edit</button>{" "}
//               </TableCell>
//             </TableRow>
//           ))
//         }</TableBody>
//       </Table>
//     </>
//   );
// };
// export default Demo;