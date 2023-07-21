
import {ReactElement, FC} from "react";
import { Avatar, Box, Chip, InputLabel, Paper, Table, TableBody, TableCell, TableRow} from "@mui/material";
import ToolBar from "../layout/AppBar";
import rank from '../assets/rank.svg';
import { useLeaderboardData } from "../api/leaderboard";
import { LeaderBoardResponse } from "../types/leaderboard";

const LeaderBoard: FC<any> = (): ReactElement => {
    const {data: leaderboard} = useLeaderboardData()
    let data: any = leaderboard || [];
      
    data.sort((a: LeaderBoardResponse, b: LeaderBoardResponse) => {
        return b.score - a.score;
    });
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}>
            <ToolBar hideBtn={false} show={false} badgeOpt={false} toolbarHeight={true}/>
            <Box sx={{position: 'absolute', left: '15%', top: '11%'}}>
                <img src={rank}/>
            </Box>
            <Avatar sx={{position: 'absolute', left: '22%', top: '11%'}}></Avatar>
            <Avatar sx={{position: 'absolute', top: '7%'}}></Avatar>
            <Avatar sx={{position: 'absolute', top: '11%', right:'20%'}}></Avatar>
            {data.length ? 
            (<>
                {data[1] ? <InputLabel sx={{position: 'absolute', left: '27%', top: '30%', color:'white'}}>{data[1].score}</InputLabel> : <></>}
                {data[0] ? <InputLabel sx={{position: 'absolute', top: '30%', color:'white'}}>{data[0].score}</InputLabel> : <></>}
                {data[2] ? <InputLabel sx={{position: 'absolute', top: '30%', right:'25%', color:'white'}}>{data[2].score}</InputLabel> : <></>}
                <Box sx={{ my: 45, mx: 2, color:'primary.dark', width: '100%'}}>
                    <Paper sx={{height: '90%', overflow: 'auto'}}>
                        <Table sx={{ }} aria-label="simple table">
                            <TableBody>
                            {data.map((row: LeaderBoardResponse, i: number) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center" sx={{borderBottom: 'none !important'}}>{i + 1}</TableCell>
                                <TableCell align="center" sx={{borderBottom: 'none !important'}}><div>{row.name}</div></TableCell>
                                <TableCell align="center" sx={{borderBottom: 'none !important'}}><Chip label={row.score} sx={{backgroundColor:"#A7EAEE"}}></Chip></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Box>
            </>) : <></>}
        </Box>
    );
};

export default LeaderBoard;