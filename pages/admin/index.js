import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mode, setMode] = useState();
  const [allUsers, setAllUsers]= useState()
  const [userData, setUserData]= useState()
  const [selectedRoles, setSelectedRoles] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setSelectedRoles([])
  }, [mode])
  useEffect(() => {
    checkUser()
  }, [])
  
  const getAllUsers = async () => {
    console.log(email, password);
    try {
      const response = await axios.get("/api/admin/all_users",);
      console.log(response);
      setAllUsers(response.data)
      // setSelectedRoles([])
      // alert('Created Successfully')
    } catch (error) {
      alert(error.response.data.message)
      router.push('/admin/login')
    }
  };
  const checkUser = async () => {
    console.log(email, password);
    try {
      const response = await axios.get("/api/admin/check",);
      console.log(response);
      setUserData(response.data)
      // setSelectedRoles([])
      // alert('Created Successfully')
    } catch (error) {
      alert(error.response.data.message)
      router.push('/admin/login')
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post("/api/admin/create_user", {
        name: name,
        email: email,
        password: password,
        roles: selectedRoles
      });
      console.log(response);
      setSelectedRoles([])
      alert('Created Successfully')
    } catch (error) {
      alert(error.response.data)
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const response = await axios.put("/api/admin/edit_user", {
        email: email,
        roles: selectedRoles
      });
      console.log(response);
      setSelectedRoles([])
      alert('Updated Successfully')
    } catch (error) {
      alert(error.response.data.message)
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const response = await axios.delete("/api/admin/delete_user", {
        params: {
          email: email,
        },
      });
      console.log(response);
      alert('Deleted Successfully')
    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
    }
  };
  const handleRoleChange = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(prevRoles => prevRoles.filter(r => r !== role));
      console.log(selectedRoles)

    } else {
      setSelectedRoles(prevRoles => [...prevRoles, role]);
      console.log(selectedRoles)

    }
  };
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
    onClick={() => {
      getAllUsers()
      setMode('allUsers')}}
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    All Users
  </button>
  {userData && userData.role!='moderator' && <button
    onClick={() => setMode('create')}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Create
  </button>}
  <button
    onClick={() => setMode('edit')}
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Edit
  </button>
  {userData && userData.role!='moderator' &&<button
    onClick={() => setMode('delete')}
    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Delete
  </button>}
</div>
      {mode=='create' && <form onSubmit={handleSubmit} className="w-1/4 mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-lg font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-semibold"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold">Role:</label>
        <div>
          <label htmlFor="create" className="inline-flex items-center">
            <input
              type="checkbox"
              id="create"
              value="create"
              checked={selectedRoles.includes('create')}
              onChange={() => handleRoleChange('create')}
              className="mr-1"
            />
            create
          </label>
          <label htmlFor="read" className="inline-flex items-center">
            <input
              type="checkbox"
              id="read"
              value="read"
              checked={selectedRoles.includes('read')}
              onChange={() => handleRoleChange('read')}
              className="mr-1"
            />
            read
          </label>
          <label htmlFor="update" className="inline-flex items-center">
            <input
              type="checkbox"
              id="update"
              value="update"
              checked={selectedRoles.includes('update')}
              onChange={() => handleRoleChange('update')}
              className="mr-1"
            />
            update
          </label>
          <label htmlFor="delete" className="inline-flex items-center">
            <input
              type="checkbox"
              id="delete"
              value="delete"
              checked={selectedRoles.includes('delete')}
              onChange={() => handleRoleChange('delete')}
              className="mr-1"
            />
            delete
          </label>
          </div>
        </div>

        <button
          type="submit"
          className="block w-full px-4 py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Create
        </button>
      </form>}
      {mode=='edit' && <form onSubmit={handleEdit} className="w-1/4 mx-auto mt-8">
      
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-lg font-semibold">
            Email:
          </label>
          <input
            type="text"
            id="email"
            // name="email"
            // value={formData.email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold">Role:</label>
        <div>
          <label htmlFor="create" className="inline-flex items-center">
            <input
              type="checkbox"
              id="create"
              value="create"
              checked={selectedRoles.includes('create')}
              onChange={() => handleRoleChange('create')}
              className="mr-1"
            />
            create
          </label>
          <label htmlFor="read" className="inline-flex items-center">
            <input
              type="checkbox"
              id="read"
              value="read"
              checked={selectedRoles.includes('read')}
              onChange={() => handleRoleChange('read')}
              className="mr-1"
            />
            read
          </label>
          <label htmlFor="update" className="inline-flex items-center">
            <input
              type="checkbox"
              id="update"
              value="update"
              checked={selectedRoles.includes('update')}
              onChange={() => handleRoleChange('update')}
              className="mr-1"
            />
            update
          </label>
          <label htmlFor="delete" className="inline-flex items-center">
            <input
              type="checkbox"
              id="delete"
              value="delete"
              checked={selectedRoles.includes('delete')}
              onChange={() => handleRoleChange('delete')}
              className="mr-1"
            />
            delete
          </label>
          </div>
          </div>

        <button
          type="submit"
          className="block w-full px-4 py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Update
        </button>
      </form>}
      {mode=='delete' && <form onSubmit={handleDelete} className="w-1/4 mx-auto mt-8">
      
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-lg font-semibold">
            Email:
          </label>
          <input
            type="text"
            id="email"
            // name="email"
            // value={formData.email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="block w-full px-4 py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Delete
        </button>
      </form>}
      {mode === 'allUsers' && (
  <div className="w-3/4 mx-auto mt-8">
  <table className="min-w-full border rounded-lg overflow-hidden">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2 border">Name</th>
        <th className="px-4 py-2 border">Roles</th>
      </tr>
    </thead>
    <tbody className="bg-white">
      {allUsers &&
        allUsers.map((user) => (
          <tr key={user._id}>
            <td className="px-4 py-2 border text-center">{user.name}</td>
            <td className="px-4 py-2 border text-center">
              {user.roles.map((role, index) => (
                <div key={index} className="py-1">
                  {role}
                </div>
              ))}
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

)}

    </div>
  );
}
