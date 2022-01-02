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
import { DeveloperBoardOffOutlined } from '@mui/icons-material';
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
    // const [main, setMain] = useState(key.Instructions);
    const [memory, setMemory] = useState([0,0,0,0,0,0,0,0,0,0]);

    const [main, setMain] = useState([{Instruction:"ADD, R1, R2, R3", Issue:1, ExecStart:"", ExecEnd:"", WB:6,tag:"A1", address:null},
                                        {Instruction:"ADD, R1, R2, R3", Issue:1, ExecStart:"", ExecEnd:"", WB:6,tag:"A2", address:null},
                                        // {Instruction:"MUL, R1, R2, R3", Issue:1, ExecStart:"", ExecEnd:"", WB:6,tag:"M1", address:null},
                                        {Instruction:"STR, 3, 5", Issue:1, ExecStart:"", ExecEnd:"", WB:6,tag:"S1", address:null},
                                        {Instruction:"LD, 3", Issue:1, ExecStart:"", ExecEnd:"", WB:6,tag:"L1", address:null}]
);

    // {Instruction="MUL, R1, R2, R3", Issue=1, ExecStart=2, ExecEnd=5, WB=6,tag=M1, address=null, RD=1, RS=2, RT=3 }

    //add: {Qj= 0, Qk= 0, Vj= 5,Vk=2 ,temp= 12, busy= 1, op="add",started= true, endTime = 4, idx= ""}
    const [add, setAdd] = useState(getInitialState("A"));
    
    //mul: {Qj= 0, Qk= 0, Vj= 5,Vk=2 ,temp= 10, busy= 1, op="mul",started= true, endTime = 4, idx:"" }
    const [mul, setMul] = useState(getInitialState("M"));

    const [load, setLoad] = useState(getInitialStateLoad());
    // store :{tag:"S1" ,Address:"", V:"", Q:"", busy:1, started: false, temp:"",idx: "",temp=""}
    const [store, setStore] = useState(getInitialStateStore);

    // reg: [{Qi= , val= }]
    const [reg, setReg] = useState(getInitialStateReg());

    const latency=key.latency;
    // console.log("here")
    const [cycle, setCycle] = useState(0);
    let cont =true;
    let inst=0;//user
    let write=0;

    function getInitialStateStore() {
        let res=[];
        for (let i = 1; i <= 3; i++) {
            res.push({tag:"S"+i,Address:"",V:"",Q:"",busy:"",started: false, idx:""});
        }
        return res;
        // return [{tag:"S1" ,Address:3, V:4, Q:"", busy:1, started: false, idx:2}]

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
            {tag: {a}+"1",op:"",Vj:"",Vk:"",Qj:"",Qk:"", busy: "", idx: "",started: false,temp:""},
            {tag: {a}+"2",op:"",Vj:"",Vk:"",Qj:"",Qk:"", busy: "", idx: "",started: false,temp:""},
            {tag: {a}+"3",op:"",Vj:"",Vk:"",Qj:"",Qk:"", busy: "", idx: "",started: false,temp:""},
            ];
        // return [{tag:"A1", Qj: "", Qk:"", Vj:5, Vk:2 ,temp:"", busy: 0, op:"add",started: false, idx:0},
        //        {tag:"A2", Qj: "", Qk: "", Vj:5, Vk:2, temp: "", busy: 1, op:"add",started: false, idx:1}];
        // return [{tag:"M1",op:"mul", Vj:5, Vk:2 ,Qj: "", Qk:"", busy: 1,  idx:2,started: false, temp:""}]
    }
    function getInitialStateLoad() {
        // return [{tag: "L1", Address: "", busy: "", idx: "",started: false,temp:""},
        //     {tag: "L2", Address: "", busy: "", idx: "",started: false,temp:""},
        //     {tag: "L3",Address: "",busy: "",idx: "",started: false,temp:""}];
        return [{tag: "L1", Address: 2, busy: 1, idx: 3,started: false,temp:""}]
    }
    function doCycle() {
        setCycle(cycle+1);
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

    }

 
    function loopOnStore()
    {
        // store: [ {tag:"S1" ,Address:3, V:4, Q:"", busy:1, started: false, temp:""}]

        console.log("store")
        console.log(store)

        let store2=store;
        let main2=main;

        for(let i=0;i<store.length;i++){
            const inst=store[i]
            if(inst.busy===1 && !inst.started && inst.V!=="")
            {
            
                 console.log("will do store ")
                 console.log(store[i])
                
                store2[i].started=true;
                
                main2[store[i].idx].ExecStart=cycle

                exec(main2[store[i].idx].Instruction,inst.Address,inst.V)
            }
        }
        
        setStore(store2);
        setMain(main2);
        console.log("main after store")
        console.log(main)
        console.log("store after change")
        console.log(store)
    }
    function loopOnLoad()
    {
        console.log("load")
        console.log(load)

        let load2=load;
        let main2=main;

        for(let i=0;i<load.length;i++){
            const inst=load[i]
            if(inst.busy===1 && !inst.started && inst.V!=="")
            {
            
                 console.log("will do load ")
                 console.log(load[i])
                
                load2[i].started=true;
                
                main2[load[i].idx].ExecStart=cycle
                load2.temp=exec(main2[load[i].idx].Instruction,inst.Address,inst.V)
                console.log("loaded")

                console.log(load2.temp)
            }
        }
        
        setLoad(load2);
        setMain(main2);
        console.log("main after load")
        console.log(main)
        console.log("load after change")
        console.log(load2)
    }
    function loopOnAdd()
    {
        
        // add: [{tag=A1, Qj= 0, Qk= 0, Vj= 5,Vk=2 ,temp= null, busy= 1, op="add",started= true, endTime =4 }]

    console.log("add"+add)
    let add2=add;
    let main2=main;

    for(let i=0;i<add.length;i++){
        const inst=add[i]
        if(inst.busy===1 && inst.Qk==="" && inst.Qj==="" && !inst.started)
        {
        
            console.log("will execute"+Object.values(add2[i]))
            
            add2[i].started=true;
            
            main2[add[i].idx].ExecStart=cycle

            add2[i].temp = exec(main2[add[i].idx].Instruction,add2[i].Vj,add2[i].Vk)
        }
    }
       
    setAdd(add2);
    setMain(main2);
    console.log("main after change"+main)
    console.log("add after change"+add)

    }
    function loopOnMul(){
        
        // mul: [{tag=M1, Qj= 0, Qk= 0, Vj= 5,Vk=2 ,temp= null, busy= 1, op="mul",started= true, endTime =4 }]
        console.log("dakhal")
        console.log("mul"+mul)
        let mul2=mul;
        let main2=main;

        for(let i=0;i<mul.length;i++){
            const inst=mul[i]
            if(inst.busy===1 && inst.Qk==="" && inst.Qj==="" && !inst.started)
            {
            
                console.log("will execute "+Object.values(mul2[i]))
                
                mul2[i].started=true;
                
                mul2[i].temp = exec(main2[mul[i].idx].Instruction,mul2[i].Vj,mul2[i].Vk)
            }
        }
        setMul(mul2);
        setMain(main2);

        console.log("main")
        console.log(main)
        console.log("mul after change")
        console.log(mul)
    }

    
  

    function endExecution(){
        main.forEach(item=>{
            if(item.ExecStart!==null){
                if(item.endExecution===null){
                    const op= item.Instruction.substring(0,3).toLowerCase();
                    if(latency.op+item.ExecStart-1===cycle){
                        setMain(prevState => ({
                            ...prevState,
                            item:{
                                ExecEnd:cycle
                            }
                        }));
                    }
                }
            }
        });
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

        const waiting = main.filter(inst => inst.WB === "" && inst.ExecEnd !== "");
        if(waiting.length>0) {
            const curr = waiting[0]; //the inst that'll WB dlw2ty
            //update reg file, add and mul res stations
            reg.forEach(r => {
                if (r.Qi === curr.tag) { //TODO - CHECK reg structureee
                    //inst output hykon feen???
                    //r.val=curr.output;
                    setReg(prevState => ({
                        ...prevState,
                        //a2ol "r" wla a2ol eh
                        r: {
                            val: curr.output,
                            Qi: ""
                        }
                    }));
                }
            });
            add.forEach(a => {
                if (a.Qk === curr.tag) {
                    //inst output hykon feen???
                    setAdd(prevState => ({
                        ...prevState,
                        //a2ol "a" wla a2ol eh
                        a: {
                            Qk: "",
                            Vk: curr.output
                        }
                    }));
                }
                if (a.Qj === curr.tag) {
                    //inst output hykon feen???
                    setAdd(prevState => ({
                        ...prevState,
                        //a2ol "a" wla a2ol eh
                        a: {
                            Qj: "",
                            Vj: curr.output
                        }
                    }));
                }
            });
            mul.forEach(m => {
                if (m.Qk === curr.tag) {
                    //inst output hykon feen???
                    setAdd(prevState => ({
                        ...prevState,
                        //a2ol "m" wla a2ol eh
                        m: {
                            Qk: "",
                            Vk: curr.output
                        }
                    }));
                }
                if (m.Qj === curr.tag) {
                    //inst output hykon feen???
                    setAdd(prevState => ({
                        ...prevState,
                        //a2ol "m" wla a2ol eh
                        m: {
                            Qj: "",
                            Vj: curr.output
                        }
                    }));
                }
            });
        }
        
    }
    function MUL(n1,n2){return Number(n1)*Number(n2)}
    function ADD(n1,n2){return Number(n1)+Number(n2)}
    function DIV(n1,n2){return Number(n1)/Number(n2)}
    function SUB(n1,n2){return Number(n1)-Number(n2)}
    function LD(address){return memory[address]}

    function STR(address, value){
        console.log("will change mem")
        let memory2=memory;
        memory2[address]=value;
        setMemory(memory2);
        console.log("memory after store")
        console.log(memory)
    }
    
 
    
    function startExecution(){
       loopOnAdd()
       loopOnMul()
       loopOnLoad()
       loopOnStore()
    }


    function exec(s,Vj,Vk){
        const inst=s.split(',');
        console.log(inst[0])
        let X=inst[0].toLowerCase()
        console.log("X",X)
        switch(X){
            case "add": return ADD(Vj,Vk)
            case "sub": return SUB(Vj,Vk)
            case "mul": return MUL(Vj,Vk)
            case "div": return DIV(Vj,Vk)
            case "str": return STR(Vj,Vk)
            case "ld": return LD(Vj)
        }
   

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
            <Table  aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableHead> </StyledTableHead>
                        <StyledTableHead align="left">Issue</StyledTableHead>
                        <StyledTableHead align="left">Execute</StyledTableHead>
                        <StyledTableHead align="left">Write Result</StyledTableHead>
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
                    <Container component="main"  sx={{ mb: 4 }}>
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
                                            console.log("hi");
                                           loopOnLoad();
                                        }}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Test
                                    </Button>
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