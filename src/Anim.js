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
    const [main, setMain] = useState([]);
    //{Instruction="MUL, R1, R2, R3", Issue=1, ExecStart=2, ExecEnd=5, WB=6,tag=M1}
    //
    const [add, setAdd] = useState([]);//{{tag=M1,op=,...,idx=0},{},{}}
    const [mul, setMul] = useState([]);
    const [load, setLoad] = useState([]);
    const [store, setStore] = useState([]);
    const [reg, setReg] = useState([]); 
    //[{val, Qi}]
    const latency=[];
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
    function issue(){
        // instruction=stringToInstruction(inst gdeeda)
        // stationType=type(instruction)
        // if(stationAvailable(stationType))
        // {
        //    putInStation(instruction,stationType)
        // }
        // loopOnStations()

    }

    function startExecution(){
        //put tag in reg
    }

    function endExecution(){
        // remove instructions from reservation station
        // dependent instructions are given result value of ended instructions
    }

    //iman
    //{Instruction="MUL, R1, R2, R3", Issue=1, ExecStart=2, ExecEnd=5, WB=6,tag=M1}
    //{{tag=M1,op=,...,idx=0},{},{}}
    function  writeResult(){
        //1st check if any inst is done excuting but haven't WB yet 
        //i need to go/loop in order 3shan if conflict -> FIFO
        
        //after finding an inst that wants to WB 
        /* loop over reg file, add and mul res stations, any tag replace w instruction o/p
        free up res station -> busy = 0 - maybe remove the inst in front end? wla next cycle?
        write curr cycle in big table
         */
        
        var waiting = main.filter(inst => inst.WB===null && inst.endExecution!==null);
        var curr = waiting[0]; //the inst that'll WB dlw2ty 

        //update reg file, add and mul res stations
        reg.forEach(r=> {
            if(r.Qi === curr.tag){ //TODO - CHECK reg structureee
                //inst output hykon feen???
                //r.val=curr.output; 
                setReg(prevState => ({
                    ...prevState,
                    //a2ol "r" wla a2ol eh
                    r:{
                        val:curr.output,
                        Qi:null
                    }
                }));
            }
        });
        add.forEach(a=> {
            if(a.Qk === curr.tag){ 
                //inst output hykon feen???
                setAdd(prevState => ({
                    ...prevState,
                    //a2ol "a" wla a2ol eh
                    a:{
                        Qk:null,
                        Vk: curr.output
                    }
                }));
            }
            if(a.Qj === curr.tag){ 
                //inst output hykon feen???
                setAdd(prevState => ({
                    ...prevState,
                    //a2ol "a" wla a2ol eh
                    a:{
                        Qj:null,
                        Vj: curr.output
                    }
                }));
            }
        });
        mul.forEach(m=> {
            if(m.Qk === curr.tag){ 
                //inst output hykon feen???
                setAdd(prevState => ({
                    ...prevState,
                    //a2ol "m" wla a2ol eh
                    m:{
                        Qk:null,
                        Vk: curr.output
                    }
                }));
            }
            if(m.Qj === curr.tag){ 
                //inst output hykon feen???
                setAdd(prevState => ({
                    ...prevState,
                    //a2ol "m" wla a2ol eh
                    m:{
                        Qj:null,
                        Vj: curr.output
                    }
                }));
            }
        });

        
    }

    
    function loopOnStations(){
       loopOnAdd()
       loopOnMul()
       loopOnLoadStore()
    }

    function loopOnAdd()
    {
        // for(int i=0;i<add.length;i++){ loop ya3ni be ay shakl
        //       instruction = add[i]
        //        if(inst didn't already start exec){
        //          if(Qk==0 && Qj==0){
        //              execute ba2a add or sub or div or mul
        //         }
        //         else{
        //          if(Qk!=0 && regReady(instruction's 1st reg)){
        //              Vk =  readReg(instruction's 1ST reg);
        //              Qk = 0
        //              update Vk & Qk
        //          }
        //          else if(Qj!=0 && regReady(instruction's 2nd reg)){
        //              UPDATE Vj & Qj
        //              Vj =  readReg(instruction's 2nd reg);
        //              Qj = 0
        //          }
        //        }
        // }      
    }

    function loopOnMul(){
    }

    function loopOnLoadStore(){

    }

    function stringToInstruction(string){
        //returns object in the form {MUL, R1, R2, R3} or {LD, 100} 
    }

    function type(instruction){
        // returns int 1 or 2 or 3 heya which type mn el talata: 1.(add/sub) 2.(mul/div) 3.(ld/str)
    }
    function stationAvailable(stationIdx){
        // masalan law stationIdx=1: yb2a check el (add/sub), 
        // law stationIdx=2: yb2a check el (mul/div), 
        // law stationIdx=3: yb2a check el (ld/str)
        // returns boolean
    }

    function putInStation(instruction, stationIdx){
        //w update el tag bel station example: tag=M1
        //void
    }

    function regReady(register){
        //returns true register has val, false if no val yet (just tag)
        //always call this before calling readReg
    }

    function readReg(register){
        //returns value 
    }



    function add(n1, n2){
        //ret ans
    }

    function sub(n1, n2){
        //ret ans
    }   

    function mul(n1, n2){
        //ret ans
    }   

    function div(n1, n2){
        //ret ans
    }   

    function load(address){
        //ret ans
    }

    function store(val, address){
        //void
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

