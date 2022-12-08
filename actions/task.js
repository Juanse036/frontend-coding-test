

class Task {

    async getTaskById(Id){        
        
        const response = await fetch(`http://localhost:3001/tasks?id=${Id}`)
        const TaskData = await response.json();
        return TaskData  
    }

    async getTaskByProfileId(Id){        
        
        const response = await fetch(`http://localhost:3001/tasks?personId=${Id}`)
        const TaskData = await response.json();
        return TaskData  
    }

    async updateTaskById(Id, Data){
        
        const response = await fetch(`http://localhost:3001/tasks/${Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: '{"name": "Lisa", "salary": "8000"}',
            body: JSON.stringify(Data)
        });
    }
    
}

export default new Task()