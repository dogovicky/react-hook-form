'use client'

import { useForm, useFieldArray } from "react-hook-form"
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
            phoneNumbers: ["", ""],
            numbers: [ { number: "" } ],
            age: 0,
            dateOfBirth: new Date()
        }
    }
  });  // register tracks the form state (like useState), handleSubmit handles submission of the form
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "numbers",
    control
  })
  
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
          
          {/* Nested objects */}
          <label htmlFor="twitter" className='font-bold flex mb-4'>Twitter</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("social.twitter")} placeholder='Twitter' id='twitter' name='twitter' />

          <label htmlFor="instagram" className='font-bold flex mb-4'>Instagram</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("social.instagram")} placeholder='Instagram' id='instagram' name='instagram' /> 

          {/* Numeric and Date values */}
          <label htmlFor="age" className='font-bold flex mb-4'>Age</label>
          <input type="number" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("age", { valueAsNumber: true })} placeholder='Age' id='age' name='age' /> 

          {/* Date value */}
          <label htmlFor="dateOfBirth" className='font-bold flex mb-4'>Date Of Birth</label>
          <input type="date" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("dateOfBirth", { valueAsDate: true })} placeholder='Date Of Birth' id='dateOfBirth' name='dateOfBirth' /> 

        
          {/* Array fields */}
          
          {/* <label htmlFor="primary-phone" className='font-bold flex mb-4'>Phone Numbers</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("phoneNumbers.0")} placeholder='Phone Numbers' id='primary-phone' name='primary-phone' /> 

          <label htmlFor="secondary-phone" className='font-bold flex mb-4'>Phone Numbers</label>
          <input type="text" className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border' 
            {...register("phoneNumbers.1")} placeholder='Phone Numbers' id='secondary-phone' name='secondary-phone' />  */}

          {/* Adding new fields (Dynamic Fields) */}
          <div>
            <label htmlFor="numbers">List of Phone Numbers</label>
            <div>
                {fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <input type="text" {...register(`numbers.${index}.number` as const)} className='block w-2xl px-1 py-2 text-lg text-white rounded-sm mb-5 border'  />
                      {
                        index > 0 && (
                            <button type="button" onClick={() => remove(index)}>Remove Field</button>
                        )
                      }
                    </div>
                  )
                })}
                <button type="button" onClick={() => append({ number: "" })}>Add Phone Number</button>
            </div>
          </div>
        
          <button className='px-4 py-2 outline-0 bg-gray-700 rounded-sm cursor-pointer'>Submit</button>

        </form>
        <DevTool control={control}/>
      </div>
    </>
  )
}

export default YoutubeForm