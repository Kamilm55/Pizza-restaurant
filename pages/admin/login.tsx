import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e:any) => {
      e.preventDefault();
      const URL = process.env.NODE_ENV === 'production' ? "https://pizza-next-theta.vercel.app" : "http://localhost:3000";

      try {
        const response = await fetch(`${URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
           username:username,
          password:password
        }),
        });
        const data = await response.json();
        if(data === "Successfull")
        router.push("/admin");
        else
        alert(data);
        return data;
      } catch (e) {
    return { error: "An error occurred" };
      }
    }

    
  return (

    <div className="container  h100 d-flex  align-items-center">
      <Head>
        <title>Login | Admin</title>
      </Head>
        <div className="col-8 col-md-7 mx-auto col-lg-3 bg-r rounded p-2 px-5">
          <div className="box">
            <h1 className='text-center'>Login</h1>
            <form onSubmit={handleSubmit} >
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    autoComplete="off"
                    placeholder='Your username'
                    className={`input form-control my-1`}
                    type="text"
                    name="text"
                    onChange={(e)=>setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                  placeholder='Your password'
                    className={`input form-control my-1`}
                    type="password"
                    name="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password }
                    required
                  />
                </div>
              </div>

              <div className='my-2 d-flex justify-content-center'>
              <button
                type="submit"
                className="btn btn-primary "
                >
                Sign in
              </button>
                </div>
            </form>
            </div>
        </div>
        </div>
  )
}



export default Login