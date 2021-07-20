import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import NavigateButton from '../../Shared/NavigateButton'
import './productview.css'
import SubHeader from '../../Shared/SubHeader'

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
        width: 80%;
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
    width: 30%;
    padding: 1em;
    display: flex;
    justify-content: flex-start;

    position: sticky;
    top: 8em;

    @media (max-width: 1000px){
        position: inherit;
        justify-content: center;
    }
`

const ProductImage = styled.img`
    min-width: 120px;
    width: 100%;
    max-width: 300px;

    @media (max-width: 1000px){
        
    }
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media (min-width: 700px){
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
        "Verbrauch"
    ]

    if (!productsData){
        return null;
    }
    else {
        const { params: { productId } } = match;
        const { products, categories, surfaces, applications, binders, solubilities } = {...productsData}
        const product = products[productId-1]
        const { category, surface, application, efficiency, lifetime, gloss_level, binder, solubility } = {...product}
        
        return (
            <Wrapper>
                {/*<SubHeader location={"/products"} title={product["name"]}/>*/}
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
                        <ProductImage src="/assets/images/farbeimer.jpg"/>
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
                                <PropsValue>{lifetime[0]} - {lifetime[1]} Jahre</PropsValue>
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
                            <PropsRow>
                                <PropsValue style={{fontWeight: "bold"}}>{category_names_de[7]}</PropsValue>
                                <PropsValue>{categories[category]}</PropsValue>
                            </PropsRow>
                        </PropsWrapper>
                        <SubTitle>Produkteigenschaften</SubTitle>
                        <ProductText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis orci a scelerisque purus. Nam libero justo laoreet sit amet cursus sit amet. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Iaculis eu non diam phasellus vestibulum lorem. Rhoncus aenean vel elit scelerisque. Scelerisque varius morbi enim nunc. Egestas integer eget aliquet nibh praesent tristique magna. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Dolor sit amet consectetur adipiscing elit pellentesque. Felis bibendum ut tristique et. Ultricies mi eget mauris pharetra et ultrices neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nulla pharetra diam sit amet nisl. Feugiat in fermentum posuere urna nec tincidunt. Tortor at auctor urna nunc id cursus. Sed risus pretium quam vulputate dignissim suspendisse in est. Quisque sagittis purus sit amet volutpat consequat mauris. Sodales ut eu sem integer vitae. Et tortor at risus viverra adipiscing at in. Dignissim diam quis enim lobortis scelerisque fermentum. Lacinia quis vel eros donec ac odio. In vitae turpis massa sed. Neque sodales ut etiam sit amet. Eu scelerisque felis imperdiet proin fermentum leo. Scelerisque eu ultrices vitae auctor eu augue ut lectus. Tortor vitae purus faucibus ornare.</ProductText>
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