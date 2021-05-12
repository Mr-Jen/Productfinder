import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const TopWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Wrapper = styled.div`
    display: flex;
`

const ImageWrapper = styled.div`
    height: 400px;
    width: 400px;
    border: 1px solid black;
`

const ContentWrapper = styled.div``

const ProductView = ({ match, products }) => {
    const { params: { productId } } = match;
    const product = products[productId-1]

    return (
        <TopWrapper>
            <h2>{product["name"]}</h2>
            <Wrapper>
                <ImageWrapper>

                </ImageWrapper>
                <ContentWrapper>
                    <p>
                        <strong>User ID: </strong>
                        {product["id"]}
                    </p>
                    <p>
                        <strong>User Name: </strong>
                        {product["name"]}
                    </p>
                </ContentWrapper>
            </Wrapper>
        </TopWrapper>
    )
}

const mapStateToProps = ({products}) => {
    return {
        products
    }
}

export default connect(mapStateToProps, null)(ProductView)