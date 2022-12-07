import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import task from "../../../actions/task"

const EditTasks = () => {

    const router = useRouter()
    const taskId = router.query.tasksId
    

    const [loading, setLoading] = useState(true)    
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        completed: false,
        startDate:'',
        endDate:'',
        personId: ''
    })        
    
    const getTaskData = async(taskId) => {
        const data = await task.getTaskById(taskId)           
        setTaskData(data[0]);         
    }

    useEffect(() => {
        const getData = async() => {
            await getTaskData(taskId);                                    
            setLoading(false)
        }
        if(taskId) getData()
    }, [taskId])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
          ...taskData,
          [name]: value,
        });
      }; 

      const UpdateData = async(e) => {
        e.preventDefault()

        await taskId.updateTaskDataById(profileId, peopleData)
        router.push(`/profile/${profileId}`)
        }
      




    if (loading) return <p>Loading...</p>

    return (
        <div className='d-flex align-items-center flex-column mt-5'>
            <h1>EDIT TASK</h1>
            <form className='w-75' onSubmit={UpdateData}>
                <div className="form-group mt-3">
                    <label for="exampleInputEmail1">Title</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='title' value={taskData.title} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label for="exampleInputEmail1">Description</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='description' value={taskData.description} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label for="exampleInputEmail1">Star Date</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='startDate' value={taskData.startDate} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-check mt-3">
                    <input class="form-check-input" type="checkbox" value={taskData.completed} name='completed' checked={taskData.completed} onChange={handleInputChange}/>
                    <label class="form-check-label" for="flexCheckChecked">
                        Completed
                    </label>
                </div>
                <div className="form-group mt-3">
                    <label for="exampleInputEmail1">End Date</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='endDate' value={taskData.endDate} onChange={handleInputChange} required={taskId.completed} disabled={!taskId.completed}/>                    
                </div>
                <button type="submit" className="btn btn-dark mt-4">Submit</button>
            </form>            
      </div>
    )
}


export default EditTasks


