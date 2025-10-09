import { useState } from 'react';
import { makeRequest, showToast } from '../utils/util';

const EmailSignup = ({onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    profileImage: '',
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const [errors, setErrors] = useState({});
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    getBase64(file)
    setFormData(prev => ({
      ...prev,
      profileImage:file,
      

    }));
  };

  function getBase64(file) {
    let base64String = '';
   var reader = new FileReader();

   reader.readAsDataURL(file);
   reader.onload = function () {
    base64String = reader.result.split(",")[1]
    setImage(base64String)
     console.log(base64String);

   };   
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
   return base64String;
}
 

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.passwordConfirmation) {
      newErrors.passwordConfirmation = 'Password confirmation is required';
    } else if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = 'Passwords do not match';
    }

    if (!captchaVerified) {
      newErrors.captcha = 'Please verify that you are not a robot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const signupUser = async (userData) => {
  try {
    // const formData = new FormData();
    // formData.append('username', userData.username);
    // formData.append('email', userData.email);
    // formData.append('password', userData.password);
    // formData.append('name', userData.name);
    // if (userData.profileImage) {
    //   formData.append('profileImage', userData.profileImage);
    // }
    const newData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      name: userData.name,
      profileImage: image
    }
    console.log(newData)

    const data = await makeRequest('auth/signup', newData, 'Post');

    if (data && data.token){
    localStorage.setItem("authtoken", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))
    }

    return data;
  } catch (error) {
    // Accessing error response data if available
    const errorMessage = error.response?.data?.error || error.message || 'Signup failed';
    showToast.error(errorMessage);
    throw error;
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await signupUser(formData);
      
      // Storing the JWT token in localStorage
      localStorage.setItem('authToken', result.token);
      
      //  triggers navigation to SignupFlow
      if (onSignupSuccess) {
        onSignupSuccess(result);
      }
      
    } catch (error) {
      setErrors({
        submit: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create your account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Show general error message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile image
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="profile-image"
                disabled={isLoading}
              />
              <label
                htmlFor="profile-image"
                className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded cursor-pointer transition-colors duration-200 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Browse...
              </label>
              <span className="text-sm text-gray-500">
                {formData.profileImage ? formData.profileImage.name : 'No file selected.'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Confirmation <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={formData.passwordConfirmation}
              onChange={(e) => handleInputChange('passwordConfirmation', e.target.value)}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.passwordConfirmation ? 'border-red-500' : 'border-gray-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {errors.passwordConfirmation && (
              <p className="mt-1 text-sm text-red-600">{errors.passwordConfirmation}</p>
            )}
          </div>

          <div>
            <div className="border border-gray-300 rounded p-4 bg-gray-50">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={captchaVerified}
                  onChange={(e) => setCaptchaVerified(e.target.checked)}
                  disabled={isLoading}
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
            {errors.captcha && (
              <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
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