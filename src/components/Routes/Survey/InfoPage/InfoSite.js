import React from 'react'

import "./InfoSite.css";

const InfoSite = () => {
  return (
    <div className="container">
      <h2 className="heading-text">Bildergallerie</h2>
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
  )
}

export default InfoSite;
