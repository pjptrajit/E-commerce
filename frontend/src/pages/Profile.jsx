import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { GlobalContext } from '../store/UserContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const { user} = useContext(GlobalContext);
  const navigate = useNavigate();
  


 
  // async function getData() {

  //   try {

  //     let res = await fetch("http://localhost:9000/api/user/v1/userProfile", {
  //       method: "GET",
  //       credentials: "include"
  //     });


  //     res = await res.json();
  //     setData(res.data);


  //   } catch (error) {
  //     console.log();

  //   }
  // }

  // useEffect(() => {
  //   getData();
  // }, []);
  // console.log(data)

  return (
    <div className='w-full m-auto'>Profile
      <div>
        {
          
          user ? (
            <div>
              <h1>ID: {user.id}</h1>
              <h1>Name: {user.name}</h1>
              <h1>Email: {user.email}</h1>
            </div>
          ):(
            <div>
              <button onClick={()=>navigate('/login')} className='px-4 py-2 bg-orange-500 font-bold'>Login</button>
            </div>
          )
        }
      </div>


    </div>
  )
}

export default Profile