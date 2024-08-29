import React from 'react'

import "./InfoSite.css";

const InfoSite = () => {
  return (
    <div className='outer-wrapper'>
      <div className='outer-text-wrapper'>
        <div className='text-wrapper'>
          <p className='info-text'>
            Holzoberflächen können unbehandelt mit farblosen, lasierten oder deckenden Anstrichen versehen sein. Jede Art, egal ob unbehandel oder bestrichen, ist von Relevanz für den nächsten Anstrich. Wenn Holz bereits gestrichen wurde, kommt es auf die Art des Anstrichs und dessen Zustand an. 
          </p>
          <p className='info-text bold'>Welche Anstricharten gibt es? Die meisten Anstricharten fallen in eine der nachfolgenden Kategorien:</p>
          <p className='bold'>Ob Farbe, Lack, Lasur - egal ob Holz, Putz oder Metall: alle Anstricharten enthalten Bindemittel, die am Ende den Schutzfilm auf der Oberfläche darstellen. Zunächst flüssig im Topf, nach dem Anstrich und der Trocknung fest und schützend auf der Oberfläche. Die einzelnen Anstricharten sind dann </p>
          <ul className='ulist'>
            <li className='sub-text'>Öl- und/oder alkydharzhaltig</li>
            <li className='sub-text'>Acryl- oder acrylathaltig</li>
            <p className='sub-text or'>oder</p>
            <li className='sub-text'>Hybridfarben mit beiderlei Bindemitteln (Acryl/Acrylat und Öl/Alkydharz)</li>
          </ul>
          <p className='info-text bold'>Diese Bindemittel sind sehr unterschiedlich und vertragen sich miteinander nur sehr bedingt. Es ist quasi wie beim Auto und dessen Treibstoff:</p>
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
          <p>Wenn Sie sich nicht sicher sind um was es sich genau handelt, wenden Sie sich gerne per Email oder telefonisch an uns:</p> 
          <br/>
          <b>Email: </b><a href='mailto:info@schwedischer-farbenhandel.de'>info@schwedischer-farbenhandel.de</a>
          <br/>
          <b>Telefonnummer:</b> +49 (0)40 54 80 12 20
        </div>
      </div>
      <div className="container">
      <h2 className="heading-text">Bildergalerie</h2>
      <div className="image-gallery">
        <div className="column">
          <div className="image-item">
            <img src="assets/images/Farbe/deckende-farbe-intakt_keine_maserung.jpg" alt="Haus mit deckender Farbe" />
            <div className="overlay"><span>Haus mit deckender Farbe</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Anderes/glatt.jpg" alt="Glattes Holz" />
            <div className="overlay"><span>Glattes Holz</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Holz/hartholz/hartholz-1.PNG" alt="Hartholz" />
            <div className="overlay"><span>Hartholz</span></div>
          </div>
        </div>
        <div className="column">
          <div className="image-item">
            <img src="assets/images/Anderes/sägerau.jpg" alt="Sägeraues Holz" />
            <div className="overlay"><span>Sägeraues Holz</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Holz/weichholz/weichholz-2.PNG" alt="Weichholz" />
            <div className="overlay"><span>Weichholz</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Holz/weichholz/weichholz-1.PNG" alt="Weichholz" />
            <div className="overlay"><span>Weichholz 2</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Impraegnierung/intakt-3.png" alt="Intake Imprägnierung" />
            <div className="overlay"><span>Intake Imprägnierung</span></div>
          </div>
        </div>
        <div className="column">
          <div className="image-item">
            <img src="assets/images/Lasur/lasur-intakt_glanz.jpg" alt="Intakte Lasur" />
            <div className="overlay"><span>Intakte Lasur</span></div>
          </div>
          <div className="image-item">
            <img src="assets/images/Lasur/lasur-verwittert_maserung_sichtbar.jpg" alt="Verwitterte Lasur" />
            <div className="overlay"><span>Verwitterte Lasur</span></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default InfoSite;
