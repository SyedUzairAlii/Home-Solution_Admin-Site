import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login } from '../../store/action/action'
import ButtonAppBar from '../../components/container'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
// import './Dashboaard.css';
import swal from 'sweetalert';
import History from '../../history';
import firebase from '../../confic/firebase'
import { current_User } from '../../store/action/action'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// import SimpleTabs from './simple'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        }
    }
    componentDidMount(props) {
        //         firebase.database().ref('/Statics/').on('child_added', snapShot => {
        //             const UserData = snapShot.val();

        //             if (UserData) {
        // console.log(snapShot.val(),"io")
        //             // this.setState({
        //             //     statis:UserData
        //             // })
        //             }

        // })

           this.submit()
    }

    componentWillReceiveProps(props) {

    }


    submit = () => {
        var user = 0
        var messages = 0
        var request = 0
        firebase.database().ref('/UserData/').on('child_added', snapShot => {
            const UserData = snapShot.val();

            if (UserData) {

                user++;
            }

        })
        firebase.database().ref('/Messages/').on('child_added', snapShot => {
            const UserData = snapShot.val();

            if (UserData) {

                messages++;
            }

        })
        firebase.database().ref('/Request/').on('child_added', snapShot => {
            const UserData = snapShot.val();

            if (UserData) {
                // console.log(UserData.WorkingDay,'request')
                request++;
            }

        })
        var accept = 0
        var reject = 0
        var pending = 0
        firebase.database().ref('/Request/').on('value', (snapshot) => {
            // console.log(snapshot.val())
            for (var key in snapshot.val()) {
                var key12 = key;
                firebase.database().ref('/Request/' + '/' + key12).on('value', (snapshot) => {
                    for (var key11 in snapshot.val()) {
                        // var key13 = key12;
                        var value = snapshot.val()[key11]
                        console.log(value, 'll')
                        if (value.status === 'Accept') {
                            accept++
                        } else if (value.status === 'pending') {
                            pending++
                        } else {
                            reject++
                        }
                    }
                })
                // are.push(key12)
            }
        })
        // setTimeout(()=>{
        //    const obj={
        //      users : user,
        //      messages : messages,
        //      request : request ,
        //      accept : accept,
        //      reject :  reject, 
        //       pending :  pending,
        //       date: Date.now(),
        //    }
        //     firebase.database().ref('/Statics/' ).push(obj).then(() => {

        //         console.log(obj,'userss')
        //     })
        // },10000)
        setTimeout(() => {
            const obj = {
                users: user,
                messages: messages,
                request: request,
                accept: accept,
                reject: reject,
                pending: pending,
                date: Date.now(),
            }
            this.setState({
                dataa: obj
            })
        }, 1000)
    }


    render() {
        const { userName, value, dataa } = this.state
        const { classes } = this.props;
        console.log(dataa, 'll')
        // if(dataa){

        //     const data = [{ name: 'Users', uv: dataa.users, pv: 2400, amt: 2400 }, { name: 'request', uv: dataa.request, pv: 2400, amt: 2400 }, { name: 'job done', uv: dataa.accept, pv: 2400, amt: 2400 }, { name: 'Pending', uv: dataa.pending, pv: 2400, amt: 2400 }, { name: 'reject', uv: dataa.reject, pv: 2400, amt: 2400 }, { name: 'Chats', uv: dataa.messages, pv: 2400, amt: 2400 }];
        // }
        return (
            <div className='profile-pic'>
                {dataa && 
                    <div className='profile-pic2'>
                    
                        <BarChart width={800} height={500} data={[{ name: 'Users', uv: dataa.users, pv: 2400, amt: 2400 }, { name: 'request', uv: dataa.request, pv: 2400, amt: 2400 }, { name: 'job done', uv: dataa.accept, pv: 2400, amt: 2400 }, { name: 'Pending', uv: dataa.pending, pv: 2400, amt: 2400 }, { name: 'reject', uv: dataa.reject, pv: 2400, amt: 2400 }, { name: 'Chats', uv: dataa.messages, pv: 2400, amt: 2400 }]}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Bar type="monotone" dataKey="uv" fill="#8884d8" barSize={30} />
                        </BarChart> 
                    </div>
                }
            </div>

        )

    }
}

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});
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
        allUser: state.rootReducer.ALLUSER
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

export default connect(mapStateToProp, mapDispatchToProp)(Graph);

