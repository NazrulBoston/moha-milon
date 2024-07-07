import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { sendEmailVerification } from "firebase/auth";


const Register = () => {

    const { createUser } = useContext(AuthContext);
    const [errorRegister, setErrorRegister] = useState('');
    const [successRegister, setSuccessRegister] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const accepted = event.target.terms.checked;
        const password = event.target.password.value;
        console.log(name, email, password, accepted)

        //reset 
        setErrorRegister('');

        if (password.length < 6) {
            setErrorRegister('Password should be 6 characters or more')
            return;
        }
        else if(!accepted){
            setErrorRegister('Please accept terms and conditions!')
            return;
        }


        //create user in firebase
        createUser(email, password)
            .then(result => {
                console.log(result.user)
                setSuccessRegister('User created successfully!')

                // send verification email
                sendEmailVerification(result.user)
                .then(()=> {
                    alert('Please check your email and verify your email account!')
                })
            })
            .catch(error => {
                console.log(error)
                setErrorRegister('Already has an account, please try different email!');
            })

    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="your name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input

                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered w-full"
                                    required />
                                <span className="absolute top-1/3 right-2 " onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                        </div>
                        <br />
                        <div className="flex gap-2">
                            <input type="checkbox" name="terms" id="terms" />
                            <label htmlFor="terms">Accepted our <a href="">terms and conditions</a></label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="submit" />
                        </div>
                        <p>Already have an account? <Link to='/login'>Sign In</Link></p>
                    </form>

                </div>
                {
                    errorRegister && <p className="text-red-700">{errorRegister}</p>
                }
                {
                    successRegister && <p className="text-green-700">{successRegister}</p>
                }
            </div>

        </div>



    );
};

export default Register;