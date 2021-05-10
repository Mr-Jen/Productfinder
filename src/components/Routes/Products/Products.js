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

const CheckBoxesContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const DropDownWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 70%;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: space-around;
`

const FilterDropDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterDropDown = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;

  border: 1px solid black;
  border-radius: 5px;
  width: 140px;
  height: 40px;
  background-color: #FFE60A;
`

const PlaceHolderRect = styled.div`
  width: 138px;
  height: 20px;
  background-color: #FFE60A;
  margin-top: -10px;
  border-left: 1px solid black;
  border-right: 1px solid black;
`

const SurfaceBgRect = styled.div`
  width: 200px;
  height: 120px;
  background-color: #FFE60A;
  border: 1px solid black;
  border-radius: 0 5px 5px 5px;

  display: flex;
  flex-direction: column;
  flex-grow: grow;
  justify-content: space-between;
  padding: 0 20px 0 20px;
`

const ApplicationBgRect = styled.div`
  min-width: 500px;
  height: 130px;
  background-color: #FFE60A;
  border: 1px solid black;
  border-radius: 0 5px 5px 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px 0 20px
`

const SliderBgRect = styled.div`
  min-width: 300;
  height: 100px;
  border: 1px solid black;
  border-radius: 0 5px 5px 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 20px 0 20px
`

const StarWrapper = styled.div`
  display: flex;
`

const ResetDropDownButton = styled.button`
  width: 90%;
  align-self: center;
  margin: 10px 0 10px 0;
`


const Products = () => {
  const [initData, setInitData] = useState(null);
  const [inputArea, setInputArea] = useState("");
  const [inputSurface, setInputSurface] = useState([false, false, false, false])
  const [inputApplication, setInputApplication] = useState([false, false, false, false, false, false])
  const [inputGlossLevel, setInputGlossLevel] = useState([0, 100])
  const [inputLifetime, setInputLifetime] = useState([0, 25])
  const [dropdownElement, setDropDownElement] = useState();
  const [ecoRating, setEcoRating] = useState(0);

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
      <h1>Ihre Produkte</h1>
      <InputWrapper>
        <Input 
          placeholder="Flächengröße (in qm) hier"
          value={inputArea}
          onChange={(e) => onChangeInput(e)}
          type="number"
          min="0"
        />
      </InputWrapper>

      <DropDownWrapper>
        <FilterDropDownWrapper>
          <FilterDropDown onClick={() => setDropDownElement(dropdownElement === 0 ? null : 0)}>
            <strong>Untergrund</strong>
            <img style={{transform: dropdownElement === 0 && `rotate(180deg)`}} height="10" src="assets/icons/misc/dropdown-arrow.svg"></img>
          </FilterDropDown>
          {dropdownElement === 0 && <PlaceHolderRect/>}
          {dropdownElement === 0 &&
            <SurfaceBgRect>
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
              <ResetDropDownButton onClick={() => setInputSurface([false, false, false, false])}>Zurücksetzen</ResetDropDownButton>
            </SurfaceBgRect>
          }
        </FilterDropDownWrapper>

        <FilterDropDownWrapper>
          <FilterDropDown onClick={() => setDropDownElement(dropdownElement === 1 ? null : 1)}>
            <strong>Verwendung</strong>
            <img style={{transform: dropdownElement === 0 && `rotate(180deg)`}} height="10" src="assets/icons/misc/dropdown-arrow.svg"></img>
          </FilterDropDown>
          {dropdownElement === 1 && <PlaceHolderRect/>}
          {dropdownElement === 1 &&
            <ApplicationBgRect>
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
              <ResetDropDownButton onClick={() => setInputApplication([false, false, false, false, false, false])}>Zurücksetzen</ResetDropDownButton>
            </ApplicationBgRect>
          }
        </FilterDropDownWrapper>

        <FilterDropDownWrapper>
          <FilterDropDown onClick={() => setDropDownElement(dropdownElement === 2 ? null : 2)}>
            <strong>Glanzgrad</strong>
            <img style={{transform: dropdownElement === 2 && `rotate(180deg)`}} height="10" src="assets/icons/misc/dropdown-arrow.svg"></img>
          </FilterDropDown>
          {dropdownElement === 2 && <PlaceHolderRect/>}
          {dropdownElement === 2 &&
            <SliderBgRect>
              <MultiRangeSlider min={0} max={100} stepRange={5} minDiff={10} onChange={(e) => setInputGlossLevel(e)}/>
              <ResetDropDownButton onClick={() => console.log("RESETTING SLIDER")}>Zurücksetzen</ResetDropDownButton>
            </SliderBgRect>
          }
        </FilterDropDownWrapper>

        <FilterDropDownWrapper>
          <FilterDropDown onClick={() => setDropDownElement(dropdownElement === 3 ? null : 3)}>
            <strong>Lebensdauer</strong>
            <img style={{transform: dropdownElement === 3 && `rotate(180deg)`}} height="10" src="assets/icons/misc/dropdown-arrow.svg"></img>
          </FilterDropDown>
          {dropdownElement === 3 && <PlaceHolderRect/>}
          {dropdownElement === 3 &&
            <SliderBgRect>
              <MultiRangeSlider min={0} max={25} stepRange={1} minDiff={1} onChange={(e) => setInputLifetime(e)}/>
              <ResetDropDownButton onClick={() => setInputLifetime([0, 25])}>Zurücksetzen</ResetDropDownButton>
            </SliderBgRect>
          }
        </FilterDropDownWrapper>

        <FilterDropDownWrapper>
          <FilterDropDown onClick={() => setDropDownElement(dropdownElement === 4 ? null : 4)}>
            <strong>Ökobilanz</strong>
            <img style={{transform: dropdownElement === 3 && `rotate(180deg)`}} height="10" src="assets/icons/misc/dropdown-arrow.svg"></img>
          </FilterDropDown>
          {dropdownElement === 4 && <PlaceHolderRect/>}
          {dropdownElement === 4 &&
            <SliderBgRect>
              <StarWrapper>

                <input onChange={(e) => setEcoRating(parseInt(e.target.id) + 1)} className="trigger" id="0" type="checkbox"/>
                <label style={{backgroundImage: `url(${ecoRating > 0 ? 'assets/icons/misc/star-filled.svg' : 'assets/icons/misc/star-outline.svg'})`}} htmlFor="0" className="checker"></label>    
                
                <input onChange={(e) => setEcoRating(parseInt(e.target.id) + 1)} className="trigger" id="1" type="checkbox"/>
                <label style={{backgroundImage: `url(${ecoRating > 1 ? 'assets/icons/misc/star-filled.svg' : 'assets/icons/misc/star-outline.svg'})`}} htmlFor="1" className="checker"></label>    
                
                <input onChange={(e) => setEcoRating(parseInt(e.target.id) + 1)} className="trigger" id="2" type="checkbox"/>
                <label style={{backgroundImage: `url(${ecoRating > 2 ? 'assets/icons/misc/star-filled.svg' : 'assets/icons/misc/star-outline.svg'})`}} htmlFor="2" className="checker"></label>    
                
                <input onChange={(e) => setEcoRating(parseInt(e.target.id) + 1)} className="trigger" id="3" type="checkbox"/>
                <label style={{backgroundImage: `url(${ecoRating > 3 ? 'assets/icons/misc/star-filled.svg' : 'assets/icons/misc/star-outline.svg'})`}} htmlFor="3" className="checker"></label>    
                
                <input onChange={(e) => setEcoRating(parseInt(e.target.id) + 1)} className="trigger" id="4" type="checkbox"/>
                <label style={{backgroundImage: `url(${ecoRating > 4 ? 'assets/icons/misc/star-filled.svg' : 'assets/icons/misc/star-outline.svg'})`}} htmlFor="4" className="checker"></label>    

              </StarWrapper>
              <ResetDropDownButton onClick={() => setEcoRating(0)}>Zurücksetzen</ResetDropDownButton>
            </SliderBgRect>
          }
        </FilterDropDownWrapper>

      </DropDownWrapper>

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

