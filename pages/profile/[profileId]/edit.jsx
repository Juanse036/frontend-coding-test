import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import people from "../../../actions/people"

const EditProfile = ({data}) => {

    const router = useRouter()
    const profileId = router.query.profileId
    

    const [loading, setLoading] = useState(true)
    const [textAlert, setTextAlert] =useState("")
    const [peopleData, setpeopleData] = useState({
        fullName: '',
        age: '',
        occupation: '',
        nickname:'',
        gender:'',
        picture:''
    })        
    
    const getPeopleData = async(profileId) => {
        const data = await people.getPeopleById(profileId)           
        setpeopleData(data[0]);         
    }

    useEffect(() => {
        const getData = async() => {
            await getPeopleData(profileId);                                    
            setLoading(false)
        }
        if(profileId) getData()
    }, [profileId])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setpeopleData({
          ...peopleData,
          [name]: value,
        });
      };

    const validateData = () => {
        if (!(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(peopleData.picture))){
            setTextAlert("The Picture link is not an image")
            return false
        }

        return true
    }

      const UpdateData = async(e) => {
        e.preventDefault()

        if (validateData()) {            
            await people.updatePeopleDataById(profileId, peopleData)
            router.push(`/profile/${profileId}`)
        }
      }




      if (loading) return (
        <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )

    return (
        <div className='d-flex align-items-center flex-column mt-5'>
            <h1>EDIT PROFILE</h1>
            <form className='w-75' onSubmit={UpdateData}>
                <div className="form-group mt-3">
                    <label >Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='fullName' value={peopleData.fullName} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label >Age</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='age' value={peopleData.age} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label >Occupation</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='occupation' value={peopleData.occupation} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label >Nickname</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='nickname' value={peopleData.nickname} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label >Gender</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='gender' value={peopleData.gender} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label >Picture</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='picture' value={peopleData.picture} onChange={handleInputChange} required/>                    
                    <small className="form-text text-muted">If you dont have an URL image you must upload the image to a hosting service or image sharing site in to obtain a URL.</small>
                </div>
                <button type="submit" className="btn btn-dark mt-4">Submit</button>
            </form>
            { textAlert !== "" ?
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {textAlert}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => {setTextAlert("")}}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            :
            <></>
            }
      </div>
    )
}


export default EditProfile