import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookie from 'universal-cookie'
import DeployLink from '../Utility/DeployLink';

const Profile =( {details} )=>{

    const cookies = new Cookie();

    // console.log("IN THE PROFILE SECTION STATE ");
    // console.log(details);
    // console.log(firstName)
    // empty array to store response

    const [arr,setArr] = useState([]);
   
    const getList = async () =>{
        await axios.get(DeployLink('/details/studentlist'),
        { sessionID: cookies.get("sessionID")})
        .then( response =>{
    
            setArr(response.data.result)
            console.log("Printing arr here");
            console.log((arr));
            return;
          
        }).catch(err =>{
    
          console.log("unable to send checkSession cause of error: " + err);
          return ;
        })
    }


    useEffect( ()=>{


        if(arr.length == 0)
        {
            getList();
        }
        
    })

    const print = () =>{
        
        console.log("dommot");

        arr.map( (val) =>{
            return <div> {val} </div>
        } )
    }

    let message = "Hi there welcome to the website " + details.firstName ;    
    return(
        <>
            <div> 
                {message}
            </div>

            <div> Printing the list of students </div>
                
            <div>
            {
                console.log("SIZE " + arr.length)}

            {
                arr.map((user,i) =>{
                    return (
                        <div>  {arr[i].firstname}</div>
                    )
                })
            }   
            
            
            </div>
            
    
        </>
    )

}

export default Profile