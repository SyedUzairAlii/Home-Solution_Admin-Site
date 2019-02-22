import actionTypes from '../constant/constant'
import swal from 'sweetalert';
import firebase from '../../confic/firebase'
export function Login(email, password) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email, password)

            .then((success) => {

                swal("Good job!", "You clicked the button!", "success");

                dispatch({ type: actionTypes.UID, payLoad: success.user.uid })
            })
            .catch((error) => {
                console.error('something went wrong', error);

            })

    }
}


// current User
export function current_User(currentUser) {
    return dispatch => {
        const UID = currentUser.uid
        var arr = [];
        dispatch({ type: actionTypes.UID, payLoad:currentUser.uid})
        firebase.database().ref('/UserData/').on('child_added', snapShot => {
            const UserData = snapShot.val();
            
                arr.push(snapShot.val())
                
                dispatch({ type: actionTypes.ALLUSER, payLoad:arr})
            
        })
    }
}