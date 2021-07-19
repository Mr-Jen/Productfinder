import React, {useEffect} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import NavigateButton from '../../Shared/NavigateButton'
import Title from '../../Shared/Title'

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

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 1em;
    /*background-color: orange;*/
`

const Vl = styled.div`
    border: 1px solid lightgrey;
    /*margin: 0 10em 0 10em;*/
`

const Product = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
`

const Img = styled.div`
    display: flex;
    align-self: center;

    background-image: url("/assets/images/farbeimer.jpg"); 
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 60%;
    height: 150px;
    margin: 2em;
`

const Button = styled.a`
    text-decoration: none;
    color: white;
    background-color: blue;
    /*padding: .1em 4em .1em 4em;*/
    border-radius: 10px;
    width: 10em;
    height: 2.5em;
`
const Icon = styled.img`
    max-width: 25px;
    max-height: 25px;
    padding: .6em;
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

const ButtonText = styled.p`
    text-align: center;
    width: 100%;
`

const PropsWrapper = styled.div`
    width: 100vw;
    background-color: #F4F4F4;
    padding: 5em 0 5em 0;
    height: 80em;

    display: flex;
    justify-content: center;
`

const PropsContentWrapper = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Prop = styled.div`
    display: flex;
    flex-direction: column;
`

const PropHeader = styled.h4`
    text-align: center;
`

const PropValues = styled.div`
    display: flex;
    justify-content: space-between;
`

const PropText = styled.p`
    margin: .5em;
    text-align: center;
    width: 50%;
`

const Hr = styled.hr`
    margin-left: 0;
    margin-right: 0;
`

const ProductTitle = styled.h3`
    text-align: center;
    width: 100%;
    /*&:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -10px;
        height: 1px;
        width: 80%;
        border-bottom: 3px solid #FFE60A;
    }*/

    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10000;
`

const Compare = ({ compareProducts, categories, surfaces, applications, binders, solubilities }) => {
    const [product_1, product_2] = compareProducts

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    
    return (
        <Wrapper>
            <Header>
                <NavigateButton
                    location={"/products"} 
                    text={"Zurück"} 
                    direction={"left"} 
                />
                <Title contentText={"Produktvergleich"}/>
                <div style={{visibility: 'hidden'}}>
                    <NavigateButton
                        location={"/products"} 
                        text={"Zurück"} 
                        direction={"left"}
                    />
                </div>
            </Header>

            <ContentWrapper>
                <Product>
                    <ProductTitle>{product_1.name}</ProductTitle>
                    <Img/>
                    <Button href="https://shop.schwedischer-farbenhandel.de/kat/Aussenfarben/Fenster-Tuer/Silikonalkydfarbe-ODEN">
                        <ButtonContent>
                            <ButtonText>Kaufen</ButtonText>
                            <Icon src='/assets/icons/misc/bag.png'></Icon>
                        </ButtonContent>
                    </Button>
                </Product>
                <Vl />
                <Product>
                    <ProductTitle>{product_2.name}</ProductTitle>
                    <Img/>
                    <Button href="https://shop.schwedischer-farbenhandel.de/kat/Aussenfarben/Fenster-Tuer/Silikonalkydfarbe-ODEN">
                        <ButtonContent>
                            <ButtonText>Kaufen</ButtonText>
                            <Icon src='/assets/icons/misc/bag.png'></Icon>
                        </ButtonContent>
                    </Button>
                </Product>
            </ContentWrapper>
            <PropsWrapper>
                <PropsContentWrapper>
                    <Prop>
                        <PropHeader>Kategorie</PropHeader>
                        <Hr />
                        <PropValues>
                            <PropText>{categories[product_1.category]}</PropText>
                            <PropText>{categories[product_2.category]}</PropText>
                        </PropValues>
                    </Prop>
                    <Prop>
                        <PropHeader>Erlaubte Oberflächen</PropHeader>
                        <Hr />
                        <PropValues>
                            <PropText>{product_1.surface.map(item => surfaces[item]).join(", ")}</PropText>
                            <PropText>{product_2.surface.map(item => surfaces[item]).join(", ")}</PropText>
                        </PropValues>
                    </Prop>
                    <Prop>
                        <PropHeader>Anwendungen</PropHeader>
                        <Hr />
                        <PropValues>
                            <PropText>{product_1.application.map(item => applications[item]).join(", ")}</PropText>
                            <PropText>{product_2.application.map(item => applications[item]).join(", ")}</PropText>
                        </PropValues>
                    </Prop>
                    <Prop>
                        <PropHeader>Standzeit</PropHeader>
                        <Hr />
                        <PropValues>
                            <PropText>{product_1.lifetime[0]} - {product_1.lifetime[1]} Jahre</PropText>
                            <PropText>{product_2.lifetime[0]} - {product_2.lifetime[1]} Jahre</PropText>
                        </PropValues>
                    </Prop>
                    <Prop>
                        <PropHeader>Glanzgrad</PropHeader>
                        <Hr />
                        <PropValues>
                            {
                                product_1.gloss_level.length > 1 ?
                                    <PropText>{product_1.gloss_level[0]} - {product_1.gloss_level[1]}</PropText>
                                : <PropText>{product_1.gloss_level}</PropText>
                            }
                            {
                                product_2.gloss_level.length > 1 ?
                                    <PropText>{product_2.gloss_level[0]} - {product_2.gloss_level[1]}</PropText>
                                : <PropText>{product_2.gloss_level}</PropText>
                            }
                        </PropValues>
                    </Prop>
                    <Prop>
                        <PropHeader>Bindemittel</PropHeader>
                        <Hr />
                        <PropValues>
                            <PropText>{binders[product_1.binder]}</PropText>
                            <PropText>{binders[product_2.binder]}</PropText>
                        </PropValues>
                    </Prop>
                    <Prop>
                        <PropHeader>Lösungsmittel</PropHeader>
                        <Hr />
                        <PropValues>
                            <PropText>{solubilities[product_1.solubility]}</PropText>
                            <PropText>{solubilities[product_2.solubility]}</PropText>
                        </PropValues>
                    </Prop>
                </PropsContentWrapper>
            </PropsWrapper>
        </Wrapper>
    )
}

const mapStateToProps = ({ products }, ownProps) => {
    let data;

    console.log("DATA", data)
    const productData = products?.products ? products["products"] : data["products"]
    const { categories, surfaces, applications, binders, solubilities } = products
    const compareProducts = [];
    const params = ownProps.match.params.productsParam.split("&")

    Object.keys(productData).forEach((key, index) => {
        if(params.includes(productData[key]["id"].toString())){
            compareProducts.push(productData[key])
        }
    })

    return {
        compareProducts,
        categories,
        surfaces,
        applications,
        binders,
        solubilities
    }
}

export default connect(mapStateToProps, null)(Compare)
