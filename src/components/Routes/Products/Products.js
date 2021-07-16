import React, {useState} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import './Products.css'
import Product from './Product'
import CompareStatusBar from '../../Shared/CompareStatusBar'
import Title from '../../Shared/Title'
import NavigateButton from '../../Shared/NavigateButton'
import Select from './Select'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /*z-index: -100;*/
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  /*@media (max-width: 340px) {
    width: 100vw;
  }*/
`

const Input = styled.input`
  margin: 10px;
`

const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 80vw;
  margin-bottom: 10vh;
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

const DropDownWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin-bottom: 40px;
  margin-top: 2em;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 805px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 150px;
  }
`

const FilterDropDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 100;
`

const FilterDropDown = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;

  border: 3px solid #FFE60A;
  border-radius: 5px;
  width: 140px;
  height: 40px;
  background-color: white;
`

const PlaceHolderRect = styled.div`
  width: 134px;
  height: 20px;
  background-color: white;
  margin-top: 33px;
  border-left: 3px solid #FFE60A;
  border-right: 3px solid #FFE60A;
  border-bottom: none;
  position: absolute;
  z-index: 50;
`

const SurfaceBgRect = styled.div`
  width: 200px;
  height: 120px;
  background-color: white;
  border: 3px solid #FFE60A;
  border-radius: 0 5px 5px 5px;

  display: flex;
  flex-direction: column;
  flex-grow: grow;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  position: absolute;
  margin-top: 50px;
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

const ResetDropDownButton = styled.button`
  width: 90%;
  align-self: center;
  margin: 10px 0 10px 0;
`


const Products = ({ target, coating }) => {
  const [initData, setInitData] = useState(null);
  const [inputArea, setInputArea] = useState("");
  const [inputSurface, setInputSurface] = useState([false, false, false, false])
  const [inputApplication, setInputApplication] = useState([false, false, false, false, false, false])
  const [sortBy, setSortBy] = useState();
  const [dropdownElement, setDropDownElement] = useState();
  const [compareProducts, setCompareProducts] = useState([]);
  const compareLength = 2;

  React.useEffect(() => {
    !initData &&
    fetch('api/data.json')
      .then(res => res.json())
      .then(config => {
        setInitData(config)
      })  
  })

  const onChangeCompare = (pos) => {
    let newCompare = [...compareProducts]
    if(compareProducts.includes(pos)){
      if (compareProducts.indexOf(pos) > -1){
        newCompare.splice(compareProducts.indexOf(pos), 1)
        setCompareProducts(newCompare)
      }
    }
    else {
      if(compareProducts.length < compareLength){
        setCompareProducts([...compareProducts, pos])
      }
      else {
        newCompare.shift()
        newCompare.push(pos)
        setCompareProducts(newCompare)
      }
    }
  }

  const onResetCompare = () => {
    setCompareProducts([])
  }

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

  let { products, categories, surfaces, applications, binders, solubilities } = {...data}

  const checkCoatingCompability = (allowed_coatings, user_coating) => {
    let compatible = true;
    user_coating.map((coating) => {
      if (!(allowed_coatings.includes(coating))){
        compatible = false;
      }
    })

    return compatible;
  }

  if (products && target !== undefined){
    const productList = Object.entries(products);
    const filteredProducts = productList
      .filter((value, key) => value[1].category === target)

    const filteredProducts_2 = filteredProducts.filter((value, key) => coating ? (checkCoatingCompability(value[1].allowed_coatings, coating) && value) : value)

    const new_products = Object.fromEntries(coating.length === 1 && coating[0] === null ? filteredProducts : filteredProducts_2)
    products = new_products
  }


  let input_res = inputSurface
    .map((elem, key) => elem === true ? key : null)
    .filter(elem => elem !== null)

  let application_res = inputApplication
    .map((elem, key) => elem === true ? key : null)
    .filter(elem => elem !== null)

  var filteredObjectKeys = initData && Object.keys(products)
    .filter(objectKey => input_res.every(elem => products[objectKey]["surface"].includes(elem)))
    .filter(objectKey => application_res.every(elem => products[objectKey]["application"].includes(elem)))
      
  switch(sortBy){
    case "gloss_low":
      filteredObjectKeys.sort((a, b) => parseFloat((products[a].gloss_level[0] + products[a].gloss_level[1]) / 2) - parseFloat((products[b].gloss_level[0] + products[b].gloss_level[1]) / 2));
      break;
    case "gloss_high":
      filteredObjectKeys.sort((a, b) => {
        return parseFloat((products[b].gloss_level[0] + products[b].gloss_level[1]) / 2) - parseFloat((products[a].gloss_level[0] + products[a].gloss_level[1]) / 2)
      })      
      break;
    case "lifetime_high":      
      filteredObjectKeys.sort((a, b) => {
        return parseFloat((products[b].lifetime[0] + products[b].lifetime[1]) / 2) - parseFloat((products[a].lifetime[0] + products[a].lifetime[1]) / 2)
      })      
      break;
    case "lifetime_low":      
      filteredObjectKeys.sort((a, b) => {
        return parseFloat((products[a].lifetime[0] + products[a].lifetime[1]) / 2) - parseFloat((products[b].lifetime[0] + products[b].lifetime[1]) / 2)
      })      
      break;
    default:
      console.log("DEFAULT")
    }

  const handleChangeSort = (e) => {
    setSortBy(e) 
  }


  return (
    <Wrapper>
      <Header>
          <NavigateButton
            location={"/fragen-und-antworten"} 
            text={"Zurück"} 
            direction={"left"} 
          />
        <Title contentText={"Ihre Produkte"}/>
        <div style={{visibility: 'hidden'}}>
          <NavigateButton
              location={"/fragen-und-antworten"} 
              text={"Zurück"} 
              direction={"left"}
          />
        </div>
      </Header>
      <DropDownWrapper>
        <FilterDropDownWrapper>
          <FilterDropDown onClick={() => setDropDownElement(dropdownElement === 0 ? null : 0)}>
            <strong>Untergrund</strong>
            <img alt="dropdown-arrow" style={{transform: dropdownElement === 0 && `rotate(180deg)`}} height="10" src="assets/icons/misc/dropdown-arrow.svg"></img>
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
            <img alt="dropdown-arrow" style={{transform: dropdownElement === 1 && `rotate(180deg)`}} height="10" src="assets/icons/misc/dropdown-arrow.svg"></img>
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

        <Select handleChangeSort={(e) => handleChangeSort(e)}/>
      </DropDownWrapper>

      { !products ? <p>Loading ...</p> :
        <ProductsWrapper>
          {
            products && filteredObjectKeys.map((objectKey, key) => {

              let product = products[objectKey]
              let { id, category, surface, application, lifetime, gloss_level, binder, solubility } = product
              let category_value = categories[category]
              let surface_value = surface.map((key) => surfaces[key])
              let application_value = application.map((key) => applications[key])
              let binder_value = binders[binder]
              let solubility_value = solubilities[solubility]

              let volume = calculateVolume(product["efficiency"])

              return <Product key={key}
                title={product["name"]}
                category={category_value}
                surface={surface_value.join(', ')}
                application={application_value.join(', ')}
                lifetime={lifetime}
                gloss_level={gloss_level}
                binder={binder_value}
                solubility={solubility_value}
                id={id}
                isChecked={compareProducts.includes(id)}
                onChange={(id) => onChangeCompare(id)}
              />
            })
          }
        </ProductsWrapper>
      }
      {compareProducts.length > 0 && <CompareStatusBar compareLength={compareLength} compareList={compareProducts} resetCompare={() => onResetCompare()} />}
    </Wrapper>
  )
}

const mapStateToProps = ({ user }) => {
  let target;
  let coating = user["coating"]
  if (user["target"] === 'Lasur'){
    target = 1;
  }
  else if (user["target"] === 'Farbe'){
    target = 0;
  }
  else if (user["target"] === 'Öl'){
    target = 2;
  }
  return {
    target,
    coating
  }
}

export default connect(mapStateToProps, null)(Products)

