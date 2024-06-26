import './Titulo.css'

function Titulo() {
  return (
    <div className="titulo">
      <img src="./logo.png" alt="Logo" className='logo' />
      <div>
        <h1>Veterinária Avenida</h1>
        <h2>Controle de Adoções</h2>
      </div>
    </div>
  )
}

export default Titulo