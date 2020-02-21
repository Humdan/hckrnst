import React,  { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import sampleData from '../data/sampleData';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString(),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString(),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: value => value.toFixed(2),
    },
];


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

async function getData() {
    await fetch('https://www.dallasopendata.com/resource/9fxf-t2tr.json')
        .then(response => response.json())
        .then(async (data) => {
            return data;
        }).catch((err)=> {
            console.log("err ", err)
        })
}

function getSampleData() {
    return sampleData
}



const CallTable = () => {
    const classes = useStyles();
    const dataList = getData();
    const [hasError, setErrors] = useState(false);
    const [planets, setPlanets] = useState({});

    useEffect(() =>
        fetch("https://swapi.co/api/planets/4/")
            .then(res => res.json())
            .then(res => this.setState({ planets: res }))
            .catch(() => this.setState({ hasErrors: true }))
    );

    // const dataList = getSampleData();

    // const dataList = getData();
    if (!dataList){
        console.log("Waiting");
        // const dataList = [];
        const dataList = [
            {
                "incident_number": "20-0098347",
                "division": "South Central",
                "nature_of_call": "6X - Major Dist (Violence)",
                "priority": "2",
                "date_time": "2020-01-15T23:33:00.000",
                "unit_number": "A744",
                "block": "4200",
                "location": "E Ledbetter Dr",
                "beat": "732",
                "reporting_area": "4276",
                "status": "At Scene"
            },
            {
                "incident_number": "20-0098090",
                "division": "Southwest",
                "nature_of_call": "6X - Major Dist (Violence)",
                "priority": "2",
                "date_time": "2020-01-15T23:32:00.000",
                "unit_number": "A416",
                "block": "2700",
                "location": "Kingston St",
                "beat": "447",
                "reporting_area": "4159",
                "status": "At Scene"
            },
            {
                "incident_number": "20-0098091",
                "division": "BLAH",
                "nature_of_call": "6X - Major Dist (Violence)",
                "priority": "2",
                "date_time": "2020-01-15T23:32:00.000",
                "unit_number": "A416",
                "block": "2700",
                "location": "Kingston St",
                "beat": "447",
                "reporting_area": "4159",
                "status": "At Scene"
            }
        ];
    } else {
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>Incident#</TableCell>
                            <TableCell>Division</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Nature</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Unit#</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Beat</TableCell>
                            <TableCell>ReportingArea</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*<button onClick={this.getData}>Reload</button>*/}
                        {dataList.map(data => (
                            <TableRow key={Math.random()}>
                                <TableCell component="th" scope="row">
                                    {data.date_time}
                                </TableCell>
                                <TableCell align="right">{data.incident_number}</TableCell>
                                <TableCell align="right">{data.division}</TableCell>
                                <TableCell align="right">{data.status}</TableCell>
                                <TableCell align="right">{data.nature_of_call}</TableCell>
                                <TableCell align="right">{data.priority}</TableCell>
                                <TableCell align="right">{data.unit_number}</TableCell>
                                <TableCell align="right">{data.block} {data.location}</TableCell>
                                <TableCell align="right">{data.beat}</TableCell>
                                <TableCell align="right">{data.reporting_area}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
};

export default CallTable;