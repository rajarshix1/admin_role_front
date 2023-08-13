import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router'

export default function Register() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const router = useRouter()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(email, password)
   try {
    const response = await axios.post('/api/admin/super', {name:name, email: email, password:password})
    router.push('/super/login') 
  } catch (error) {
     console.log(response.data.message) 
   }
  }
  return (
   <div>
    <form onSubmit={handleSubmit} className="w-1/4 mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 text-lg font-semibold">
          Name:
        </label>
        <input
          type="text"
          id="name"
          onChange={e=>setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-lg font-semibold">
          Email:
        </label>
        <input
          type="text"
          id="email"
          onChange={e=>setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2 text-lg font-semibold">
          Password:
        </label>
        <input
          type="password"
          id="password"
          onChange={e=>setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="block w-full px-4 py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit
      </button>
    </form>
   </div>
  )
}
