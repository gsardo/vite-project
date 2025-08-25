import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => { // destructure the props that are being passed in
    return (
        <div className='search'>
            <div>
                <img src='/src/assets/search.png' alt='search' />

                <input 
                    type="text"
                    placeholder='Search through the collection'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value, console.log('Searched'))} // listening for a change (when a user search). the value is passed to the setter state
                />
            </div>
        </div>
    )
}

export default Search