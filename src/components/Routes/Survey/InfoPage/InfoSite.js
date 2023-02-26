import React from 'react'

import "./InfoSite.css";

const InfoSite = () => {
  return (
    <div className='outer-wrapper'>
      <p className='info-text'>Welche Anstricharten gibt es? Die meisten Anstricharten fallen in eine der nachfolgenden Kategorien. Wenn Sie sich nicht sicher sind um was es sich genau handelt, wenden Sie sich gerne per Email oder telefonisch an uns: Email: info@schwedischer-farbenhandel.de Telefon: +49 (0) 40 54 80 12 20</p>
      <div className="container">
      <h2 className="heading-text">Bildergalerie</h2>
      <div className="image-gallery">
        <div className="column">
          <div className="image-item">
            <img src="assets/images/Farbe/deckende-farbe-intakt_keine_maserung.jpg" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Anderes/glatt.jpg" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Farbe/deckende-farbe-intakt_keine_maserung.jpg" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
        </div>
        <div className="column">
          <div className="image-item">
            <img src="assets/images/Anderes/sägerau.jpg" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Farbe/deckende-farbe-intakt_keine_maserung.jpg" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Farbe/deckende-farbe-intakt_keine_maserung.jpg" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
        </div>
        <div className="column">
          <div className="image-item">
            <img src="assets/images/Anderes/glatt.jpg" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Anderes/sägerau.jpg" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Öl/holzöl.jpg" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default InfoSite;
