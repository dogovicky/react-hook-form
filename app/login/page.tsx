'use client'

import { LoginData } from "@/types/types";
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
const Login = () => {
  const { register, handleSubmit, control } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    console.log("Login Successful", data);
  }
  return (
   <>
      <div className='container'>
        <div className="flex justify-center items-center">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className='font-semibold flex mb-4' htmlFor="email">Email</label>
              <input className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' placeholder='Email...' type="email" id="email" {...register("email")} />
            </div>

            <div className="form-control">
              <label className='font-semibold flex mb-4' htmlFor="password">Password</label>
              <input className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' placeholder='Password...' type="password" id="password" {...register("password")} />
            </div>

            <input type="submit" value="Submit" className='px-4 py-2 outline-0 bg-purple-600 rounded-sm cursor-pointer' />
          </form>
          <DevTool control={control} />
        </div>
      </div>
   </>
  )
}

export default Login