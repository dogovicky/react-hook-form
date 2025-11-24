'use client'

import { useForm } from "react-hook-form"
import { DevTool } from '@hookform/devtools'
import { YouTubeDataType } from "@/types/YouTubeDataType";


const YoutubeForm = () => {
  const { register, control, handleSubmit, formState } = useForm<YouTubeDataType>();  // register tracks the form state (like useState), handleSubmit handles submission of the form
  const { errors } = formState;
  
  const onSubmit = (data: YouTubeDataType) => {
    console.log("Form Submitted", data);

  }
  
  return (
    <>
      <h1>YouTube Form </h1>
      <div className='container shadow-lg flex align-center justify-center items-center '>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="username" className='font-bold flex mb-4'>Username</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border'
            {...register("username", { required: { value: true, message: "Please enter a username"}})} 
            placeholder='@username' id='username' name='username' /> 
          <p className="text-red-500 font-semibold text-[0.85em]">{errors.username?.message}</p>
          <br />

          
          <label htmlFor="email" className='font-bold flex mb-4'>Email</label>
          <input type="email" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("email", 
                { pattern: 
                    { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/, message: "Please enter a valid email address"},
                  validate: {
                      notAdmin: (fieldValue) => {
                        return ( fieldValue !== "admin@example.com" || "Enter a different email address" )
                      },
                      notBlackListed: (fieldValue) => {
                        return !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                      }
                  }
                })} 
            placeholder='youremail@email.com' id='email' name='email' /> 
          <p className="text-red-500 font-semibold text-[0.85em]">{errors.email?.message}</p>
          <br />

          <label htmlFor="channel" className='font-bold flex mb-4'>Channel</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("channel", { required: "Channel is required"})} placeholder='Channel' id='channel' name='channel' /> 
          <p className="text-red-500 font-semibold text-[0.85em]">{errors.channel?.message}</p>
          <br />

          <button className='px-4 py-2 outline-0 bg-gray-700 rounded-sm cursor-pointer'>Submit</button>

        </form>
        <DevTool control={control}/>
      </div>
    </>
  )
}

export default YoutubeForm