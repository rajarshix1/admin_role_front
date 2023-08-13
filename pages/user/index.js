import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mode, setMode] = useState();
  const [allUsers, setAllUsers] = useState();
  const [userData, setUserData] = useState();
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    console.log(email, password);
    try {
      const response = await axios.get("/api/user/check");
      console.log(response);
      setUserData(response.data);
    } catch (error) {
      alert(error.response.data.message);
      router.push("/user/login");
    }
  };

  return (
    <div>
      {userData && (
        <>
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
          <div className="font-semibold">Welcome {userData.name}</div>
        </div>
    
  
      
        <div className="w-3/4 mx-auto mt-8">
          {userData && (
            <div className="bg-white">
              <div className="font-semibold mb-2">Roles:</div>
              <div>
                You have permission of{" "}
                {userData.roles.length > 0 &&
                  userData.roles.map((role, index) => (
                    <span key={index}>
                      {index === 0 ? "" : ", "}
                      {role}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
        </>
          )}
     
    </div>
  );
                  }
  