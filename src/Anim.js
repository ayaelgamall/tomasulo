import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import { useState, useEffect } from 'react';

function Anim() {
    const theme = createTheme();
    const [UserNames, setUserNames] = useState([]);
    const [Main, setMain] = useState([]);
    const [add, setAdd] = useState([]);
    const [sub, setSub] = useState([]);
    const [mult, setMult] = useState([]);
    const [div, setDiv] = useState([]);
    const [load, setLoad] = useState([]);
    const [store, setStore] = useState([]);
    const [reg, setReg] = useState([]);
    // console.log("here")
    let cycle =0;
    let cont =true;
    let inst=0;//user
    let write=0;
    function doCycle() {
        cycle++;
        issue();
        //delay
        startExecution();
        //delay
        endExecution();
        //delay
        writeResult();
    }
    function issue(){}

    function startExecution(){}

    function endExecution(){}

    function  writeResult(){}



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
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <Typography component="h1" variant="h4" align="center">
                                Cycle : {cycle}
                            </Typography>
                            <React.Fragment>


                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            doCycle();
                                        }}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Next
                                    </Button>
                                </Box>


                            </React.Fragment>
                        </Paper>
                    </Container>

                    </ThemeProvider>

            </div>
        </div>
    )
}

export default Anim;

