import * as TYPES from './action-types'
import axios from 'axios'

export function logout(){
  return (dispatch)=>{
    
    axios.post("/logout").then(resp=>{
      if(resp.status === 200){
        dispatch({
          type:TYPES.LOGOUT
        })
      }else{
        console.log("logout failed", resp);
      }
    }).catch(err=>{
      console.log("logout failed", err);
    })
    
  }
}