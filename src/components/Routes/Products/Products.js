import React, {useState} from 'react'
import styled from 'styled-components'

import './Products.css'
import MultiRangeSlider from './Slider/MultiRangeSlider'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Input = styled.input`
  margin: 10px;
`

const SliderWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
`

const SliderContent = styled.div`
  display: flex;
  flex-direction: column;
`

const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

const Product = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 550px;
  width: 240px;
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
`

const ProductTitle = styled.h4`
  text-align: center;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: space-around;
`

const CheckBoxesSurfaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
  margin: 10px;
`

const CheckBoxesApplicationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  margin: 10px;
`

const CheckBoxesContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  outline: 1px solid grey;
  padding: 5;
`

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const VolumeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-around;
`

const Volume = styled.div`
  display: flex;
  flex-direction: column;
`

const VolumeValue = styled.p`
  margin-top: -10px;
`

const Products = () => {
  const [initData, setInitData] = useState(null);
  const [inputArea, setInputArea] = useState("");
  const [inputSurface, setInputSurface] = useState([false, false, false, false])
  const [inputApplication, setInputApplication] = useState([false, false, false, false, false, false])
  const [inputGlossLevel, setInputGlossLevel] = useState([0, 100])
  const [inputLifetime, setInputLifetime] = useState([0, 25])

  React.useEffect(() => {
    !initData &&
    fetch('api/data.json')
      .then(res => res.json())
      .then(config => {
          setInitData(config)
      })  
  })

  const onChangeInput = (e) => {
    setInputArea(e.target.value)
  }

  const onChangeSurfaceCheckBox = (index) => {
    const recentSurface = [...inputSurface]
    recentSurface[index] = recentSurface[index] ? false : true
    setInputSurface(recentSurface)
  }

  const onChangeApplicationCheckBox = (index) => {
      const recentApplication = [...inputApplication]
      recentApplication[index] = recentApplication[index] ? false : true
      setInputApplication(recentApplication);
  }

  const calculateVolume = (efficiency) => {
    let eSmoothMin = efficiency["smooth_surface"][0]
    let eRoughMin = efficiency["rough_surface"][0]
    let eSmoothMax = efficiency["smooth_surface"][1]
    let eRoughMax = efficiency["rough_surface"][1]

    let vSmoothMin = Math.ceil((inputArea / eSmoothMin) * 100) / 100
    let vRoughMin = Math.ceil((inputArea / eRoughMin) * 100) / 100

    let vSmoothMax = Math.ceil((inputArea / eSmoothMax) * 100) / 100
    let vRoughMax = Math.ceil((inputArea / eRoughMax) * 100) / 100

    return [vSmoothMin, vRoughMin, vSmoothMax, vRoughMax]
  }

  const data = initData ? initData : undefined

  const { products, categories, surfaces, applications, binders, solubilities } = {...data}

  let input_res = inputSurface
    .map((elem, key) => elem === true ? key : null)
    .filter(elem => elem !== null)

  let application_res = inputApplication
    .map((elem, key) => elem === true ? key : null)
    .filter(elem => elem !== null)

  let filteredObjectKeys = initData && Object.keys(products)
      .filter(objectKey => input_res.every(elem => products[objectKey]["surface"].includes(elem)))
      .filter(objectKey => application_res.every(elem => products[objectKey]["application"].includes(elem)))
      .filter(key => products[key]["gloss_level"][0] >= inputGlossLevel[0] && products[key]["gloss_level"][1] <= inputGlossLevel[1])
      .filter(key => products[key]["lifetime"][0] >= inputLifetime[0] && products[key]["lifetime"][1] <= inputLifetime[1])

  return (
    <Wrapper>
      <h1>Flächenberechner</h1>
      <InputWrapper>
        <Input 
          placeholder="Flächengröße (in qm) hier"
          value={inputArea}
          onChange={(e) => onChangeInput(e)}
          type="number"
          min="0"
        />
        <CheckBoxesSurfaceWrapper>
          <h3 style={{textAlign: 'center'}}>Untergrund</h3>
          <CheckBoxesContentWrapper>
            <CheckBoxWrapper>
              <p>Holz</p>
              <Input
                type="checkbox"
                onChange={() => onChangeSurfaceCheckBox(0)}
                checked={inputSurface[0]}
              />
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <p>Metall</p>
              <Input
                type="checkbox"
                onChange={() => onChangeSurfaceCheckBox(1)}
                checked={inputSurface[1]}
              />
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <p>Putz</p>
              <Input
                type="checkbox"
                onChange={() => onChangeSurfaceCheckBox(2)}
                checked={inputSurface[2]}
              />
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <p>Estrich</p>
              <Input
                type="checkbox"
                onChange={() => onChangeSurfaceCheckBox(3)}
                checked={inputSurface[3]}
              />
            </CheckBoxWrapper>
          </CheckBoxesContentWrapper>
        </CheckBoxesSurfaceWrapper>
        <CheckBoxesApplicationWrapper>
          <h3 style={{textAlign: 'center'}}>Verwendung</h3>
          <CheckBoxesContentWrapper>
            <CheckBoxWrapper>
              <p>Fassade</p>
              <Input
                type="checkbox"
                onChange={() => onChangeApplicationCheckBox(0)}
                checked={inputApplication[0]}
              />
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <p>Boden / Treppe</p>
              <Input
                type="checkbox"
                onChange={() => onChangeApplicationCheckBox(1)}
                checked={inputApplication[1]}
              />
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <p>Fenster / Tür</p>
              <Input
                type="checkbox"
                onChange={() => onChangeApplicationCheckBox(2)}
                checked={inputApplication[2]}
              />
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <p>Zaun</p>
              <Input
                type="checkbox"
                onChange={() => onChangeApplicationCheckBox(3)}
                checked={inputApplication[3]}
              />
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <p>Handlauf</p>
              <Input
                type="checkbox"
                onChange={() => onChangeApplicationCheckBox(4)}
                checked={inputApplication[4]}
              />
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <p>Dach</p>
              <Input
                type="checkbox"
                onChange={() => onChangeApplicationCheckBox(5)}
                checked={inputApplication[5]}
              />
            </CheckBoxWrapper>
          </CheckBoxesContentWrapper>
        </CheckBoxesApplicationWrapper>
        <SliderWrapper>
          <SliderContent>
            <h4>Glanzgrad</h4>
            <MultiRangeSlider min={0} max={100} stepRange={5} minDiff={10} onChange={(e) => setInputGlossLevel(e)}/>
          </SliderContent>
          <SliderContent>
            <h4>Lebensdauer</h4>
            <MultiRangeSlider min={0} max={25} stepRange={1} minDiff={1} onChange={(e) => setInputLifetime(e)}/>
          </SliderContent>
        </SliderWrapper>
      </InputWrapper>
      { !products ? <p>Loading ...</p> :
        <ProductsWrapper>
          {
            products && filteredObjectKeys
              .map((objectKey, key) => {

              let product = products[objectKey]
              let { category, surface, application, lifetime, gloss_level, binder, solubility } = product
              let category_value = categories[category]
              let surface_value = surface.map((key) => surfaces[key])
              let application_value = application.map((key) => applications[key])
              let binder_value = binders[binder]
              let solubility_value = solubilities[solubility]

              let volume = calculateVolume(product["efficiency"])


              return <Product key={key}>
                <ProductTitle>{product["name"]}</ProductTitle>
                <p>{category_value}</p>
                <p>{surface_value}</p>
                <p style={{wordWrap: "break-word"}}>{application_value}</p>
                <p>{lifetime[0]} - {lifetime[1]} Jahre</p>
                {
                  gloss_level.length > 1 ?
                    <p>{gloss_level[0]} - {gloss_level[1]}</p>
                  : <p>{gloss_level}</p>
                }
                <p>{binder_value}</p>
                <p>{solubility_value}</p>
                <VolumeWrapper>
                  <Volume>
                    <h5>Glatte Fläche: </h5>
                    <VolumeValue>Min: {volume[0]} Liter</VolumeValue>
                    <VolumeValue>Max: {volume[2]} Liter</VolumeValue>
                  </Volume>
                  <Volume>
                    <h5>Raue Fläche: </h5>
                    <VolumeValue>Min: {volume[1]} Liter</VolumeValue>
                    <VolumeValue>Max: {volume[3]} Liter</VolumeValue>
                  </Volume>
                </VolumeWrapper>
              </Product>
            })
          }
        </ProductsWrapper>
      }
    </Wrapper>
  )
}

export default Products

