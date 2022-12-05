

class People {
    async getPeople(){        
        const response = await fetch('http://localhost:3001/people')
        const PeopleData = await response.json();        
        return PeopleData            
    }
    
}

export default new People()