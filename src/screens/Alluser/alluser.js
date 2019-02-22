import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login } from '../../store/action/action'
import ButtonAppBar from '../../components/container'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import './Alluser.css';
import swal from 'sweetalert';
import History from '../../history';
import firebase from '../../confic/firebase'
import { current_User } from '../../store/action/action'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MediaCard from './card'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}




class Alluser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        }
    }
    componentDidMount() {
        var arr1 = []
        firebase.database().ref('/UserData/').on('child_added', snapShot => {
            const UserData = snapShot.val();


            arr1.push(snapShot.val())

            // console.log(UserData, 'iskynadar he')
            // setTimeout(()=>{

            //     console.log(arr, 'will')
            var all = arr1
            this.setState({
                all,
            })
            // },5000)


        })
        firebase.database().ref('/UserData/').on('child_changed', snapShot => {
            const { all } = this.state
            var arr2 = []
    console.log(all,'ye update py state')
            const UserData = snapShot.val();
            console.log(UserData.UID,'apdates iu')
            all.map((i) => {
                console.log(i,'map')
                if (UserData.UID === i.UID) {
                }else{
                    arr2.push(i)

                }

            })

            arr2.push(snapShot.val())

            console.log(arr2, 'iskynadar he')
            setTimeout(() => {

                // console.log(arr, 'will')
                const all = arr2
                this.setState({
                    all,
                })
            }, 100)

        })
    }


    componentWillReceiveProps(props) {
        const { data } = props
        if (data) {
            console.log(data, 'will')
            const Allusers = data
            this.setState({
                Allusers,
            })
        }
    }
    _handleErrorInputChange = (e) => {

        var email = e.target.value;
        // console.log(name,"function")
        this.setState({
            email,
        });
    }
    _handlePassword = (e) => {

        var password = e.target.value;
        // console.log(name,"function")
        this.setState({
            password,
        });
    }

    submit() {
        const { email, password } = this.state
        if (!email) {

            swal("'*please Input Email'!", "You clicked the button!", "error");


        } else if (!password) {
            swal("'*please Enter Password'!", "You clicked the button!", "error");

        } else {
            this.props.login(email, password)

        }
    }




    block(uid) {
        console.log(uid, 'block')
        var obj = {
            status: 'Block'
        }
        firebase.database().ref('/UserData/' + uid).update(obj)

    }
    unblock(uid) {

        var obj = {
            status: 'unblock'
        }
        firebase.database().ref('/UserData/' + uid).update(obj)
    }






    render() {
        const { all } = this.state
        return (
            <div className='profile-pic'>
                <Paper >
                    <Table >
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Person</CustomTableCell>

                                <CustomTableCell>Name</CustomTableCell>
                                <CustomTableCell align="right">UID</CustomTableCell>
                                <CustomTableCell align="right">Number</CustomTableCell>
                                <CustomTableCell align="right">Service</CustomTableCell>
                                <CustomTableCell align="right">Experirnce</CustomTableCell>
                                <CustomTableCell align="right">Status</CustomTableCell>
                                <CustomTableCell align="right">Block/UnBlock</CustomTableCell>

                            </TableRow>
                        </TableHead>
                        {all &&
                            <TableBody>
                                {all.map(row => (
                                    <TableRow key={row.id}>
                                        <CustomTableCell align="right"> <Avatar alt="person" src={row.photo} /></CustomTableCell>

                                        <CustomTableCell align="right">{row.name}</CustomTableCell>
                                        <CustomTableCell component="th" scope="row" >
                                            {row.UID}
                                        </CustomTableCell>
                                        <CustomTableCell align="right">{row.number}</CustomTableCell>
                                        {
                                            row.category ?

                                                <CustomTableCell align="right">{row.category}</CustomTableCell>
                                                :
                                                <CustomTableCell align="right">Not yet</CustomTableCell>

                                        }
                                        {row.experience ?
                                            <CustomTableCell align="right">{row.experience}</CustomTableCell>
                                            :
                                            <CustomTableCell align="right">Null</CustomTableCell>

                                        }
                                        <CustomTableCell align="right">{row.status}</CustomTableCell>
                                        {
                                            row.status === 'Block' ?
                                                <CustomTableCell align="right">  <Button variant="contained" color="primary" onClick={() => this.unblock(row.UID)} >
                                                    Unblock
                    </Button></CustomTableCell>
                                                :
                                                <CustomTableCell align="right">
                                                    <Button variant="contained" color="secondary" onClick={() => this.block(row.UID)}>
                                                        Block
      </Button>
                                                </CustomTableCell>


                                        }

                                    </TableRow>
                                ))}
                            </TableBody>}
                    </Table>
                </Paper>


            </div>

        )
    }
}

// const styles = theme => ({
//     margin: {
//         margin: theme.spacing.unit * 2,
//     },
//     padding: {
//         padding: theme.spacing.unit
//     }
// });
const styless = {
    root: {
        flexGrow: 1,
    },
    form: {
        alignItems: 'center',
        borderWidth: 2
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};
function mapStateToProp(state) {
    return ({
        UID: state.rootReducer.UID,
        data: state.rootReducer.ALLUSER
    })
}
function mapDispatchToProp(dispatch) {
    return ({

        login: (email, password) => {
            dispatch(Login(email, password))
        },
        user: (currentUser) => {
            dispatch(current_User(currentUser))
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Alluser);

