import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";
import { updateUserFailer, updateUserStart, updateUserSuccess,
deleteAccountStart,deleteAccountSuccess,deleteAccountFailer } from "../redux/user/userSlice.js";



export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setUploadFileError] = useState(false);
  useEffect(() => {
    if (file) {
      handelFileUpload(file);
    }
  }, [file]);

  const handelFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      () => {
        setUploadFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, photoURL: downloadUrl });
        });
      }
    );
  };

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handelSubmit =async (e) => {

    e.preventDefault();
    dispatch(updateUserStart());
    
    try{
      const res= await fetch(`/api/user/updateUser/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const {data} = await res.json()
      dispatch(updateUserSuccess(data));

    }catch(error){
      dispatch(updateUserFailer(error.message))
    }
  };

  const deleteAccount = async()=>{
    dispatch(deleteAccountStart());
    try{
      const res= await fetch(`/api/user/deleteUser/${currentUser._id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(currentUser.id)
      });
      const {status} = await res.json()
      if(status === 'success'){
        dispatch(deleteAccountSuccess(null));

      }

    }catch(error){
      dispatch(deleteAccountFailer(error.message));
    }
    
  }
  return (
    <main className="p-3 max-w-xl mx-auto">
      <h1 className="font-semibold text-3xl text-center p-3">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
        <img
          className=" rounded-full w-24 h-24 object-cover self-center mx-auto p-5 cursor-pointer"
          src={formData.photoURL || currentUser.photoURL}
          alt="profile"
          onClick={() => fileInputRef.current.click()}
        />
        <input
          accept="image/*"
          type="file"
          id="profileImage"
          hidden
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-700">wrong upload</span>
          ) : 
            uploadProgress > 0 && uploadProgress < 100
          
          ?
          (<span className="text-slate-400">{`Uploading ${uploadProgress}`}</span>)
          : uploadProgress === 100?(
          <span className="text-green-500">Image upload succssfuly</span>)
          :('')}</p>
        <input
          className="rounded-lg p-3"
          defaultValue={currentUser.username}
          onChange={handleUserData}
          type="text"
          name="username"
          id="username"
          placeholder="name"
        />

        <input
          className="rounded-lg p-3"
          defaultValue={currentUser.email}
          onChange={handleUserData}
          type="text"
          name="email"
          id="email"
          placeholder="email"
        />

        <input
          className="rounded-lg p-3"
          onChange={handleUserData}
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />

        <button
          type="submit"
          className="uppercase bg-green-700 text-white rounded-lg p-3 font-semibold hover:opacity-95"
        >
          update
        </button>
      </form>
      <div className="flex justify-between py-4">
        <span className="text-red-700 font-semibold cursor-pointer"
        onClick={deleteAccount}>Delete Account</span>
        <span className="text-red-700 font-semibold cursor-pointer">Sign out</span>
      </div>
    </main>
  );
}
