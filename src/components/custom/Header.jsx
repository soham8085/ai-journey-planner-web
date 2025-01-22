import React, { useEffect, useState } from 'react'
import { Button } from "../ui/button.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';


function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [])

  const login = useGoogleLogin({
    onSuccess: async (tokenInfo) => {
        console.log("Google Login Success:", tokenInfo);
        await GetUserProfile(tokenInfo);
    },
    onError: (error) => {
        console.error("Google Login Error:", error);
    },
    scope: "profile email",
});

const GetUserProfile = async (tokenInfo) => {
  try {
      const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
          {
              headers: {
                  Authorization: `Bearer ${tokenInfo.access_token}`,
                  Accept: 'application/json',
              },
          }
      );
      console.log("User Profile:", response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      window.location.reload();
  } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.");
  }
};

  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5 w-full'>
      <img src="/logo.svg" alt="Logo" />
      <div>
        {user ?
          <div className='flex item-centre gap-4'>
            <Popover >
              <PopoverTrigger>
                <img src="/placeholder.jpg" className='h-[50px] w-[50px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent className='bg-white text-black rounded-xl'>
                <h2 className='cursor-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>

          </div>
          :
          <Button className="bg-black text-white" onClick={()=>setOpenDialog(true)}>Sign In</Button>
        }
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-white text-black">
                    <DialogHeader>
                        <button
                            className="absolute top-2 right-2 text-xl"
                            onClick={() => setOpenDialog(false)}
                        >
                            ✕
                        </button>
                        <DialogDescription>
                            <img src="/logo.svg" alt="Logo" />
                            <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
                            <p>Sign in to the App with Google Authentication securely</p>

                            <Button
                                onClick={login}
                                className="w-full mt-5 bg-black text-white flex gap-4 items-center">
                                <FcGoogle />
                                Sign In With Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
    </div>
  )
}

export default Header;
