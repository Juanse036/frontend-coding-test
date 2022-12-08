

class People {
    async getPeople(){        
        const response = await fetch('http://localhost:3001/people')
        const PeopleData = await response.json();        
        return PeopleData            
    }

    async getPeopleById(Id){        
        const response = await fetch(`http://localhost:3001/people?id=${Id}`)
        const PeopleData = await response.json();                 
        return PeopleData  
    }

    async updatePeopleDataById(Id, Data){
        const response = await fetch(`http://localhost:3001/people/${Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: '{"name": "Lisa", "salary": "8000"}',
            body: JSON.stringify(Data)
        });
    }
}

export default new People()