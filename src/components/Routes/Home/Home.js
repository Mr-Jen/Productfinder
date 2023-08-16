import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToHistory } from '../../../actions/history';
import './home.css';

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

const HomeIcon = styled.img`
    display: flex;
    align-self: center;
    width: 30%;
    max-width: 200px;
    margin-right: 20%;
    @media (max-width: 625px) {
        margin-right: 0;
    }
`
const TitleText = styled.h2`
    line-height: 1.4;
`

const InfoText = styled.p`
    color: grey;
    font-size: 18px;
    line-height: 1.6;
    margin: 2em 0 2em 0;
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
            <HomeIcon 
                src={"assets/icons/home/Brush-Search.svg"}
                alt="HomeIcon"
            />
            <HomeWrapper>
                <TitleText>Der <span style={{"fontWeight": "bold", "fontSize": "26px", "letterSpacing": "1px"}}>Produktfinder</span> hilft Ihnen bei der Entscheidung für den zu Ihrem Projekt passenden Anstrich.
                </TitleText>
                <InfoText>
                    Durch eine Reihe von Filterfragen kann der Produktfinder Ihnen helfen, die Auswahl der verschiedenen Anstricharten so zu 
                    reduzieren, dass nur noch für Sie relevante Anstriche gezeigt werden. Hierbei wird nicht nur so gefiltert, dass die technisch 
                    möglichen Anstriche gezeigt werden, Sie können auch Ihre persönlichen Vorlieben angeben, bspw. ob es eine Lasur, Farbe, mit mehr oder weniger Glanz sein soll. Aktuell ist der Produktfinder nur für Holzaußenfarben ausgelegt.
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
