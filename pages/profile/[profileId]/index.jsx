import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import people from "../../../actions/people"
import Task from './task'


const ProfileData = () => {

    const router = useRouter()
    const profileId = router.query.profileId
    

    const [loading, setLoading] = useState(true)
    const [peopleData, setpeopleData] = useState({})        
    
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


    if (loading) return (
        <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
            <div class="spinner-border" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
    )


    return (    
        <>
        <div className={`d-flex justify-content-center w-100 mt-5`}>
            <div className={`card h-100 w-75`}>   
                <div className={`row no-gutters`}>
                    <div className={`col-md-4`}>
                        <img src={peopleData.picture} alt={peopleData.id} className={`card-img-top`} />
                    </div>
                    <div className={`col-md-8`}>
                        <div className={`card-body`}>
                            <h1 className={`card-header p-0 pb-3`}>{peopleData.fullName}</h1>
                            <div className={`pt-3`}>
                                <p className={`card-text h3`}><strong>Nickname:</strong> {peopleData.nickname}</p>
                                <p className={`card-text h4`}><strong>Age:</strong> {peopleData.age}</p>
                                <p className={`card-text h4`}><strong>Gender:</strong> {peopleData.gender}</p>
                                <p className={`card-text h4`}><strong>Occupation:</strong> {peopleData.occupation}</p>
                                <button type="button" className="btn btn-dark w-25 mt-3" onClick={() => router.push(`/profile/${profileId}/edit`)}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        <Task />
        </>
    )

}

export default ProfileData