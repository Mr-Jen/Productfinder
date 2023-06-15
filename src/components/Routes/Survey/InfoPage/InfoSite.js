import React from 'react'

import "./InfoSite.css";

const InfoSite = () => {
  return (
    <div className='outer-wrapper'>
      <div className='outer-text-wrapper'>
        <div className='text-wrapper'>
          <p className='info-text'>Welche Anstricharten gibt es? Die meisten Anstricharten fallen in eine der nachfolgenden Kategorien:</p>
          <ul className='ulist'>
            <li className='sub-text'>Öl- und/oder alkydharzhaltig</li>
            <li className='sub-text'>Acryl- oder acrylathaltig</li>
            <li className='sub-text'>Hybridfarben mit beiderlei Bindemitteln (Acryl/Acrylat und Öl/Alkydharz)</li>
          </ul>
          <p className='info-text'>Es ist quasi wie beim Auto:</p>
          <ul className='ulist'>
            <li className='sub-text'>Benziner</li>
            <li className='sub-text'>Diesel</li>
            <li className='sub-text'>Elektrisch</li>
            <li className='sub-text'>Wasserstoff</li>
            <li className='sub-text'>Hybrid</li>
          </ul>
          <p className='info-text'>
            Dabei legt man sich anfangs fest, wie das Auto künftig betrieben wird. Bei Farbe & Lasur ist es ähnlich:
            Pauschal irgendwas an Farbe/Lasur auf etwas anderes an Farbe/Lasur zu streichen, ohne die <a target='_blank' href="https://schwedischer-farbenhandel.de/stichwortsuche#bindemittel">Bindemittel</a> des Voranstrichs zu kennen, führt zu ähnlichen Problemen wie das falsche Betanken beim Auto.
            Sollten Sie einen Altanstrich haben, der intakt und somit direkt überstrichen werden kann, Ihnen jedoch nicht bekannt ist, welche Bindemittel enthalten sind, dann können Sie das ganz einfach ermitteln. Dieses beschreiben wir in unserer Stichwortsuche: <br />
            <a target='_blank' href="https://schwedischer-farbenhandel.de/stichwortsuche#bindemitteltest">https://schwedischer-farbenhandel.de/stichwortsuche#bindemitteltest</a> 
          </p>
        </div>
      </div>
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
