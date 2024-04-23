import React, { useContext, useState } from 'react'
import { SearchFieldStyles } from '../../styles/search/SearchFieldStyles'
import ActionButton from '../buttons/ActionButton'
import { MdClose } from 'react-icons/md'    
import { SearchModalContext } from '../../contexts/searchModalContext'


const SearchField = ({ value, setValue, onFocus }) => {


    const { isSearchModalOpen, closeSearchModal} = useContext(SearchModalContext)


    if(!isSearchModalOpen){
        return null
    }


  return (
    <SearchFieldStyles>
        <div className='testando123'>
            <input 
            type="text" 
            placeholder="Buscar..." 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            onFocus={onFocus && onFocus}
            />  
        <ActionButton className="" onClick={() => closeSearchModal()}>
            <MdClose />
        </ActionButton>
        </div>
    </SearchFieldStyles>
  )
}

export default SearchField