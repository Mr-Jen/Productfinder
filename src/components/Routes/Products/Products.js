import React, {useState} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import './Products.css'
import Product from './Product'
import CompareStatusBar from '../../Shared/CompareStatusBar'
import Title from '../../Shared/Title'
import NavigateButton from '../../Shared/NavigateButton'
import Filters from './Filters/Filters'
import { loadFilters } from '../../../actions/filter'

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

const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 80vw;
  margin-bottom: 10vh;

  @media (max-width: 810px){
    width: 90vw;
  }
  @media (max-width: 400px){
    width: 80vw;
  }
`

const WarningBox = styled.p`
  border: 1px solid grey;
  color: #5a5a5a;
  border-radius: .5em;
  padding: 1em;
  background-color: #ececec;
  width: 60%;
  line-height: 25px;
  @media (max-width: 580px){
    width: 80%;
  }
`

const Count = styled.p`
  font-weight: bold;
  background-color: #FFE60A;
  padding: .5em;
`

const Products = ({ target, coating, roughness, woodtype, initFilters, filteredSurfaces, filteredApplications }) => {
  const [initData, setInitData] = useState(null);
  const [sortBy, setSortBy] = useState();
  const [compareProducts, setCompareProducts] = useState([]);
  const [glossValues, setGlossValues] = useState([]);
  const compareLength = 2;

  React.useEffect(() => {
    !initData &&
    fetch('api/data.json')
      .then(res => res.json())
      .then(config => {
        setInitData(config)
      })  
  })

  React.useEffect(() => {
    //(initData !== undefined && initData) && console.log("SURFACE LENGTH: ", Object.keys(initData.surfaces).length, "APPLICATION LENGTH: ", Object.keys(initData.applications).length)
    const initSurfaces = (initData !== undefined && initData) && new Array(Object.keys(initData.surfaces).length).fill(false);
    const initApplications = (initData !== undefined && initData) && new Array(Object.keys(initData.applications).length).fill(false);

    initFilters({
      "surfaces": initSurfaces,
      "applications": initApplications
    })

  }, [initData])

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

  /*onst calculateVolume = (efficiency) => {
    let eSmoothMin = efficiency["smooth_surface"][0]
    let eRoughMin = efficiency["rough_surface"][0]
    let eSmoothMax = efficiency["smooth_surface"][1]
    let eRoughMax = efficiency["rough_surface"][1]

    let vSmoothMin = Math.ceil((inputArea / eSmoothMin) * 100) / 100
    let vRoughMin = Math.ceil((inputArea / eRoughMin) * 100) / 100

    let vSmoothMax = Math.ceil((inputArea / eSmoothMax) * 100) / 100
    let vRoughMax = Math.ceil((inputArea / eRoughMax) * 100) / 100

    return [vSmoothMin, vRoughMin, vSmoothMax, vRoughMax]
  }*/

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
      .filter((value, key) => value[1].category.includes(target))
      .filter((value, key) => ((value[1].name === "Schlammfarbe" && roughness !== 1) || value[1].name !== "Schlammfarbe"))
      .filter((value, key) => (value[1].allowed_on_hardwood && woodtype !== 0) || woodtype === 0);

    const filteredProducts_2 = filteredProducts.filter((value, key) => coating ? (checkCoatingCompability(value[1].allowed_coatings, coating) && value) : value)

    const new_products = Object.fromEntries(coating.length === 1 && coating[0] === null ? filteredProducts : filteredProducts_2)
    products = new_products
  }


  if (filteredSurfaces && filteredApplications){
    let input_res = filteredSurfaces && filteredSurfaces
      .map((elem, key) => elem === true ? key : null)
      .filter(elem => elem !== null)

    let application_res = filteredApplications && filteredApplications
      .map((elem, key) => elem === true ? key : null)
      .filter(elem => elem !== null)

    var filteredObjectKeys = initData && Object.keys(products)
      .filter(objectKey => input_res.every(elem => products[objectKey]["surface"].includes(elem)))
      .filter(objectKey => application_res.every(elem => products[objectKey]["application"].includes(elem)))
      .filter(objectKey => products[objectKey]["gloss_level"][0] >= glossValues[0] && products[objectKey]["gloss_level"][1] <= glossValues[1])
  }
  else {
    filteredObjectKeys = initData && Object.keys(products)
  }
      
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
      //console.log("DEFAULT")
    }

  const handleChangeSort = (e) => {
    setSortBy(e) 
  }

  const handleOnSlide = (values) => {
    setGlossValues(values)
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
      
      <Filters 
        handleChangeSort={(e) => handleChangeSort(e)} 
        handleOnSlide={(values) => handleOnSlide(values)}
      />

      <WarningBox>Achtung! Beachten Sie immer die Herstellerangaben zu den Grundierungen in den jeweiligen Datenblättern. Insebsondere auf unbehandeltem/abgeschliffenem Holz muss fast immer grundiert werden. Ohne richtige Grundierung (falls notwendig) wird der Anstrich nicht halten</WarningBox>

      <Count style={{margin: '1em'}}>{filteredObjectKeys?.length} {`${filteredObjectKeys?.length !== 1 ? "Produkte" : "Produkt"}`} gefunden</Count>

      { !products ? <p>Loading ...</p> :
        <ProductsWrapper>
          {
            products && filteredObjectKeys.map((objectKey, key) => {

              let product = products[objectKey]
              let { id, category, surface, application, lifetime, gloss_level, binder, solubility, images } = product
              let category_value = categories[category[0]]
              let surface_value = surface.map((key) => surfaces[key])
              let application_value = application.map((key) => applications[key])
              let binder_value = binders[binder]
              let solubility_value = solubilities[solubility]

              //let volume = calculateVolume(product["efficiency"])

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
                images={images}
              />
            })
          }
        </ProductsWrapper>
      }
      {compareProducts.length > 0 && <CompareStatusBar compareLength={compareLength} compareList={compareProducts} resetCompare={() => onResetCompare()} />}
    </Wrapper>
  )
}

const mapStateToProps = ({ user, filter }) => {
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
    coating,
    roughness: user["roughness"],
    woodtype: user["woodtype"],
    filteredSurfaces: filter["surfaces"],
    filteredApplications: filter["applications"]
  }
}

const mapDispatchToProps = dispatch => ({
  initFilters : initConfig => dispatch(loadFilters(initConfig))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)

