import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import tasks from '../../../actions/task'

const Task = () => {

    const router = useRouter()
    const profileId = router.query.profileId
    
    

    const [loading, setLoading] = useState(true)
    const [tasksData, setTasksData] = useState([{}])        
    
    const getTasksData = async(profileId) => {
        const data = await tasks.getTaskById(profileId)                 
        setTasksData(data);         
    }

    useEffect(() => {
        const getData = async() => {
            await getTasksData(profileId);                                    
            setLoading(false)
        }
        if(profileId) getData()
    }, [profileId])

    const handleTaskCompleted = () => {

    }


    if (loading) return <p>Loading...</p>


    return(
        <div className='mt-5'>
            <h1 className='text-center mb-4'>TASKS</h1>
        {tasksData.map(el => {
            return(
                    <div className='d-flex justify-content-center'>
                        <div className="list-group w-75">
                            <a href="#" className={`list-group-item list-group-item-action ${el.completed ? 'list-group-item-success': 'list-group-item-light'} `}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{el.title}</h5>
                                    <div>
                                    <small><strong>Start date:</strong> {el.startDate}</small> <br />
                                    {el.endDate ?  <small><strong>End date:</strong> {el.endDate}</small> : <></>}
                                    </div>
                                </div>
                                <div className="d-flex w-100 justify-content-between">
                                    <p className="mb-1">{el.description}</p>
                                    <div className="form-check ">
                                        <input className={`form-check-input`} type="checkbox" value="" checked={el.completed}/>
                                        <label className="form-check-label" for="flexCheckDefault">
                                            {el.completed ? 'Mark as not completed' : 'Mark as completed'}
                                        </label>
                                    </div>                                    
                                </div>
                                <button type="button" class="btn btn-dark mt-3">Edit</button>                                
                            </a>
                        </div>
                    </div>
            )
        })}
        </div>

    )

}

export default Task