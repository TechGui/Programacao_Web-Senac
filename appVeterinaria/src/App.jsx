import Titulo from "./components/Titulo"
import ListaAnimal from "./components/ListaAnimal"
import NovoAnimal from "./components/NovoAnimal"


import './App.css'
import { useEffect, useState } from "react"
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { Toaster } from "sonner"

function App() {
  const [animais, setAnimais] = useState([])
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (localStorage.getItem("animais")) {
      const animais2 = JSON.parse(localStorage.getItem("animais"))
      setAnimais(animais2)
    }
  }, [])

  const listaAnimais = animais.map(animal => (
    <ListaAnimal key={animal.titulo} animal={animal} animais={animais} setAnimais={setAnimais} />
  ))

  return (
    <>
      <Titulo />
      <div className="container">
        <div className="lista-novo">
        <h1>Lista de Animais para Adoção</h1>
        <button className="bt-novo" onClick={()=> setOpen(true)}>Cadastrar Animal</button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)} center>
        <NovoAnimal animais={animais} setAnimais={setAnimais} />
        </Modal>
        <div className="grid-container">
          {listaAnimais}
        </div>
      </div>
      <Toaster richColors position="top-right" />

    </>
  )
}

export default App
