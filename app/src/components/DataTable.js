import React, {Component} from "react";
import Paper from "@material-ui/core/Paper/Paper";
import TableContainer from "@material-ui/core/TableContainer/TableContainer";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import sampleData from '../data/sampleData.json';
import december from '../data/december.json';
import january from '../data/january.json';
import february from '../data/february.json';

import Search from 'react-search'

const month = "february";
export default class DataTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            attendeesList: {},
            currentMonth: "",
        };
    }

    componentDidMount = async () => {
        this.setState({isLoading: true});
        // this.getData(this.state.currentMonth);
        this.setState({isLoading: false});
    };

    getData = async () => {

        await fetch(`https://dallas.hackernest.com/events/dallas-${month}-2020-tech-social/ajax_attendees_list`, {
            method: "GET",
            headers: new Headers({
                "Access-Control-Allow-Origin": "http://localhost:3000",
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                mode: 'no-cors'
            }),
        }).then(res => res.json())
            .then(res => {
                console.log("RES", res);

                // this.setState({
                //     list: res.aaData,
                //     listLength: res.aaData.length,
                // });
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    };

    getSampleData() {
        this.setState({
            list: sampleData.aaData,
            listLength: sampleData.aaData.length,
        });
        return sampleData
    }

    getDecemberData() {
        this.setState({
            list: december.aaData,
            listLength: december.aaData.length,
        });
        return december
    }

    getJanuaryData() {
        this.setState({
            list: january.aaData,
            listLength: january.aaData.length,
        });
        return january
    }

    getFebruaryData() {
        this.setState({
            list: february.aaData,
            listLength: february.aaData.length,
        });
        return february
    }

    handleOnChange = (e) => {
        const state = this.state;
        this.setState({
            isLoading: true,
        });
        state[e.target.name] = e.target.value;
        // this.getData(e.target.value);
        if (e.target.value === "sample") {
            this.getSampleData()
        }
        if (e.target.value === "december") {
            this.getDecemberData()
        }
        if (e.target.value === "january") {
            this.getJanuaryData()
        }
        if (e.target.value === "february") {
            this.getFebruaryData()
        }

        this.setState({
            state,
            isLoading: false
        });

    };

    render() {

        const {
            list,
            listLength,
            currentMonth,
        } = this.state;

        return (
            <TableContainer component={Paper}>
                <h6>Total Records: {listLength}</h6>
                <select
                    name="currentMonth"
                    value={currentMonth}
                    onChange={this.handleOnChange}
                >
                    <option value=""> </option>
                    <option value="sample">Sample</option>
                    <option value="december">December</option>
                    <option value="january">January</option>
                    <option value="february">February</option>
                </select>
                <button onClick={this.getData}>GET</button>

                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>FullName</TableCell>
                            <TableCell>RegDate</TableCell>
                            <TableCell>Company/Org</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Volunteer?</TableCell>
                            <TableCell>Reason for coming</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list && list.map(data => (
                            <TableRow key={Math.random()}>
                                <TableCell >{data[2]}</TableCell>
                                <TableCell >{data[6]}</TableCell>
                                <TableCell >{data[7]}</TableCell>
                                <TableCell >{data[11]}</TableCell>
                                <TableCell >{data[12]}</TableCell>
                                <TableCell >{data[9]}</TableCell>
                                <TableCell >{data[10]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}


// allDataLength: month.aaData.length,
// attendeesList: {
//     FirstName: sampleData.aaData[pageNumber][0],
//     LastName: sampleData.aaData[pageNumber][1],
//     Email: sampleData.aaData[pageNumber][2],
//     Status: sampleData.aaData[pageNumber][3],
//     Updated: sampleData.aaData[pageNumber][4],
//     Ticket: sampleData.aaData[pageNumber][5],
//     FullName: sampleData.aaData[pageNumber][6],
//     Reg_Date: sampleData.aaData[pageNumber][7],
//     unused: sampleData.aaData[pageNumber][8],
//     CompanyOrg: sampleData.aaData[pageNumber][9],
//     Role: sampleData.aaData[pageNumber][10],
// }