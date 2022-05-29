import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Title from './Title'

const linkStyle = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center"
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
        box-sizing: border-box;

`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 100vw;
`


const Text = styled.p`
    marginRight: 20px;
    @media (max-width: 450px) {
        display: none;
    }
`

const SubHeader = ({ location, title }) => {

    React.useEffect(() => {
        updatePredicate();
        window.addEventListener('resize', () => updatePredicate());
      
        // returned function will be called on component unmount 
        return () => {
          window.removeEventListener('resize', () => updatePredicate())
        }
      })
    
    const updatePredicate = () => {
        //setIsDesktop(window.innerWidth > 600)
        let arrow = document.getElementById("arrow")
        let title = document.getElementById("title")
        //console.log("BOUNDING ARROW: ", arrow.getBoundingClientRect())
        //console.log("BOUNDING TITLE: ", title && title)
    }

    return (
        <Wrapper>
            <Header>
                <Link 
                    to={location}
                    style={linkStyle}
                    id="arrow"
                >
                    <img 
                        src={"/assets/icons/misc/left.png"}
                        alt="BackButton"
                        style={{"height": "25px", "width": "25px", "margin": "5px"}}
                    />
                    <Text 
                        style={{"color": "black", "fontWeight": "bold"}}
                    >
                        Zurück
                    </Text>
                </Link>
                <Title id="title" contentText={title}/>
                <div style={{visibility: 'hidden'}}>
                    <Link 
                        to={location}
                        style={linkStyle}
                    >
                        <img 
                            src={"/assets/icons/misc/left.png"}
                            alt="BackButton"
                            style={{"height": "25px", "width": "25px", "margin": "5px"}}
                        />
                        <Text 
                            style={{"color": "black", "fontWeight": "bold"}}
                        >
                            Zurück
                        </Text>
                    </Link>
                </div>
            </Header>
        </Wrapper>
    )
}

export default SubHeader