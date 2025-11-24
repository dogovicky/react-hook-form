'use client'

import { useForm } from "react-hook-form"
import { DevTool } from '@hookform/devtools'
import { YouTubeDataType } from "@/types/YouTubeDataType";

let renderCount = 0;


const YoutubeForm = () => {
  const { register, control, handleSubmit } = useForm<YouTubeDataType>();  // register tracks the form state (like useState), handleSubmit handles submission of the form
  
  const onSubmit = (data: YouTubeDataType) => {
    console.log("Form Submitted", data);

  }
  
  return (
    <>
      <h1>YouTube Form </h1>
      <div className='container shadow-lg flex align-center justify-center items-center '>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username" className='font-bold flex mb-4'>Username</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' {...register("username")} placeholder='@username' id='username' name='username' /> <br />
          
          <label htmlFor="email" className='font-bold flex mb-4'>Email</label>
          <input type="email" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' {...register("email")} placeholder='youremail@email.com' id='email' name='email' /> <br />

          <label htmlFor="channel" className='font-bold flex mb-4'>Channel</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' {...register("channel")} placeholder='Channel' id='channel' name='channel' /> <br />

          <button className='px-4 py-2 outline-0 bg-gray-700 rounded-sm cursor-pointer'>Submit</button>

        </form>
        <DevTool control={control}/>
      </div>
    </>
  )
}

export default YoutubeForm