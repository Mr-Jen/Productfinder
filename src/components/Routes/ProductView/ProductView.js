import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import NavigateButton from '../../Shared/NavigateButton'
import './productview.css'

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

const MainWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2em;

    @media (min-width: 1000px){
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-start;
        flex: 1 1;
        width: 90%;
    }
`

const Title = styled.h2`
    text-align: center;
    z-index: -100;
    position: relative;
    &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -10px;
        height: 1px;
        width: 80%;
        border-bottom: 4px solid #FFE60A;
    }
`

const ImageWrapper = styled.div`
    width: 40%;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    position: sticky;
    top: 8em;

    @media (max-width: 1000px){
        position: inherit;
        width: 60%;
        justify-content: center;
    }
`

const ProductImage = styled.img`
    min-width: 120px;
    width: 100%;
    max-width: 300px;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media (min-width: 700px){
        width: 80%;
    }
    @media (min-width: 1000px){
        width: 50%;
    }
`

const SubTitle = styled.h3`
    background-color: #FFE60A;
    padding: .5em;
    width: 100%;
    text-align: center;
`

const PropsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const PropsRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1em 0 1em 0;
`

const PropsValue = styled.p`
    margin: .5em;
    width: 50%;

    @media (min-width: 800px){
        font-size: 17px;
    }
`

const ProductText = styled.p`
    line-height: 2em;
    width: 100%;

    @media (min-width: 800px){
        font-size: 16px;
    }
    margin-bottom: 10vw;
`

const Button = styled.a`
    text-decoration: none;
    color: white;
    background-color: blue;
    /*padding: .1em 4em .1em 4em;*/
    border-radius: 10px;
    width: 45%;
    min-width: 10em;
    height: 2.5em;
    margin: 3em;
`

const ButtonContent = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-radius: 10px;
    height: 2.5em;
`

const Icon = styled.img`
    max-width: 25px;
    max-height: 25px;
    padding: .6em;
`

const ButtonText = styled.p`
    text-align: center;
    width: 100%;
    font-weight: bold;
`

const ProductView = ({ match, productsData }) => {

    const [isDesktop, setIsDesktop] = React.useState(false)

    React.useEffect(() => {
      updatePredicate();
      window.addEventListener('resize', () => updatePredicate());
    
      // returned function will be called on component unmount 
      return () => {
        window.removeEventListener('resize', () => updatePredicate())
      }
    }, [])
  
    const updatePredicate = () => {
      setIsDesktop(window.innerWidth > 580)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const category_names_de = [
        "Kategorie",
        "Oberflächenart",
        "Verwendung",
        "Standzeit",
        "Glanzgrad",
        "Bindemittel",
        "Löslichkeit",
        "Farbtöne",
        "Preis pro qm"
    ]

    if (!productsData){
        return null;
    }
    else {
        const { params: { productId } } = match;
        const { products, categories, surfaces, applications, binders, solubilities } = {...productsData}
        const product = products[productId-1]
        const { category, surface, application, lifetime, lifetime_unit, gloss_level, binder, solubility, link, datasheet_link, images, info_text, hue } = {...product}

        console.log(datasheet_link)

        return (
            <Wrapper>
                <Header>
                    <NavigateButton
                        location={"/products"} 
                        text={"Zurück"} 
                        direction={"left"} 
                    />
                    {isDesktop && <Title className={"title"}>{product["name"]}</Title>}
                    <div style={{visibility: 'hidden'}}>
                        <NavigateButton
                            location={"/products"} 
                            text={"Zurück"} 
                            direction={"left"}                                       
                        />
                    </div>
                </Header>
                <MainWrapper>
                    <ImageWrapper>
                        <ProductImage src={images[0]}/>
                        <Button target="_blank" and rel="noopener noreferrer" href={link !== "" ? link : "https://www.schwedischer-farbenhandel.de/"}>
                            <ButtonContent>
                                <Icon style={{visibility: "hidden"}} src='/assets/icons/misc/bag.png'></Icon>
                                <ButtonText>Kaufen</ButtonText>
                                <Icon src='/assets/icons/misc/bag.png'></Icon>
                            </ButtonContent>
                        </Button>
                        <Button className='hoverButton' style={{backgroundColor: "white", border:  "2px solid black", minWidth: "200px", "marginTop": "-20px"}} target="_blank" and rel="noopener noreferrer" href={datasheet_link !== "" ? datasheet_link : "https://www.schwedischer-farbenhandel.de/"}>
                            <ButtonContent>
                                <ButtonText style={{color: "black"}}>Datenblatt</ButtonText>
                            </ButtonContent>
                        </Button>
                        <Button className='hoverButton' style={{backgroundColor: "white", border:  "2px solid black", minWidth: "200px", "marginTop": "-20px"}} target="_blank" and rel="noopener noreferrer" href="https://animation.schwedischer-farbenhandel.de/index.html">
                            <ButtonContent>
                                <ButtonText style={{color: "black"}}>Zum Farbkonfigurator</ButtonText>
                            </ButtonContent>
                        </Button>
                    </ImageWrapper>
                    <ContentWrapper>
                        {!isDesktop && <Title className={"title"}>{product["name"]}</Title>}
                        <SubTitle>Produktdetails</SubTitle>
                        <PropsWrapper>
                            <PropsRow>
                                <PropsValue style={{fontWeight: "bold"}}>{category_names_de[0]}</PropsValue>
                                <PropsValue>{categories[category]}</PropsValue>
                            </PropsRow>
                            <PropsRow>
                                <PropsValue style={{fontWeight: "bold"}}>{category_names_de[1]}</PropsValue>
                                <PropsValue>{surface.map(item => surfaces[item]).join(", ")}</PropsValue>
                            </PropsRow>
                            <PropsRow>
                                <PropsValue style={{fontWeight: "bold"}}>{category_names_de[2]}</PropsValue>
                                <PropsValue>{application.map(item => applications[item]).join(", ")}</PropsValue>
                            </PropsRow>
                            <PropsRow>
                                <PropsValue style={{fontWeight: "bold"}}>{category_names_de[3]}</PropsValue>
                                <PropsValue>{lifetime[0]} - {lifetime[1]} {lifetime_unit}</PropsValue>
                            </PropsRow>
                            <PropsRow>
                                <PropsValue style={{fontWeight: "bold"}}>{category_names_de[4]}</PropsValue>
                                {
                                    gloss_level.length > 1 ?
                                        <PropsValue>{gloss_level[0]} - {gloss_level[1]}</PropsValue>
                                    : <PropsValue>{gloss_level}</PropsValue>
                                }
                            </PropsRow>
                            <PropsRow>
                                <PropsValue style={{fontWeight: "bold"}}>{category_names_de[5]}</PropsValue>
                                <PropsValue>{binders[binder]}</PropsValue>
                            </PropsRow>
                            <PropsRow>
                                <PropsValue style={{fontWeight: "bold"}}>{category_names_de[6]}</PropsValue>
                                <PropsValue>{solubilities[solubility]}</PropsValue>
                            </PropsRow>
                            {/*<PropsRow>
                                <PropsValue style={{fontWeight: "bold"}}>{category_names_de[7]}</PropsValue>
                                <PropsValue>{`${price[0].toString().replace('.', ',')}€ - ${price[1].toString().replace('.', ',')}€`}</PropsValue>
                            </PropsRow>*/}
                            <PropsRow>
                                <PropsValue style={{fontWeight: "bold"}}>{category_names_de[7]}</PropsValue>
                                <PropsValue>{hue}</PropsValue>
                            </PropsRow>
                        </PropsWrapper>
                        <SubTitle>Produkteigenschaften</SubTitle>
                        <ProductText>{info_text}</ProductText>
                    </ContentWrapper>
                </MainWrapper>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({ products }) => {
    if (products){
        return {
            productsData: products
        }
    }
    else {
        return {
            res: null
        }
    }
}

export default connect(mapStateToProps, null)(ProductView)