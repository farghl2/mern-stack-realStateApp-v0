import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link , useNavigate} from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({
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
    const res= await fetch('/api/auth/signin',{
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
    setError(data.data.title)
  }
  return (
    <>
    <form 
    onSubmit={handleSubmit}
    className="mx-auto flex flex-col items-center p-0 py-8 sm:p-16 gap-5">
      <h3 className="text-slate-500 text-xl  font-semibold">Sign In</h3>

      
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
        Sign In
      </Button>
    </form>
    <div className="flex gap-1 justify-center">
      <p>Do not have an account? </p> <Link to='/sign-up' className="text-blue-600 font-semibold ">Sign up</Link>
    </div>
  
      {error && <p>{error}</p>} 
    </>
  );
}
