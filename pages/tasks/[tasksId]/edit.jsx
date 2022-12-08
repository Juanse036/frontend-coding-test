import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import task from "../../../actions/task"

const EditTasks = () => {

    const router = useRouter()
    const taskId = router.query.tasksId
    var todayDate = new Date().toISOString().slice(0, 10);
    

    const [loading, setLoading] = useState(true)
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        completed: false,
        startDate:'',
        endDate:null,
        personId: ''
    })      
    const [endDateValue, setEndDateValue] = useState("")
    
    const getTaskData = async(taskId) => {
        const data = await task.getTaskById(taskId)               
        setTaskData(data[0]);  
        data[0].completed ? setEndDateValue(data[0].endDate) : setEndDateValue("")
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
        name == "endDate" ? setEndDateValue(value): ""
        
        if (name == "completed"){
            if (taskData.completed){
                setTaskData({...taskData, endDate:null, completed: !taskData.completed})
                setEndDateValue("")
            }else {
                setTaskData({...taskData, endDate:endDateValue, completed: !taskData.completed})
            }
            
        
        }else {
            setTaskData({
                ...taskData,
                [name]: value,
            });
        }
        
      }; 

      const UpdateData = async(e) => {
        e.preventDefault()
        await task.updateTaskById(taskId, taskData)
        router.push(`/profile/${taskData.personId}`)
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
            <h1>EDIT TASK</h1>
            <form className='w-75' onSubmit={UpdateData}>
                <div className="form-group mt-3">
                    <label >Title</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='title' value={taskData.title} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label >Description</label>
                    <input type="text" className="form-control" placeholder="Enter email" name='description' value={taskData.description} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-group mt-3">
                    <label >Star Date</label>
                    <input type="date" className="form-control" placeholder="Enter email" name='startDate' value={taskData.startDate} onChange={handleInputChange} required/>                    
                </div>
                <div className="form-check mt-3">
                    <input className="form-check-input" type="checkbox" value={taskData.completed} name='completed' checked={taskData.completed} onChange={handleInputChange}/>
                    <label className="form-check-label">
                        Completed
                    </label>
                </div>
                <div className="form-group mt-3">
                    <label >End Date</label>
                    <input type="date" className="form-control" placeholder="Enter email" name='endDate' min={taskData.startDate} max={todayDate} value={endDateValue} onChange={handleInputChange} disabled={!taskData.completed}/>                    
                </div>
                <div className='d-flex gap-4 mt-4'>
                    <button type="submit" className="btn btn-dark ">Submit</button>
                    <button type="button" className="btn btn-danger" onClick={() => router.push(`/profile/${taskData.personId}`)}>Cancel</button>
                </div>
            </form>            
      </div>
    )
}


export default EditTasks


