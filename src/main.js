import TextField from '@mui/material/TextField';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import * as THREE from "three";
import NET from 'vanta/dist/vanta.net.min'

import { useState, useEffect,useRef } from 'react';
import {
    Table,
    TableCell,
    TableBody,
    TableRow,
} from "@material-ui/core";

import { useNavigate } from 'react-router-dom';


let data = [];
let idx=0;
export default function Main() {
    let navigate = useNavigate();
    const [multiLine, setMultiLine] = useState("");
    const [tables,setTable]=useState(data);
  const [ADD,setADD]=useState(1);
  const [SUB,setSUB]=useState(1);
  const [MUL,setMUL]=useState(1);
  const [DIV,setDIV]=useState(1);
  const [LD,setLD]=useState(1);
  const [ST,setST]=useState(1);
  const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: myRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 754.00,
                minWidth: 200.00,
                highlightColor: 0xb57a65,
                midtoneColor: 0x4100ff,
                lowlightColor: 0xb2ade2,
                baseColor: 0xffffff,
                color: 0xfceff,
                backgroundColor: 0xc0c2b
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    function addInstruction(){
        let data=tables;
        const n = multiLine.split("\n");
        for(let x in n) {
            let row = n[x];
            if ((row).length > 2) {
                console.log("length ", (row).length)
                data=data.concat({
                    id: ++idx,
                    Instruction: n[x],
                    Issue: "", ExecStart: "", ExecEnd: "", WB: "", tag: "",
                })
            }
        }
        setTable(data);

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
                    <Paper variant="outlined" className='background' ref={myRef} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" color="white" align="center">
                            TOMASOLO
                        </Typography>
                        <React.Fragment>
                            <React.Fragment>
                        <Grid container spacing={2} justifyContent="space-around"  alignItems="center" direction={'row'} >
                         <Grid item xs={12} sm={5} textalign='center'>
                        <Grid item xs textalign='center' component={Paper} elevation={6} square borderRadius={'5px'}>
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
                                fullWidth
                                label="Insert instruction"
                              
                                multiline
                                autoFocus
                                // onChange={ (e)=> {
                                //         setInstructions(e.target.value);
                                //
                                // }}
                                onChange={ (e)=> {
                                    setMultiLine(e.target.value);
                                }}
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


                        <Grid item xs textalign='center' component={Paper} elevation={6} square borderRadius={'5px'}>
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
                                label="Change ADD latency"
                                onChange={ (e)=> {
                                    setADD(e.target.value);
                                }
                            }
                            value={ADD}
                                autoFocus

                              />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                              <TextField
                                margin="normal"
                                fullWidth
                                label="Change SUB latency"
                             
                                onChange={ (e)=> {
                                    setSUB(e.target.value);
                                }
                            }
                            value={SUB}                                autoFocus
                              />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                              <TextField
                              margin="normal"
                              fullWidth
                              label="Change MUL latency"
                              onChange={ (e)=> {
                                setMUL(e.target.value);
                            }
                        }
                        value={MUL}
                              autoFocus
                              /></Grid>
                              <Grid item xs={12} sm={6}>
                              <TextField
                              margin="normal"
                              fullWidth
                              label="Change DIV latency"
                              
                              onChange={ (e)=> {
                                setDIV(e.target.value);
                            }
                        }
                        value={DIV}
                              autoFocus
                            /></Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                            margin="normal"
                            fullWidth
                            label="Change LD latency"
                            onChange={ (e)=> {
                                setLD(e.target.value);
                            }
                        }
                        value={LD}                            autoFocus
                            /></Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                            margin="normal"
                            fullWidth
                            label="Change ST latency"
                          
                            onChange={ (e)=> {
                                setST(e.target.value);
                            }
                        }
                        value={ST}
                            autoFocus
                            />
                            </Grid>
                              
                              
                              <Button
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

                            <Grid item xs={12} sm={5}  textalign='center' component={Paper} elevation={6} square borderRadius={'5px'}>
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
                                        <p style={{ fontSize: "15px", margin: "0px" }}>{item.id}</p>
                                      </TableCell>
                                      <TableCell align="left">
                                        <p style={{ fontSize: "15px", margin: "0px" }}>{item.Instruction}</p>
                                      </TableCell>
                                      
                                      {/* <TableCell>
                                        <button >remove</button>{" "}
                                      </TableCell> */}
                                    </TableRow>
                                  ))
                                }</TableBody>
                              </Table>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={()=>{idx=0; setTable([]);}}
                                        >
                                            Clear Instructions

                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                            </React.Fragment>
                        <React.Fragment>


                            <Box  sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                <Button
                                    variant="contained"
                                    // href="/Anim"
                                    onClick={() => {
                                       navigate("/cycle",{state:{Instructions:tables,
                                               latency:{add:ADD,sub:SUB,mul:MUL,div:DIV,ld:LD,str:ST}
                                       }})
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