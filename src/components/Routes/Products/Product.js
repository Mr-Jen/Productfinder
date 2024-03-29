import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    margin: 10px;
    border: 1px solid black;
    border-radius: 5px;
    width: 300px;
    background-color: #fcfcfc;
    /*-webkit-box-shadow: 5px 5px 15px 5px #DBDBDB; 
    box-shadow: 5px 5px 15px 5px #DBDBDB;*/
    box-shadow: 3px 3px 5px 0 lightgrey;
`

const Title = styled.h5`
    align-self: center;
    position: relative;
    &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -10px;
        height: 1px;
        width: 70%;
        border-bottom: 3px solid #FFE60A;
    }
`

const ProductImg = styled.img`
    width: 60%;
    height: auto;
    margin: auto;
    margin-top: 1em;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin: 30px 0 30px 0;
    margin-left: 5%;
`

const CategoryWrapper = styled.div`
    display: flex;
    margin-bottom: -10px;
    align-self: flex-start;
`

const CategoryText = styled.p`
    font-weight: bold;
    font-size: 13px;
    margin-right: 10px;
`

const ValueText = styled.p`
    font-size: 13px;
` 

const ButtonText = styled.p`
    margin-right: 10px;
    color: black;
    font-weight: bold;
    font-size 14px;
`

const Compare = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .5em;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax *
`

const Product = ({ title, category, surface, application, lifetime, lifetime_unit, gloss_level, binder, solubility, images, id, onChange, isChecked}) => {

    const [toggle, setToggle] = React.useState(false);

    const linkStyling = {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        textDecoration: 'none',
        height: '30px',
        width: '60%',
        alignItems: 'center',
        backgroundColor: '#ffe60a',
        paddingLeft: '20px',
        paddingRight: '20px',
        borderRadius: '7px',
        marginBottom: '10px',
        marginTop: '10px',
        border: toggle ? '2px solid black' : "2px solid transparent"
    } 

    const onClickCompare = () => {
        onChange(id)
    }

    return (
        <Wrapper>
            <Title>{title}</Title>
            {/*<Img onLoad={() => console.log("IMAGE LOADED")}/>*/}
            <ProductImg src={images[0]} />
            <ContentWrapper>
        	    <CategoryWrapper>
                    <CategoryText>Kategorie: </CategoryText>
                    <ValueText>{category}</ValueText>
                </CategoryWrapper>
                <CategoryWrapper>
                    <CategoryText>Bindemittel: </CategoryText>
                    <ValueText>{binder ? binder : "Keine"}</ValueText>
                </CategoryWrapper>
                <CategoryWrapper>
                    <CategoryText>Lebensdauer: </CategoryText>
                    <ValueText>{lifetime[0]} - {lifetime[1]} {lifetime_unit}</ValueText>
                </CategoryWrapper>
                <CategoryWrapper>
                    <CategoryText>Glanzgrad: </CategoryText>                                
                    {
                        gloss_level.length > 1 && gloss_level[0] !== gloss_level[1] ?
                            <ValueText>{gloss_level[0]} - {gloss_level[1]}</ValueText>
                        : <ValueText>{gloss_level[0]}</ValueText>
                    }
                </CategoryWrapper>
                <CategoryWrapper>
                    <CategoryText>Oberflächen: </CategoryText>
                    <ValueText>{surface}</ValueText>
                </CategoryWrapper>
                <CategoryWrapper>
                    <CategoryText>Löslichkeit: </CategoryText>
                    <ValueText>{solubility}</ValueText>
                </CategoryWrapper>
            </ContentWrapper>
            <Link 
                    to={`/product/${id + 1}`}
                    style={linkStyling}
                    onMouseEnter={() => setToggle(true)}
                    onMouseLeave={() => setToggle(false)}
                >
                    <ButtonText>Ansehen</ButtonText>
                    <img 
                        src="assets/icons/misc/right.png"
                        style={{"height": "20px", "width": "20px", "margin": "5px"}}
                        alt="BackButton"
                    />
            </Link>
            <Compare>
                <label><input type="checkbox" onChange={(e) => onClickCompare(e)} checked={isChecked} name="checkbox" value="value"/>Vergleichen</label>
            </Compare>
        </Wrapper>
    )
}

export default Product
