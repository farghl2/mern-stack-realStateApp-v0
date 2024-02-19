import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link ,useNavigate} from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const [error ,setError]= useState(null)
  // const [loading, setLoading]= useState(false)

  const handleChange =(e)=>{
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]:value,
    })

  }

  const handleSubmit =async (e)=>{
    e.preventDefault();
    const res= await fetch('api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    });
    const data =await res.json()
    if(data.status === 'success'){
      navigate('/home')

    }
    setError(data.data.message)
  }
  return (
    <>
    <form 
    onSubmit={handleSubmit}
    className="mx-auto flex flex-col items-center p-0 py-8 sm:p-16 gap-5">
      <h3 className="text-slate-500 text-xl  font-semibold">Sign Up</h3>

      <TextField
        label="User Name"
        type="text"
        className=" sm:w-[50%] bg-white"
        required
        name="username"
        id="username"
        value={formData.username}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        type="email"
        className=" sm:w-[50%] bg-white"
        required
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />

      <TextField
        label="Password"
        type="password"
        className="sm:w-[50%] bg-white"
        required
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        className="!bg-slate-500 w-[50%] !py-2 uppercase"
        type="submit"
      >
        Sign Up
      </Button>
    </form>
    <div className="flex gap-1 justify-center">
      <p>Have an account? </p> <Link to='/sign-in' className="text-blue-600 font-semibold" >Sign in</Link>
    </div>
  
      {error && <p>{error}</p>} 
    </>
  );
}
