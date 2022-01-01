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
import {
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useLocation} from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableHead = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function Anim() {
    const location = useLocation();
    const key = location.state;
    const theme = createTheme();
    const [main, setMain] = useState(key.Instructions);
    //{Instruction="MUL, R1, R2, R3", Issue=1, ExecStart=2, ExecEnd=5, WB=6,tag=M1, address=null, RD=1, RS=2, RT=3 }

    //add: {Qj= 0, Qk= 0, Vj= 5,Vk=2 ,temp= 12, busy= 1, op="add",started= true, endTime = 4, idx= }
    const [add, setAdd] = useState(getInitialState("A"));
    
    //mul: {Qj= 0, Qk= 0, Vj= 5,Vk=2 ,temp= 10, busy= 1, op="mul",started= true, endTime = 4, idx }
    const [mul, setMul] = useState(getInitialState("M"));

    const [load, setLoad] = useState(getInitialStateLoad());

    const [store, setStore] = useState(getInitialStateStore);

    // reg: [{Qi= , val= }]
    const [reg, setReg] = useState(getInitialStateReg());

    const latency=key.latency;
    // console.log("here")
    let cycle =0;
    let cont =true;
    let inst=0;//user
    let write=0;

    function getInitialStateStore() {
        let res=[];
        for (let i = 1; i <= 3; i++) {
            res.push({tag:"S"+i,Address:"",V:"",Q:"",busy:""});
        }
        return res;
    }
    function getInitialStateReg() {
        let res=[];
        for (let i = 0; i < 32; i++) {
            res.push({tag:"F"+i,Qi:"",val:""});
        }
        return res;
    }

    function getInitialState(a) {
        return [
            {tag: {a}+"1",op:"",Vj:"",Vk:"",Qj:"",Qk:"", busy: "", idx: ""},
            {tag: {a}+"2",op:"",Vj:"",Vk:"",Qj:"",Qk:"", busy: "", idx: ""},
            {tag: {a}+"3",op:"",Vj:"",Vk:"",Qj:"",Qk:"", busy: "", idx: ""},
            ];
    }
    function getInitialStateLoad() {
        return [{tag: "L1", Address: "", busy: "", idx: ""},
            {tag: "L2", Address: "", busy: "", idx: ""},
            {tag: "L3",Address: "",busy: "",idx: ""}];
    }
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
        
        var waiting = main.filter(inst => inst.WB==="" && inst.ExecEnd!=="");
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
                        Qi:""
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
                        Qk:"",
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
                        Qj:"",
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
                        Qk:"",
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
                        Qj:"",
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
    //     add.forEach(addRecord=> {
    //         instruction=main[addRecord.idx];
    //         if(!addRecord.started){        
    //             if(addRecord.Qk!=0 && regReady(instruction.RS)){
    //                 addRecord.Vk =  readReg(instruction.RS)
    //                 addRecord.Qk = 0
    //             }

    //             if(addRecord.Qj!=0 && regReady(instruction.RT)){
    //                 addRecord.Vj =  readReg(instruction.RT)
    //                 addRecord.Qj = 0
    //             }

    //             if(addRecord.Qk==0 && addRecord.Qj==0){
    //                 //  execute ba2a add or sub or div or mul
    //             }
    //         }
    //     });
    }

    function loopOnMul(){
    }

    function loopOnLoadStore(){

    }

    function stringToInstruction(string){
        //returns object in the form {MUL, R1, R2, R3} or {LD, 100} 
    }

    function type(instruction){
        const op= instruction.substring(0,3).toLowerCase();
        if(op==="add"|| op==="sub")return 1;
        if(op==="mul"|| op==="div")return 2;
        if(op==="str")return 3;
        return 4;
        // returns int 1 or 2 or 3 or 4 heya which type mn el talata: 1.(add/sub) 2.(mul/div) 3.(str) 4.ld
    }
    function stationAvailable(stationIdx){
        const station=stationIdx===1?add:stationIdx===2?mul:stationIdx===3?store:load;
        station.forEach(row=>{
            if(row.busy==="")return true;
        });
        return false;
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



    // function add(n1, n2){
    //     //ret ans
    // }
    //
    // function sub(n1, n2){
    //     //ret ans
    // }
    //
    // function mul(n1, n2){
    //     //ret ans
    // }
    //
    // function div(n1, n2){
    //     //ret ans
    // }
    //
    // function load(address){
    //     //ret ans
    // }
    //
    // function store(val, address){
    //     //void
    // }

    function InstructionsFront() {
        return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableHead> </StyledTableHead>
                        <StyledTableHead align="right">Issue</StyledTableHead>
                        <StyledTableHead align="right">Execute</StyledTableHead>
                        <StyledTableHead align="right">Write Result</StyledTableHead>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {main.map((row) => (
                        <StyledTableRow >
                            <StyledTableCell scope="row">
                                {row.Instruction}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.Issue}</StyledTableCell>
                            <StyledTableCell align="right">{row.ExecStart} , {row.ExecEnd}</StyledTableCell>
                            <StyledTableCell align="right">{row.WB}</StyledTableCell>
                        </StyledTableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
        )
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
                                <React.Fragment>
                                    {InstructionsFront()}
                                </React.Fragment>

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

