import { useEffect, useState } from "react"

import styles from './style.module.css'

import people from "../../actions/people"

const Home = () => {

    const [loading, setLoading] = useState(true)
    const [peopleData, setpeopleData] = useState([])    
    const [sortDescending, setSortDescending]     = useState(true)
    
    const getPeopleData = async() => {
        const data = await people.getPeople()
        const sortData = data.sort((a, b) => {
            return a.age - b.age;
        })
        setpeopleData(sortData); 
    }

    useEffect(() => {
        const getData = async() => {
            await getPeopleData();            
            setLoading(false)
        }
        getData()
    }, [])

    const sortData = () => {
        if (sortDescending) {

            const sortedData = peopleData.sort((a, b) => {
                return b.age - a.age;
            })
            setpeopleData(sortedData); 

        }else {

            const sortedData = peopleData.sort((a, b) => {
                return a.age - b.age;
            })
            setpeopleData(sortedData); 

        }
        setSortDescending(!sortDescending)
    }

    if (loading) return <p>Loading...</p>

    return (
        <>
        <div className={styles.container}>
            <button type="button" className="btn btn-dark" onClick={sortData}>Sort By Age</button>                  
        </div>
        <div className={styles.container}>
            <table className="table table-light table-striped table-hover text-center justify-center">
                <thead className="table-dark">
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th onClick={sortData} className={styles.cursor}>Age</th>
                        <th>Occupation</th>
                    </tr>  
                </thead>   
                <tbody>
                {peopleData.map(data => {                
                    return (
                    <tr key={data.id} className={styles.cursor}>
                        <td ><img src={data.picture} alt={data.nickname} className={styles.img}/></td>
                        <td>{data.fullName}</td>
                        <td>{data.age}</td>
                        <td>{data.occupation}</td>                    
                    </tr>
                    )
                })}
                </tbody>               
            </table>
        </div>
        </>
    )

}


export default Home