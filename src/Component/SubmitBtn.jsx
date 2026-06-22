import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({text}) => {
  // alert("d")
 const navigation = useNavigation()
 console.log("navigation.state" ,navigation.state);
 
const isSubmitting = navigation.state === 'submitting';
console.log(isSubmitting);


  return (
   <button type='submit' className='btn btn-primary btn-block w-30 border border-blue-500 text-black bg-white hover:bg-gray-100 py-2 rounded'
   disabled= {isSubmitting}
   >

    {console.log("isSubmitting" ,isSubmitting)}
    {isSubmitting ? (
        <>
        <span className="loading loading-spinner loading-sm"></span>
         sending...
        </>
    ): (
        text || 'Submit'
    )}
    </button>

  )
}

export default SubmitBtn