import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

import './NovoAnimal.css'

function NovoAnimal({animais, setAnimais}) {
  const { register, handleSubmit, reset, setFocus } = useForm()

  function cadastraAnimal(dados) {
    const animais2 = [...animais]
    animais2.push({
        nome: dados.nome,
        raca: dados.raca,
        idade: dados.idade,
        foto: dados.foto,
        dono: 0,
        confirmacao: "",
        contato: ""
    })

    setAnimais(animais2)
    //    alert("Ok! Produto cadastrado")    
    toast.success(f`Ok! O Animal ${animal.nome} Cadastrado com Sucesso!`)

    setFocus("nome")
    reset()

    // localStorage.setItem(): serve para salvar os dados no browser
    // JSON.stringigy(): serve para converter o vetor de objetos em uma string
    localStorage.setItem("animais", JSON.stringify(animais2))
  }

  useEffect(() => {
    setFocus("nome")
  }, [])

  return (
    <>
      <div className="cadastra__animal">
      <h3>Formulário para Inclusão de Animais</h3>
      <form onSubmit={handleSubmit(cadastraAnimal)}>
        <p>
          <label htmlFor="nome">Nome do Animal:</label>
          <input type="text" id="nome" size={40}  required
            {...register("nome")} />
        </p>
        <p>
          <label htmlFor="raca">Raça do Animal:</label>
          <input type="text" id="raca" required
            {...register("raca")} size={30} step={0.01} min={0.01} />
        </p>
        <p>
          <label htmlFor="idade">Idade:</label>
          <input type="number" id="idade" required
            {...register("idade")} min={1} />
        </p>
        <p>
          <label htmlFor="foto">URL da Foto:</label>
          <input type="text" id="foto" size={60} required
            {...register("foto")} />
        </p>
        <input type="submit" value="Cadastrar" />
      </form>
      </div>
    </>
  )
}

export default NovoAnimal