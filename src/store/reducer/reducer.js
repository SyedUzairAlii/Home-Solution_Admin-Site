
import actionTyes from'../constant/constant'
const INITIAL_STATE={
    UID:null,
    ALLUSER:null,
}

export default (states = INITIAL_STATE, action  )=> {
    switch(action.type){
        case actionTyes.UID:
        return({
          ...states,
          UID: action.payLoad  
        })
        case actionTyes.ALLUSER:
        return({
          ...states,
          ALLUSER: action.payLoad  
        })

        default: 
        return states;
    }
}