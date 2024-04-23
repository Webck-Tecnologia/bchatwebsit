import React, { useContext, useState } from 'react'
import { SearchModalStyles } from '../../styles/search/SearchModalStyles'
import ActionButton from '../buttons/ActionButton'
import { MdClose } from 'react-icons/md'    
import { SearchModalContext } from '../../contexts/searchModalContext'
import SearchField from './SearchField'

function Search(){

    const { isSearchModalOpen, closeSearchModal} = useContext(SearchModalContext)
    const [searchQuery, setSearchQuery] = useState('')
    const handleOnFocus = () => {
        console.log('focus')
    }


    if(!isSearchModalOpen){
        return null
    }

    return(
        <SearchModalStyles>
                  <div className='modal__container'>
                      <SearchField value={searchQuery} setValue={setSearchQuery} onFocus={handleOnFocus}>
                      </SearchField>
                  </div>
        </SearchModalStyles>  
    )
}
export default Search