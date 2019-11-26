import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Contacts = () => {
    const [contacts, setContacts ] = useState([])
    
    //function that fetches contacts
    const fetchContacts = async() => { 
        try {
            const res = await axios.get('/api/users');
            setContacts(res.data)
        }
        catch(err){
            console.log(err);
        }
    } 


    useEffect(() => {
        fetchContacts();
    }, [])

     return (
         <>
         <h2>Users</h2>
         {contacts.map(c => {
             return <div>
                 <h3>{c.name}</h3>
                 <p>{c.email}</p>
                 <p>{c.createdAt}</p>
             </div>
         })}
         </>
     )
 
};

export default Contacts;