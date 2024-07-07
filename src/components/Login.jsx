import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.config";




const Login = () => {

  const { signInUser, signInGoogle } = useContext(AuthContext);
  const[success, setSuccess] = useState('')
  const emailRef = useRef(null)
  const navigate = useNavigate();


  const handleLogin = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password)

    signInUser(email, password)
      .then(result => {
        console.log(result.user);
        event.target.reset();
        navigate('/');
        if(result.user.emailVerified){
          setSuccess('Successfully login')
        }
        else {
          alert('Please verify your email account')
        }
      })


      .catch(error => {
        console.log(error)
      })

  }

  const handleReset = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log(emailRef.current.value, 'Please send an email')
      return;
    }
    else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      console.log("Please write a valid email")
      alert("Please write a valid email")
      return;
    }
    //send validation email
    sendPasswordResetEmail(auth, email)
      .then(() => {
          alert('Please check your email')
      })
      .then(error => {
        console.log(error)
      })


  }


  const handleGoogleSignIn = () => {
    signInGoogle()
    .then(result => {
      console.log(result)
    })
    .then(error => {
      console.log(error)
    })
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>

        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a onClick={handleReset} href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="submit" />
            </div>
            <p>New here? <Link to='/register'>Register please</Link></p>
            <input onClick={handleGoogleSignIn} className="btn btn-primary btn-block" type="submit" value="GOOGLE" />
          </form>
        </div>
        {
          success && <p className="text-green-700">{success}</p>
        }
      </div>
    </div>
  );
};

export default Login;