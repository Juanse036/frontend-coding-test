import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

import styles from './style.module.css'

import people from "../../actions/people"

const Home = () => {

    const router = useRouter()
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

    if (loading) return (
        <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )

    return (
        <>
        <div className={`m-auto mt-5 d-flex justify-content-center align-items-center`}>
            <button type="button" className="btn btn-dark" onClick={sortData}>Sort By Age</button>                  
        </div>
        <div className={`w-75 m-auto mt-5 d-flex justify-content-center align-items-center`}>
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
                    <tr key={data.id} className={styles.cursor} onClick={() => router.push(`/profile/${data.id}`)}>
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