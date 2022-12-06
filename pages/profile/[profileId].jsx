import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import people from "../../actions/people"

const ProfileData = () => {

    const router = useRouter()
    const profileId = router.query.profileId
    

    const [loading, setLoading] = useState(true)
    const [peopleData, setpeopleData] = useState({})        
    
    const getPeopleData = async(profileId) => {
        const data = await people.getPeopleById(profileId)         
        setpeopleData(data);         
    }

    useEffect(() => {
        const getData = async() => {
            await getPeopleData(profileId);                                    
            setLoading(false)
        }
        if(profileId) getData()
    }, [profileId])


    if (loading) return <p>Loading...</p>


    return (        
        <div>
            <img src={peopleData.picture} alt={peopleData.id} />
            <h1>{peopleData.fullName}</h1>
            <p>{peopleData.nickname}</p>
            <p>{peopleData.age}</p>
            <p>{peopleData.gender}</p>
            <p>{peopleData.occupation}</p>
        </div>
    )

}

export default ProfileData