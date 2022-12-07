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




    if (loading) return <p>Loading...</p>

    return (
        <div className='d-flex align-items-center flex-column mt-5'>
            <h1>EDIT PROFILE</h1>
            <form className='w-75' onSubmit={UpdateData}>
                <div className="form-group mt-3">
                    <label for="exampleInputEmail1">Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='fullName' value={peopleData.fullName} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label for="exampleInputEmail1">Age</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='age' value={peopleData.age} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label for="exampleInputEmail1">Occupation</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='occupation' value={peopleData.occupation} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label for="exampleInputEmail1">Nickname</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='nickname' value={peopleData.nickname} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label for="exampleInputEmail1">Gender</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='gender' value={peopleData.gender} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label for="exampleInputEmail1">Picture</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='picture' value={peopleData.picture} onChange={handleInputChange} required/>                    
                </div>
                <button type="submit" className="btn btn-dark mt-4">Submit</button>
            </form>
            { textAlert !== "" ?
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                {textAlert}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => {setTextAlert("")}}>
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