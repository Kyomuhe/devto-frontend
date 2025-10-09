// import { useState } from 'react';
import { makeRequest, showToast } from '../utils/util';
import { useFormik } from 'formik';
//import { use } from 'react';
import * as Yup from 'yup';

const EmailSignup = ({onSignupSuccess }) => {

  const validationSchema = Yup.object().shape(
    {
      name: Yup.string()
      .trim()
      .required('Name is required'),
      username: Yup.string()
      .trim()
      .min(6, 'username must be at least 6 characters ')
      .required('username is required'),
      email: Yup.string()
      .trim()
      .email('Invalid email format')
      .required('Email is required'),
      password: Yup.string()
      .min(8, 'Password must be at least 8 characters ')
      .required('Password is required'),
      passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
      profileImage: Yup.mixed()
      .nullable(),
      captcha: Yup.boolean()
      .oneOf([true], 'Please verify that you are not a robot')
      .required('Captcha verification is required') 

    }
  );

  const formik = useFormik(
    {
      initialValues:{
        profileImage: null,
        name: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        captcha: false

      },
      validationSchema: validationSchema,
      onSubmit: async (values, {setSubmitting, setFieldError}) =>{
        try{
          let base64Image = '';
          if (values.profileImage) {
            base64Image = await getBase64(values.profileImage);
          }
          const userData = {
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
            profileImage: base64Image
          };
          console.log(userData);

          const data = await makeRequest('auth/signup', userData, 'Post');

          if (data && data.token){
            showToast.success('Signup successful!');
            localStorage.setItem("authtoken", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            if (onSignupSuccess){
              onSignupSuccess(data);
            }
          }


        }catch (error){
          const errorMessage = error.response?.data?.error || error.message || 'signup failed';
          setFieldError('general', errorMessage);
          showToast.error(errorMessage);
        }finally {
          setSubmitting(false);
        }
    }
});

//   function getBase64(file) {
//     let base64String = '';
//    var reader = new FileReader();

//    reader.readAsDataURL(file);
//    reader.onload = function () {
//     base64String = reader.result.split(",")[1]
//     setImage(base64String)
//      console.log(base64String);

//    };   
//    reader.onerror = function (error) {
//      console.log('Error: ', error);
//    };
//    return base64String;
// }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => {
        console.error('Error: ', error);
        reject(error);
      };
    });
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue('profileImage', file);
  };



  // const [formData, setFormData] = useState({
  //   profileImage: '',
  //   name: '',
  //   username: '',
  //   email: '',
  //   password: '',
  //   passwordConfirmation: ''
  // });

  // const [errors, setErrors] = useState({});
  // const [captchaVerified, setCaptchaVerified] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [image, setImage] = useState("");

  // const handleInputChange = (field, value) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
    
  //   // Clear error when user starts typing
  //   if (errors[field]) {
  //     setErrors(prev => ({
  //       ...prev,
  //       [field]: ''
  //     }));
  //   }
  // };

 

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.name.trim()) {
  //     newErrors.name = 'Name is required';
  //   }

  //   if (!formData.username.trim()) {
  //     newErrors.username = 'Username is required';
  //   }

  //   if (!formData.email.trim()) {
  //     newErrors.email = 'Email is required';
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = 'Email is invalid';
  //   }

  //   if (!formData.password) {
  //     newErrors.password = 'Password is required';
  //   } else if (formData.password.length < 8) {
  //     newErrors.password = 'Password must be at least 8 characters';
  //   }

  //   if (!formData.passwordConfirmation) {
  //     newErrors.passwordConfirmation = 'Password confirmation is required';
  //   } else if (formData.password !== formData.passwordConfirmation) {
  //     newErrors.passwordConfirmation = 'Passwords do not match';
  //   }

  //   if (!captchaVerified) {
  //     newErrors.captcha = 'Please verify that you are not a robot';
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

// const signupUser = async (userData) => {
//   try {
//     // const formData = new FormData();
//     // formData.append('username', userData.username);
//     // formData.append('email', userData.email);
//     // formData.append('password', userData.password);
//     // formData.append('name', userData.name);
//     // if (userData.profileImage) {
//     //   formData.append('profileImage', userData.profileImage);
//     // }
//     const newData = {
//       username: userData.username,
//       email: userData.email,
//       password: userData.password,
//       name: userData.name,
//       profileImage: image
//     }
//     console.log(newData)

//     const data = await makeRequest('auth/signup', newData, 'Post');

//     if (data && data.token){
//     localStorage.setItem("authtoken", data.token)
//     localStorage.setItem("user", JSON.stringify(data.user))
//     }

//     return data;
//   } catch (error) {
//     // Accessing error response data if available
//     const errorMessage = error.response?.data?.error || error.message || 'Signup failed';
//     showToast.error(errorMessage);
//     throw error;
//   }
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});

//     try {
//       const result = await signupUser(formData);
      
//       // Storing the JWT token in localStorage
//       localStorage.setItem('authToken', result.token);
      
//       //  triggers navigation to SignupFlow
//       if (onSignupSuccess) {
//         onSignupSuccess(result);
//       }
      
//     } catch (error) {
//       setErrors({
//         submit: error.message,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create your account
          </h1>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Show general error message */}
          {formik.errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{formik.errors.general}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile image
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="profile-image"
                disabled={formik.isSubmitting}
              />
              <label
                htmlFor="profile-image"
                className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded cursor-pointer transition-colors duration-200 ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Browse...
              </label>
              <span className="text-sm text-gray-500">
                {formik.values.profileImage ? formik.values.profileImage.name : 'No file selected.'}
              </span>
            </div>
            {formik.touched.profileImage && formik.errors.profileImage && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.profileImage}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name ="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
              } ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name ="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'
              } ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name ="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
              } ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
              } ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Confirmation <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name ='passwordConfirmation'
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? 'border-red-500' : 'border-gray-300'
              } ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.passwordConfirmation}</p>
            )}
          </div>

          <div>
            <div className="border border-gray-300 rounded p-4 bg-gray-50">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formik.values.captcha}
                  onChange={formik.handleChange}
                  name="captcha"
                  onBlur ={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  className="w-6 h-6 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="text-sm text-gray-700">I'm not a robot</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">reCAPTCHA</div>
                  <div className="text-xs text-gray-400">Privacy - Terms</div>
                </div>
              </div>
            </div>
            {formik.touched.captchaVerified && formik.errors.captchaVerified && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.captchaVerified}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {formik.isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailSignup;