import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Login} from '../../store/action/action'
import ButtonAppBar from '../../components/container'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import './Dashboaard.css';
import swal from 'sweetalert';
import History from '../../history';
import firebase from '../../confic/firebase'
import { current_User } from '../../store/action/action'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SimpleTabs from './simple'
class Dashboaard extends Component {
    constructor(props){
        super(props);
        this.state ={
            userName:'',
        }
    }
    componentDidMount(props){
        
       
    }
 
    componentWillReceiveProps(props){
        
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
   
      submit(){
          const{email,password}=this.state
          if(!email){
            
            swal("'*please Input Email'!", "You clicked the button!", "error");
                
            
          }else if(!password){
            swal("'*please Enter Password'!", "You clicked the button!", "error");

          }else{
              this.props.login(email,password)
              
          }
      }


     
      
      
      
      
      
      
      
       
    render() {
        const {userName,value} = this.state
        const { classes } = this.props;
        return (
            <div className='profile-pic'> 
                <ButtonAppBar name={'Meeting App'} >
         </ButtonAppBar>
        <div className='profile-pic2'>

      <SimpleTabs/>
        </div>
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

export default connect(mapStateToProp,mapDispatchToProp)(Dashboaard);

