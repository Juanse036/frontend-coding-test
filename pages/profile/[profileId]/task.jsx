import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import task from '../../../actions/task'

import tasks from '../../../actions/task'

const Task = () => {

    const router = useRouter()
    const profileId = router.query.profileId

    const [loading, setLoading] = useState(true)
    const [tasksData, setTasksData] = useState([{        
        title: '',
        description: '',
        completed: false,
        startDate:'',
        endDate:null,
        personId: ''
    }])     
    
    const getTasksData = async(profileId) => {
        const data = await tasks.getTaskByProfileId(profileId)                 
        setTasksData(data);      

    }

    useEffect(() => {
        const getData = async() => {
            await getTasksData(profileId);                                    
            setLoading(false)
        }
        if(profileId) getData()
    }, [profileId])

    const handleInputChange = async(e) => {
        e.preventDefault()
        
        const { name, value, id } = e.target;
        const currentTaskDataArray = await task.getTaskById(id)
        let currentTaskData = currentTaskDataArray[0]
        

        if (value == "true") {
            currentTaskData.completed = false
            currentTaskData.endDate = null

        }else {
            currentTaskData.completed = true            
        }       

        await tasks.updateTaskById(id, currentTaskData)    
        getTasksData(profileId);
       }; 


       if (loading) return (
        <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )


    return(
        <div className='mt-5'>
            <h1 className='text-center mb-4'>TASKS</h1>
        {tasksData.map(el => {
            return(
                    <div className='d-flex justify-content-center' key={el.id}>
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
                                        <input className={`form-check-input`} type="checkbox" name="completed" value={el.completed} id={el.id} checked={el.completed} onChange={handleInputChange}/>
                                        <label className="form-check-label">
                                            {el.completed ? 'Mark as not completed' : 'Mark as completed'}
                                        </label>
                                    </div>                                    
                                </div>
                                <button type="button" className="btn btn-dark mt-3" onClick={() => router.push(`/tasks/${el.id}/edit`)}>Edit</button> 
                            </a>
                        </div>
                    </div>
            )
        })}
        </div>

    )

}

export default Task