import { useEffect, useState } from "react"
import people from "../../actions/people"

const Home = () => {

    const [loading, setLoading] = useState(true)
    const [peopleData, setpeopleData] = useState([])        
    
    const getPeopleData = async() => {
        const data = await people.getPeople()
        const sortedData = await sortData(data)
        setpeopleData(sortedData);
        sortData()                  
    }

    const sortData = async(array) => {

        const sortedData = await Promise.all(peopleData.sort((a, b) => {
            return a.age - b.age;
        }));

        return sortedData
    }

    useEffect(() => {
        const getData = async() => {
            await getPeopleData();            
            setLoading(false)
        }

        getData()
    }, [])

    if (loading) return <p>Loading...</p>

    return (
        <table>
            <thead>
                <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Occupation</th>
                </tr>  
            </thead>   
            <tbody>
            {peopleData.map(data => {                
                return (
                <tr key={data.id}>
                    <th><img src={data.picture} alt={data.nickname}/></th>
                    <th>{data.fullName}</th>
                    <th>{data.age}</th>
                    <th>{data.occupation}</th>                    
                </tr>
                )
            })}
            </tbody>    
        </table>
    )

}


export default Home