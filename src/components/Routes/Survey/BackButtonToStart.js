import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  height: 2em;
  border-radius: .3em;
  border: 1px solid black;
  padding: 1em;
  color: white;
  background-color: black;
  cursor: pointer;
  &:hover {
      background-color: #696969;
  }

  /*position: fixed;*/
  */bottom: 5vh;*/
`

const Icon = styled.img`
    height: 1.5em;
`

const Text = styled.p`
    font-weight: bold;
    padding: .5em;
`

const BackButtonToStart = () => {
    return (
        <Wrapper>
            <Link style={{ textDecoration: 'none' }} to="/">
            <Button>
                <Icon src="assets/icons/misc/back.png"/>
                <Text>Zurück zum Start</Text>
            </Button>
            </Link>
        </Wrapper>
    )
}

export default connect()(BackButtonToStart)
