import React from "react"
import "./style.css"

import logo from './images/logo.png'
import camtomsNews from './images/camtoms_news.png'
import icon_doc from './images/iconos/doc_icon.svg'
import icon_idea from './images/iconos/idea_icon.svg'
import icon_info from './images/iconos/info_icon.svg'
import icon_money from './images/iconos/money_icon.svg'
import icon_truck from './images/iconos/truck_icon.svg'
import icon_turnon from './images/iconos/turnon_icon.svg'
import icon_instagram from './images/iconos/instagram.svg'
import icon_facebook from './images/iconos/facebook.svg'
import icon_linkedin from './images/iconos/linkedin.svg'
import logo_bn from './images/logo_bn.svg'


export default function Dashboard() {
  return (
      
    <div className='html'>

    <div style={{color:'white', backgroundColor: '#005691', height:'5vh'}}>
     <a><p style={{paddingTop:'1.5vh'}}
    className="text-center linkHeader">Regístrate ahora y accede a un descuento del 15% en tu primera operación.</p></a>
    </div>

      <header className="d-flex flex-wrap align-items-center justify-content-md-between py-3 mb-4">
                <a href="A:/Codify/Camtom/index.html" className="col-5 mb-2 text-dark text-decoration-none">
                  <img id="img-logo" src={logo} alt="Camtom logo"/>
                </a>
    
              <a href='https://x93llibq6n1.typeform.com/to/AXd7xOwc'>
                    <button className="btnHeader btn btn-light position-relative start-50 translate-middle btn-type2"><b>Exporta ahora</b></button>
                    </a>

      </header>

    <body>
      <div>
        <div className="welcome-banner">
            <div className="text-banner">
                <h1 className="text-center"><b>¡Lo hacemos por ti!<br/>Logística fácil para PYMES</b></h1>
                <p className="text-center">Conectamos tu negocio con oportunidades<br/>globales. Lleva tus 
                  productos al otro lado<br/>del mundo y mete tus sueños en un<br/>contenedor.</p>
                   <a href='https://x93llibq6n1.typeform.com/to/AXd7xOwc'>
                    <button className="btn btn-light position-relative start-50 translate-middle btn-type2"><b>Exporta ahora</b></button>
                    </a>
            </div>
            <div className="banner-image">
              <br/>
            </div>
        </div>

        <div className="mision">
            <p className="text-center"><b>Nuestra <a style={{color: "#005691"}}>misión</a> es impulsar a las PyMEs
              a expandirse <a style={{color: "#005691" }}>globalmente.</a>
              Descubre el poder de llegar a <a style={{color: "#005691" }}>nuevos</a>mercados y desata
              tu potencial <a style={{color: "#005691" }}>internacional.</a></b></p>
        <br/>
        <br/>
        <br/>
       </div> 
        
       <div className="marquee-wrapper">
        <h5 className="text-center"><b> <a style={{color: "v" }}>Descubre como podemos <br/>ayudarte</a></b></h5>
        <div className="containerMarquee">
          <div className="marquee-block">
            <div className="marquee-inner to-left">
              <span>
                <div className="marquee-item">
                  <p><b>Asesoramiento en comercio exterior</b> de manera personalizada
                    para guiarte en los requisitos, 
                    regulaciones y trámites necesarios para iniciar el proceso de exportación. </p>
                </div>
                <div className="marquee-item">
                  <p><b>Identificación de mercados potenciales</b> mediante herramientas 
                    y análisis de mercado, 
                    para encontrar los aliados extranjeros más prometedores para tus productos.</p>
                </div>
                <div className="marquee-item">
                  <p><b>Gestión de transporte internacional</b> simplificando la 
                    contratación, coordinación y 
                    negociación de tarifas favorables para optimizar tus costos de envío.</p>
                </div>
              </span>
              <span>
                <div className="marquee-item">
                  <p><b>Asesoramiento en comercio exterior</b> de manera personalizada
                    para guiarte en los requisitos, 
                    regulaciones y trámites necesarios para iniciar el proceso de exportación. </p>
                </div>
                <div className="marquee-item">
                  <p><b>Identificación de mercados potenciales</b> mediante herramientas 
                    y análisis de mercado, 
                    para encontrar los aliados extranjeros más prometedores para tus productos.</p>
                </div>
                <div className="marquee-item">
                  <p><b>Gestión de transporte internacional</b>simplificando la 
                    contratación, coordinación y 
                    negociación de tarifas favorables para optimizar tus costos de envío.</p>
                </div>
              </span>
            </div>
          </div>
          <div className="marquee-block">
            <div className="marquee-inner to-right">
              <span>
                <div className="marquee-item">
                  <p>Preparación y <b>gestión de 
                    documentos aduaneros</b> necesarios para el despacho de mercancías en el país de destino.</p>
                </div>
                <div className="marquee-item">
                  <p><b>Seguimiento y trazabilidad</b> a través de nuestra plataforma digital que proporciona 
                    información en tiempo real sobre el estado y la ubicación de tus envíos.</p>
                </div>
                <div className="marquee-item">
                  <p><b>Servicio al cliente y soporte</b> en todo el proceso de exportación. 
                    Respondiendo tus consultas y resolviendo cualquier incidencia que pueda surgir.</p>
                </div>
              </span>
              <span>
                <div className="marquee-item">
                  <p>Preparación y <b>gestión de 
                    documentos aduaneros</b> necesarios para el despacho de mercancías en el país de destino.</p>
                </div>
                <div className="marquee-item">
                  <p><b>Seguimiento y trazabilidad</b> a través de nuestra plataforma digital que proporciona 
                    información en tiempo real sobre el estado y la ubicación de tus envíos.</p>
                </div>
                <div className="marquee-item">
                  <p><b>Servicio al cliente y soporte</b> en todo el proceso de exportación. 
                    Respondiendo tus consultas y resolviendo cualquier incidencia que pueda surgir.</p>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
        
        <div className="work_process">

        <aside className="work_process_description">
          <h5 className="h-workprocess"><b> <a style={{color: "#005691" }}>Como funciona Camtom</a></b></h5>
          <p>Acompañamos tu éxito desde el <b>primer contenedor.</b><br/>
            <br/>Sabemos que dar el primer paso puede ser intimidante, pero estamos aquí para guiarte en <b>cada etapa</b> del camino.</p>
            <a href='https://x93llibq6n1.typeform.com/to/AXd7xOwc'><button className="btn btn-light btn-type2"><b>Exporta ahora</b></button></a>
        </aside>  

        <div className="work_process_cardsColumn">
          <div className="work_process_cards">
            <div className="process_card container">
            <div className="row">
              <div className="col-2">
                <img className="img_card" src={icon_info} alt=""/>
              </div>
              <div className="col-10">
                <h5><b>Cuéntanos de ti</b></h5>
              </div>
            </div>
              
              <p>¡Eres único! Nos interesa y queremos brindarte un trato personalizado para ofrecerte la mejor solución.</p>
            </div>

            <div className="process_card container">
              <div className="row">
                <div className="col-2">
                  <img className="img_card" src={icon_idea} alt=""/>
                </div>
                <div className="col-10">
                  <h5><b>Habla con un experto</b></h5>
                </div>
              </div>
              <p>Nuestros expertos se contactarán contigo para conocerte mejor y planificar tu propuesta.</p>
            </div>

            <div className="process_card container">
              <div className="row">
                <div className="col-2">
                  <img className="img_card" src={icon_doc} alt=""/>
                </div>
                <div className="col-10">
                  <h5><b>Recibe una propuesta</b></h5>
                </div>
              </div>
              <p>Podrás visualizar la propuesta en nuestra plataforma. Nuestros expertos te la explicarán en detalle y estarán dispuestos a escucharte. ¡Tú tienes el control!</p>
            </div>

            <div className="process_card container">
              <div className="row">
                <div className="col-2">
                  <img className="img_card" src={icon_turnon} alt=""/>
                </div>
                <div className="col-10">
                  <h5><b>¡Manos a la obra!</b></h5>
                </div>
              </div>
              <p>Podrás seguir el proceso de tu mercancía y tu dinero. ¡Nos encanta la transparencia!</p>
            </div>

            <div className="process_card container">
              <div className="row">
                <div className="col-2">
                  <img className="img_card" src={icon_money} alt=""/>
                </div>
                <div className="col-10">
                  <h5><b>Tu dinero en la cuenta</b></h5>
                </div>
              </div>
              <p>Es mérito tuyo y de tus colaboradores. ¡Recibe la recompensa!</p>
            </div>

            <div className="process_card container">
              <div className="row">
                <div className="col-2">
                  <img className="img_card" src={icon_truck} alt=""/>
                </div>
                <div className="col-10">
                  <h5><b>Prepárate para el próximo envío</b></h5>
                </div>
              </div>
              <p>Nunca te abandonamos. Creamos relaciones a largo plazo con tus nuevos socios comerciales. Prepárate para exportar cada vez más.</p>
            </div>
           </div>
          </div>  

        </div>

        <div className="newsletterMobile container" style={{border: "4px solid #005691", margin: "2vh", width: "94vw"}}>

          <div className="row" style={{padding: "1vh",border: "4px solid #005691"}}>
            <img src={camtomsNews}/>
            <h2 style={{color: "#005691"}}>Newsletter de logística</h2>
          </div>
          <div className="row" style={{padding: "1vh", border: "4px solid #005691"}}><p>Suscríbete a nuestro newsletter 
            para recibir la información más relevante sobre el mundo logístico.</p></div>
          <div className="row" style={{border: "4px solid #005691"}}>
            <div className="col-8">
              <input className="input-newsletter" type="text" placeholder="Deja tu correo aqui"/>
            </div>
            <div className="col-4" style={{backgroundColor: "#005691"}}>
              <p style={{color: "#ffff"}}>Enviar</p>
            </div>
          </div>
  
        </div>


        <div className="newsletterTD container position-relative start-50 translate-middle" style={{border: "4px solid #005691", margin: "2vh", width: "94vw"}}>

          <div className="row" style={{padding: "1vh",border: "6px solid #005691"}}>
            
            <div className="col-4" style={{borderRight: "4px solid #005691"}}>
              <img src={camtomsNews} className="img_camtomsNews"/>
              <h5 style={{color: "#005691"}}>Newsletter de logística</h5>
            </div>

            <div className="col-8" style={{padding: "1vh"}}><p>Suscríbete a nuestro newsletter 
            para recibir la información más relevante sobre el mundo logístico.</p>
            </div>

          </div>
          
          <div className="row" style={{border: "6px solid #005691"}}>
            <div className="col-9">
              <input style={{padding: "0.5vh"}} className="input-newsletter" type="text" placeholder="Deja tu correo aqui"/>
            </div>
            <div className="col-3" style={{backgroundColor: "#005691"}}>
              <p style={{color: "#ffff", paddingTop: "2.5vh", paddingLeft: "6vh"}}>Enviar</p>
            </div>
          </div>
  
        </div>

          <div>
           
              <br/>
              <br/>
              
        </div>
      </div>        

    </body>

    <footer>
        <div className="container">
        <br/>
          <div className="row">
            <img class="col-4" src={logo_bn}/>
            <div 
              className="col-8 socialMediaFooter text-left d-flex justify-content-end"

            >
              <a href='https://www.facebook.com/profile.php?id=100092374013327'><img src={icon_facebook} style={{width:'7vw'}}/></a>
              <a href="https://www.linkedin.com/company/camtom/"><img src={icon_linkedin} style={{width:'7vw'}}/></a>
              <a href="https://instagram.com/camtomlogistic"><img src={icon_instagram} style={{width:'7vw'}}/></a>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <p style={{color: "rgb(201, 201, 201)", textAlign: "center"}}> <b>Contacto</b></p>
          <p style={{color: "rgb(201, 201, 201)", textAlign: "center"}}> <a style={{textDecoration:'none', color:'white'}} href="mailto:hello@camtomx.com">hello@camtomx.com</a> | <a style={{textDecoration:'none', color:'white'}} href="tel:+525649975102">+52 (56) 4997 5102</a></p>
          <p style={{color: "rgb(201, 201, 201)", textAlign: "center"}}> Made with 🤍 in México</p>
          <br/>
        </div>
    </footer>
    </div>
    )
}
