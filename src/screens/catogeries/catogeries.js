import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Login} from '../../store/action/action'
import ButtonAppBar from '../../components/container'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import './catogeries.css';
import swal from 'sweetalert';
import History from '../../history';
import firebase from '../../confic/firebase'
import { current_User } from '../../store/action/action'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import SimpleTabs from './simple'

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
  
  const rows = [
    createData('', 159),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
class catagories extends Component {
    constructor(props){
        super(props);
        this.state ={
            userName:'',
        }
    }
    componentDidMount(){
      // var obj ={ser : 'plumber'}
      // firebase.database().ref('/catagories/' ).push(obj).then(() => {

      //           console.log(obj,'userss')
      //       })
var arr =[]
var num = 1
        firebase.database().ref('/catagories/' ).on('child_added', snapShot => {
            const UserData = snapShot.val();

            if (UserData) {
              console.log(snapShot.val(),'l')

              
                var obj={
                  work:UserData.ser,
                  number: num++
                }
                arr.push(obj)
              
            }
                    this.setState({
                        services:arr
                    })

        })
    
    }
 
    componentWillReceiveProps(props){
        
    }
   
   
      submit = () => {
        const { v} = this.state
        if(v){

          var obj ={ser : v}
          firebase.database().ref('/catagories/' ).push(obj).then(() => {
            this.setState({
              v:''
            });
                    console.log(obj,'userss')
                })
        }
      
      }

     
      
      
      
      _handleErrorInputChange = (e) => {
        
        var service = e.target.value;
        // console.log(service)
        this.setState({
          v:service,
        });
      }
      
      
      
       
    render() {
        const {userName,value,services} = this.state
        const { classes } = this.props;
        return (
            <div className='profile-pic'> 
            <div> 
            <TextField  onChange={this._handleErrorInputChange} id="username" label="Add a service" type="text" fullWidth autoFocus required default/>
            <Button variant="contained" color="secondary" onClick={()=> this.submit()}>
      Add
    </Button>
            </div>{
              services &&
            
            <div>
                 <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <CustomTableCell>s-no</CustomTableCell>
            <CustomTableCell align="right">Catagories</CustomTableCell>
            {/* <CustomTableCell align="right">Fat (g)</CustomTableCell>
            <CustomTableCell align="right">Carbs (g)</CustomTableCell>
            <CustomTableCell align="right">Protein (g)</CustomTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map(row => (
            <TableRow  key={row.id}>
              <CustomTableCell align="right">{row.number}</CustomTableCell>
              <CustomTableCell component="th" scope="row" >
                {row. work}
              </CustomTableCell>
              {/* <CustomTableCell align="right">{row.fat}</CustomTableCell>
              <CustomTableCell align="right">{row.carbs}</CustomTableCell>
              <CustomTableCell align="right">{row.protein}</CustomTableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </div>
            }
        </div>
            
        )
    }
}

const styless = {
    root: {
      flexGrow: 1,
    },
    form: {
      alignItems:'center',
      borderWidth:2
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };
function mapStateToProp(state){
    return({
        UID: state.rootReducer.UID,
        allUser: state.rootReducer.ALLUSER
    })
}
function mapDispatchToProp(dispatch){
    return({
        
        login: (email,password)=>{
        dispatch(Login(email,password))
        },
        user: (currentUser) => {
            dispatch(current_User(currentUser))
        },
    })
}

export default connect(mapStateToProp,mapDispatchToProp)(catagories);

