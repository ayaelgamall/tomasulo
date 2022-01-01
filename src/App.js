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
import './App.css';
// const useStyles = makeStyles(styles);


function App() {
  // const classes = useStyles();
  const [Instructions, setInstructions] = useState([]);

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

                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            TOMASOLO
                        </Typography>
                        <TextField id="outlined-basic" label="Insert new Instruction" variant="outlined" />
                        <Button variant="contained">Add</Button>
                        <React.Fragment>


                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

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
                    </Paper>
                </Container>


            </div>
            {/* <Footer /> */}
        </div>
    </div>
)
}

export default App;
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