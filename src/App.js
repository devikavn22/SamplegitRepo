import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
//import { Component } from 'react/cjs/react.development'



const URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'


const Table = () => {
    const [members, setMembers] = useState([])
    //const [filteredData, setFilteredResults] = useState([])
    //const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setMembers(response.data)
    }

    const removeData = (id) => {
            const del = members.filter(member => id !== member.id)
            setMembers(del)
        
    }

    const renderHeader = () => {
        let headerElement = ['checkbox','id', 'name', 'email', 'role', 'operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return members && members.map(({ id, name, email, role }) => {
            return ( 
            
                <tr key={id}>
                    <td data-model="Checkbox">  </td>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{role}</td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(id)}>
                        <img
                             src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
                             alt="delete"
                             className="delete-icon"
                         />
                        </button>
                        
                    </td>
                    
                    
                    
                </tr>
                
            )
        })
    }
    
    const handleSearch = (event) => {
      setSearch(event.target.value);
    };
  
    const data = {
      members: members.filter((member) =>
        member.name.includes(search)
      ),
    };
    
    return (
        <>
            
            <h1 id='title' className='head'>Members List</h1>
            
            <input
              className="search"
              type="text"
              placeholder="Search by name, email or role"
              onChange={handleSearch}
            ></input>
            <table id='member' data={data}>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}


export default Table

