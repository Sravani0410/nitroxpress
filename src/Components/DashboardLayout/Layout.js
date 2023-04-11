import React from 'react' 
import Profileheader from './Profileheader'

const Layout = ({ children,searchBox }) => {
    return (
        <div>
            <Profileheader 
            searchBox={searchBox}/>
            {children}

        </div>
    )
}

export default Layout