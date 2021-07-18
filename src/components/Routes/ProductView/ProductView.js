import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Title from '../../Shared/Title'
import NavigateButton from '../../Shared/NavigateButton'

const TopWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    padding-top: 1em;
    margin-top: 1em;

    @media (max-width: 805px) {
        flex-direction: column;
        align-items: center;
    }
`

const ImageWrapper = styled.img`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    width: 40%;
    height: 20%;
    border-radius: 10px;
    @media (max-width: 805px) {
        position: relative;
    }
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
`

const ItemWrapper = styled.div`
    align-self: stretch;
`

const ContentStyleWrapper = styled.div`
    display: flex;
`

const ContentTitle = styled.h4`
    background-color: #FFE60A;
    padding: 5px;
    text-align: center;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
`

const VolumeWrapper = styled.div`
    display: flex;
`

const Volume = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
`

const ContentText = styled.p`
    word-break: break-all;
    line-height: 30px;
`


const ProductView = ({ match, productsData }) => {
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
        "Löslichkeit"
    ]

    const { params: { productId } } = match;
    const { products, categories, surfaces, applications, binders, solubilities } = {...productsData}
    const product = products[productId-1]
    const { category, surface, application, efficiency, lifetime, gloss_level, binder, solubility } = {...product}

    let columnWidth = "200px";

    return (
        <TopWrapper>
            <Header>
                <NavigateButton
                    location={"/products"} 
                    text={"Zurück"} 
                    direction={"left"} 
                />
                <Title contentText={product["name"]} />
                <div style={{visibility: 'hidden'}}>
                <NavigateButton
                    location={"/products"} 
                    text={"Zurück"} 
                    direction={"left"}
                />
                </div>
            </Header>
            <Wrapper>
                <ImageWrapper src="/assets/images/farbeimer.jpg"/>
                <ContentWrapper>
                    <ItemWrapper>
                        <ContentTitle>Produktdetails</ContentTitle>
                        <ContentStyleWrapper style={{height: "30vh"}}>
                            <Content style={{width: columnWidth}}>
                                {
                                    category_names_de.map((item, key) => {
                                        return <strong key={key}>{item}</strong>
                                    })
                                }
                            </Content>
                            <Content>
                                <strong>{categories[category]}</strong>
                                <strong>{surface.map(item => surfaces[item]).join(", ")}</strong>
                                <strong>{application.map(item => applications[item]).join(", ")}</strong>
                                <strong>{lifetime[0]} - {lifetime[1]} Jahre</strong>
                                {
                                    gloss_level.length > 1 ?
                                        <strong>{gloss_level[0]} - {gloss_level[1]}</strong>
                                    : <strong>{gloss_level}</strong>
                                }
                                <strong>{binders[binder]}</strong>
                                <strong>{solubilities[solubility]}</strong>
                            </Content>
                        </ContentStyleWrapper>
                        <ContentStyleWrapper>
                            <Content style={{width: columnWidth}}>
                                <strong>Ergiebigkeit pro Anstrich</strong>
                            </Content>
                            <Content>
                                <VolumeWrapper>
                                    <Volume>
                                        <strong>Glatte Fläche</strong>
                                        <p>{efficiency["smooth_surface"][0]} - {efficiency["smooth_surface"][1]} qm/l</p>
                                    </Volume>
                                    <Volume>
                                        <strong>Raue Fläche</strong>
                                        <p>{efficiency["rough_surface"][0]} - {efficiency["smooth_surface"][1]} qm/l</p>
                                    </Volume>
                                </VolumeWrapper>
                            </Content>
                        </ContentStyleWrapper>
                    </ItemWrapper>
                    <ItemWrapper>
                        <ContentTitle>Produktdetails</ContentTitle>
                        <ContentText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero id faucibus nisl tincidunt eget. Eget egestas purus viverra accumsan. Erat pellentesque adipiscing commodo elit at imperdiet. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. Integer vitae justo eget magna. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Ut morbi tincidunt augue interdum. Elit sed vulputate mi sit amet. Scelerisque in dictum non consectetur a. Feugiat in fermentum posuere urna nec tincidunt.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero id faucibus nisl tincidunt eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero id faucibus nisl tincidunt eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero id faucibus nisl tincidunt eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero id faucibus nisl tincidunt eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero id faucibus nisl tincidunt eget. </ContentText>
                    </ItemWrapper>
                </ContentWrapper>
            </Wrapper>
        </TopWrapper>
    )
}

const mapStateToProps = ({ products }) => {
    return {
        productsData: products
    }
}

export default connect(mapStateToProps, null)(ProductView)