

class Task {

    async getTaskById(Id){        
        const response = await fetch(`http://localhost:3001/tasks?personId=${Id}`)
        const TaskData = await response.json();         
        return TaskData  
    }

    async updateTaskById(Id, Data){
        
    }
    
}

export default new Task()