import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useState } from 'react';
import { Apple, Facebook, Github, Chrome, Twitter } from 'lucide-react';
import logo from '../assets/logo.webp';
import { makeRequest, showToast } from '../utils/util';


const LoginPage = ({ onLoginSuccess }) => {

  const validationSchema = Yup.object().shape(
    {
      username: Yup.string()
      .min(4, 'Username must be at least 4 characters ')
      .required('username is required'),
      password: Yup.string()
      .min(8, 'Password must be at least 8 characters ')
      .required('Password is required'),
      rememberMe: Yup.boolean()
    }
  );

  const formik = useFormik(
    {
      initialValues: {
        username: '',
        password: '',
        rememberMe: false
      },
      validationSchema: validationSchema,
      onSubmit: async (values, {setSubmitting, setFieldError}) =>{
        try{
          const details = { username: values.username, password: values.password}
          const response = await makeRequest("auth/login", details, "Post");
          const data = response;

          if (data && data.token) {
            showToast.success('login sucessful!');
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            onLoginSuccess(data);
          }else{
            const errorMessage = data?.error || 'Login failed.';
            setFieldError('general', errorMessage);
            showToast.error(errorMessage);
          }
        }catch(err){
          console.error("Login error:", err);
          let errorMessage = "Something went wrong, please try again";
          
          if (err.response && err.response.data && err.response.data.error) {
            errorMessage = err.response.data.error;
          } else if (err.message) {
            errorMessage = err.message;
          }
          
          setFieldError('general', errorMessage);
          showToast.error(errorMessage);


        }finally{
          setSubmitting(false);
        }
      }
    }
  )
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       const details = {username, password}
//       const response = await makeRequest("auth/login", details, "Post" )

//       const data = response;

//       if (data && data.token) {
//         showToast.success('Login successful!');
//         localStorage.setItem('authToken', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         onLoginSuccess(data);
//       } 
//       else {
//       const errorMessage = data?.error || 'Login failed.';
//       setError(errorMessage);
//       showToast.error(errorMessage);
//       }
//   } catch (err) {
//     console.error("Login error:", err);
    
//     // Checking if it's an axios error with response data
//     let errorMessage = "Something went wrong, please try again";
    
//     if (err.response && err.response.data && err.response.data.error) {
//       // Backend returned an error message
//       errorMessage = err.response.data.error;
//     } else if (err.message) {
//       errorMessage = err.message;
//     }
    
//     setError(errorMessage);
//     showToast.error(errorMessage);
//   } finally {
//     setIsLoading(false);
//   }
// };

  const socialButtons = [
    { icon: Apple, text: 'Continue with Apple', color: 'text-gray-800' },
    { icon: Facebook, text: 'Continue with Facebook', color: 'text-blue-600' },
    { icon: Github, text: 'Continue with GitHub', color: 'text-gray-800' },
    { icon: Chrome, text: 'Continue with Google', color: 'text-gray-600' },
    { icon: Twitter, text: 'Continue with Twitter (X)', color: 'text-gray-800' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img className="mx-auto h-12 w-auto" src={logo} alt="DEV Community Logo" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in with your username</p>
        </div>

        {/* Show error */}
        {formik.errors.general && (
          <div className="text-red-600 text-sm font-medium text-center">
            {formik.errors.general} 
          </div>
        )}

        {/* Social Login */}
        <div className="space-y-3">
          {socialButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-50 transition-colors duration-200"
            >
              <button.icon className={`w-5 h-5 ${button.color}`} />
              <span className="absolute text-black left-1/2 transform -translate-x-1/2">
                {button.text}
              </span>
              <span className="w-5" />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500 font-medium">OR</span>
          </div>
        </div>

        {/* Login form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="username"
              className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.username && formik.errors.username
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}

              placeholder="Enter your username"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                name="rememberMe"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
