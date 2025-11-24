'use client'

import { useForm } from "react-hook-form"
import { DevTool } from '@hookform/devtools'
import { YouTubeDataType } from "@/types/types";


const YoutubeForm = () => {
  const { register, control, handleSubmit, formState } = useForm<YouTubeDataType>({
    defaultValues: async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const data = await response.json();
        return {
            username: data.username,
            email: data.email,
            channel: "",
            social: {
                twitter: "",
                instagram: ""
            },
            phoneNumbers: ["", ""]
        }
    }
  });  // register tracks the form state (like useState), handleSubmit handles submission of the form
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
          
          <label htmlFor="twitter" className='font-bold flex mb-4'>Twitter</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("social.twitter")} placeholder='Twitter' id='twitter' name='twitter' />

          <label htmlFor="instagram" className='font-bold flex mb-4'>Instagram</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("social.instagram")} placeholder='Instagram' id='instagram' name='instagram' /> 
          
          <label htmlFor="primary-phone" className='font-bold flex mb-4'>Phone Numbers</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("phoneNumbers.0")} placeholder='Phone Numbers' id='primary-phone' name='primary-phone' /> 

          <label htmlFor="secondary-phone" className='font-bold flex mb-4'>Phone Numbers</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("phoneNumbers.1")} placeholder='Phone Numbers' id='secondary-phone' name='secondary-phone' /> 
        
          <button className='px-4 py-2 outline-0 bg-gray-700 rounded-sm cursor-pointer'>Submit</button>

        </form>
        <DevTool control={control}/>
      </div>
    </>
  )
}

export default YoutubeForm