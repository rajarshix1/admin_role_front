import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function Register() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState()
  const [create, setCreate] = useState(false)
  const router = useRouter()
  const [userData, setUserData]= useState()

  useEffect(() => {
    checkUser()
  }, [])
  
  const checkUser = async () => {
    console.log(email, password);
    try {
      const response = await axios.get("/api/admin/check",);
      console.log(response);
      setUserData(response.data)
    } catch (error) {
      alert(error.response.data.message)
      router.push('/admin/login')
    }
  };
  const handleSubmit = async(e)=>{
    console.log('ROLE', role);
    e.preventDefault()
    console.log(email, password)
    try {
        const response = await axios.post('/api/admin/create_admin', {name:name, email: email, password:password, role:role})
        console.log(response.data);
        alert('Created successfully')
    } catch (error) {
        console.log(error);
        alert(error.response.data)
    }
  }
  return (
   <div>
     {userData && (
  <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
    <div className="font-semibold">Welcome {userData.name}</div>
    <div className={`px-2 py-1 rounded-md ${userData.role === 'admin' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
      {userData.role}
    </div>
  </div>
)}
     <div className="space-x-2">
   <button
    onClick={() => setCreate(!create)}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
   ADMIN RELATED
  </button>
  <button
    onClick={() => router.push('/admin')}
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    USER RELATED
  </button>
  
</div>
   {create &&  <form onSubmit={handleSubmit} className="w-1/4 mx-auto mt-8">
      <div className="mb-4">
      <h1>Create new admin</h1>
        </div>
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
      <div className="mb-4">
  <label htmlFor="role" className="block mb-2 text-lg font-semibold">
    Role:
  </label>
  <select
    id="role"
    onChange={e => setRole(e.target.value)}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
  >
    <option value="">Select a role</option>
    <option value="admin">admin</option>
    <option value="moderator">moderator</option>
    <option value="super">super</option>
  </select>
</div>
      <button
        type="submit"
        className="block w-full px-4 py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Create
      </button>
    </form>}
   </div>
  )
}
