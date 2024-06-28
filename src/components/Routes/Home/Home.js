import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToHistory } from '../../../actions/history';
import './home.css';
import guyGIF from './guy.gif'
import girlGIF from './girl.gif'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 625px) {
        flex-direction: column;
        align-items: center;
    }
    justify-content: center;
    margin-top: 4vh;
    align-items: center;
`

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 40%;
    @media (max-width: 625px) {
        width: 90%;
        margin-top: 1em;
    }
`

const IconRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
`

const HomeIcon = styled.img`
    display: flex;
    align-self: center;
    width: 30%;
    max-width: 400px;
    @media (max-width: 625px) {
        width: 30vw;
    }
`
const TitleText = styled.h2`
    line-height: 1.4;
`

const InfoText = styled.p`
    color: grey;
    font-size: 18px;
    line-height: 1.6;
    margin: 1em 0 2em 0;
`

const Icon = styled.img``

const InfoButton = styled.button`
  height: 3em;
  width: 3em;
  margin: 0 1em 0 1em;
  border: 1px solid transparent;
  border-radius: 7px;
  padding-top: 4px;
  background: #FFE60A;

  //-webkit-box-shadow: 6px 6px 5px 1px rgba(0,0,0,0.15); 
  //box-shadow: 6px 6px 5px 1px rgba(0,0,0,0.15);
`

const linkStyling = {
}

const Home = ({addToHistory, shouldForward}) => {

    const onStart = () => {
        if(shouldForward){
            addToHistory("0");
        }
    }

    return (
        <Wrapper>
            {/*<HomeIcon 
                src={"assets/icons/home/Brush-Search.svg"}
                alt="HomeIcon"
            />*/}
            <IconRow>
                <HomeIcon src={guyGIF} alt="guy"/>
                <HomeIcon src={girlGIF} alt="guy"/>
            </IconRow>            
            <HomeWrapper>
                <TitleText>Der <span style={{"fontWeight": "bold", "fontSize": "24px", "letterSpacing": "1px"}}>Produktfinder</span> hilft Ihnen, das richtige Anstrichmittel für Ihr Projekt zu finden.
                </TitleText>
                <InfoText>
                    Durch ein einfaches Frage & Antwort-Spiel hilft der Produktfinder Ihnen, die Auswahl der verschiedenen Anstricharten so zu reduzieren, dass nur noch für Sie relevante Anstriche gezeigt werden. Hierbei wird nicht nur so gefiltert, dass die technisch möglichen Anstriche gezeigt werden, Sie können auch Ihre persönlichen Vorlieben angeben, bspw. ob es eine Lasur oder Farbe sein soll. 
                    Aktuell ist der Produktfinder nur für Holzaußenfarben ausgelegt, weitere Bereiche folgen in Kürze.
                    <br/><br/>
                    Durch die                 
                    <InfoButton>
                        <Icon alt="info" height="20px" width="20px" src={"/assets/icons/misc/info.svg"}></Icon>
                    </InfoButton> Symbole erhalten Sie im Produktfinder weitere Informationen.
                </InfoText>
                <Link 
                    to="/fragen-und-antworten"
                    className={"link"}
                    style={linkStyling}
                    onClick={() => onStart()}
                >
                    <p className={"link-text"} style={{"marginRight": "20px", "fontWeight": "bold"}}>Loslegen</p>
                    <img 
                        src="assets/icons/misc/right.png"
                        style={{"height": "25px", "width": "25px", "margin": "5px"}}
                        alt="BackButton"
                    />
                </Link>
            </HomeWrapper>
        </Wrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    addToHistory: itemId => dispatch(addToHistory(itemId))
})

const mapStateToProps = ({ history }) => {
    return {
        shouldForward: history.length === 0
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
