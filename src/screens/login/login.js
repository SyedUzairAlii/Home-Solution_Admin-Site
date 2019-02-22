import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Login} from '../../store/action/action'
import ButtonAppBar from '../../components/container'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import './login.css';
import swal from 'sweetalert';
import History from '../../history';
import firebase from '../../confic/firebase'
import { current_User } from '../../store/action/action'

class Loginn extends Component {
    constructor(props){
        super(props);
        this.state ={
            userName:'',
        }
    }
    componentDidMount(props){
        
        firebase.auth().onAuthStateChanged((user) => {
            // console.log("user milla hy1 ",user)

            if (user != null) {
                // console.log("user milla hy2",user)
                const currentUser = user
                this.props.user(currentUser)
               


            }
        })
    }
 
    componentWillReceiveProps(props){
        const { UID, allUser } = props;
        if (UID) {
            History.push('/Dashboard')
          
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
         <div className='form'>
         <Paper className={styless.form}>
                <div className={styless.form}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField  onChange={this._handleErrorInputChange} id="username" label="Admin-I.D" type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField  onChange={this._handlePassword}id="username" label="Password" type="password" fullWidth required  />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                />
                            } label="Remember me" />
                        </Grid>
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button onClick={()=>this.submit()} variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                    </Grid>
                </div>
            </Paper>
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

export default connect(mapStateToProp,mapDispatchToProp)(Loginn);

