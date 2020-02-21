import React, {Component} from "react";
import Paper from "@material-ui/core/Paper/Paper";
import TableContainer from "@material-ui/core/TableContainer/TableContainer";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";

export default class UnknownSuspects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            apiData: []
        };
    }

    componentDidMount = async () => {
        this.setState({isLoading: true});
        fetch("https://www.dallasopendata.com/resource/jitt-qwwh.json")
            .then(res => res.json())
            .then(res => this.setState({ apiData: res }))
            .catch(() => this.setState({ hasErrors: true }));

        this.setState({isLoading: false});
    };


    render() {

        const {
            apiData
        } = this.state;

        return (
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>incidentnum</TableCell>
                            <TableCell>servyr</TableCell>
                            <TableCell>from_age</TableCell>
                            <TableCell>to_age</TableCell>
                            <TableCell>race</TableCell>
                            <TableCell>ethnic</TableCell>
                            <TableCell>sex</TableCell>
                            <TableCell>height</TableCell>
                            <TableCell>weight</TableCell>
                            <TableCell>build</TableCell>
                            <TableCell>complexion</TableCell>
                            <TableCell>cyes</TableCell>
                            <TableCell>glasses</TableCell>
                            <TableCell>hair</TableCell>
                            <TableCell>hairlenght</TableCell>
                            <TableCell>voice</TableCell>
                            <TableCell>facialhair</TableCell>
                            <TableCell>facialhaircolor</TableCell>
                            <TableCell>peculiarities</TableCell>
                            <TableCell>comment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apiData.map(data => (
                            <TableRow key={Math.random()}>
                                <TableCell component="th" scope="row">{data.incidentnum}</TableCell>
                                <TableCell align="right">{data.servyr}</TableCell>
                                <TableCell align="right">{data.from_age}</TableCell>
                                <TableCell align="right">{data.to_age}</TableCell>
                                <TableCell align="right">{data.race}</TableCell>
                                <TableCell align="right">{data.ethnic}</TableCell>
                                <TableCell align="right">{data.sex}</TableCell>
                                <TableCell align="right">{data.height}</TableCell>
                                <TableCell align="right">{data.weight}</TableCell>
                                <TableCell align="right">{data.build}</TableCell>
                                <TableCell align="right">{data.complexion}</TableCell>
                                <TableCell align="right">{data.cyes}</TableCell>
                                <TableCell align="right">{data.glasses}</TableCell>
                                <TableCell align="right">{data.hair}</TableCell>
                                <TableCell align="right">{data.hairlenght}</TableCell>
                                <TableCell align="right">{data.voice}</TableCell>
                                <TableCell align="right">{data.facialhair}</TableCell>
                                <TableCell align="right">{data.facialhaircolor}</TableCell>
                                <TableCell align="right">{data.peculiarities}</TableCell>
                                <TableCell align="right">{data.comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
