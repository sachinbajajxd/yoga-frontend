import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Genders, Slots } from '../constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate=useNavigate();

  const initialValues = {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      age: '',
      gender: '',
      slot: '',
  }

  const validationSchema = yup.object().shape({
      firstName: yup.string().required('First Name is required'),
      lastName: yup.string().required('Last Name is required'),
      mobile: yup
        .string()
        .required('Mobile number is required')
        .matches(/^\d{10}$/, 'Mobile number must be 10 digits'),
      email: yup.string().email('Invalid email').required('Email is required'),
      age: yup
        .number()
        .required('Age is required')
        .integer('Age must be a whole number')
        .min(18, 'Age must be at least 18 years old')
        .max(65, 'Age must not exceed 65 years old'),
      gender: yup.string().required('Gender is required'),
      slot: yup
        .mixed()
        .oneOf(Object.values(Slots), 'Invalid time slot')
        .required('Time slot is required'),
  });


  const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values, {resetForm, setSubmitting}) => {
        try {
          const response = await axios.post('https://yogaclasses-ocb4.onrender.com/api/v1/', values);
          console.log('data', response.data);
          toast.success("Payment is successful")
          resetForm();
          navigate('/dashboard')
        } catch (error) {
          console.error('request failed:', error);
          toast.error(`${error}`)
        } finally {
          setSubmitting(false);
        }
      },
  })

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-500 to-gray-100 flex-col">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Enter Your Details
        </h1>
        <p className="text-md text-gray-800">
          Get a step closer toward a fitter you!
        </p>
      </div>

      <form className="p-8 rounded-lg shadow-md min-w-[35%] bg-slate-100" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <div className='flex items-center'>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 min-w-[20%]">
              First Name
              <span className=" ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md "
              placeholder='Enter your first name'
              {...formik.getFieldProps('firstName')}
            />
          </div>
          {formik.touched.firstName && formik.errors.firstName && (
            <div className='flex items-center ml-[20%]'>
                <div className='text-red-500 text-sm'>{formik.errors.firstName}</div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className='flex items-center'>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 min-w-[20%]">
              Last Name
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md "
              placeholder='Enter your last name'
              {...formik.getFieldProps('lastName')}
            />
          </div>
          {formik.touched.lastName && formik.errors.lastName && (
            <div className='flex items-center ml-[20%]'>
                <div className='text-red-500 text-sm'>{formik.errors.lastName}</div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className='flex items-center'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 min-w-[20%]">
              Email
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="mail"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md "
              placeholder='Enter your mail'
              {...formik.getFieldProps('email')}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className='flex items-center ml-[20%]'>
                <div className='text-red-500 text-sm'>{formik.errors.email}</div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className='flex items-center'>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600 min-w-[20%]">
              Mobile No.
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="phone"
              id="mobile"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md "
              placeholder='Enter your mobile number'
              {...formik.getFieldProps('mobile')}
            />
          </div>
          {formik.touched.mobile && formik.errors.mobile && (
            <div className='flex items-center ml-[20%]'>
                <div className='text-red-500 text-sm'>{formik.errors.mobile}</div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className='flex items-center'>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600 min-w-[15%]">
              Age
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="number"
              id="age"
              className="mt-1 ml-2 p-2 w-full border border-gray-300 rounded-md "
              placeholder='Enter your Age(in yrs)'
              {...formik.getFieldProps('age')}
            />
          </div>
          {formik.touched.age && formik.errors.age && (
            <div className='flex items-center ml-[17%]'>
                <div className='text-red-500 text-sm'>{formik.errors.age}</div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className='flex items-center'>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600 ">
              Gender
              <span className="ml-1 text-red-500">*</span>
            </label>
            <select
              className='mt-1 ml-2 p-2 w-full border border-gray-300 rounded-md '
              {...formik.getFieldProps('gender')}
            >
            <option value=''>Select gender</option>
              {Object.values(Genders).map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.gender && formik.errors.gender && (
            <div className='flex items-center ml-[15%]'>
                <div className='text-red-500 text-sm'>{formik.errors.gender}</div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className='flex items-center'>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600 ">
              Slot
              <span className="ml-1 text-red-500">*</span>
            </label>
            <select
              className='mt-1 ml-2 p-2 w-full border border-gray-300 rounded-md '
              {...formik.getFieldProps('slot')}
            >
            <option value=''>Select a preferred slot</option>
              {Object.values(Slots).map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.slot && formik.errors.slot && (
            <div className='flex items-center ml-[10%]'>
                <div className='text-red-500 text-sm'>{formik.errors.slot}</div>
            </div>
          )}
        </div>

        <div className='flex justify-center items-center'>
          <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded-md">
            Proceed to Pay
          </button>
        </div>
      </form>

    </div>
  );
};

export default Home;
