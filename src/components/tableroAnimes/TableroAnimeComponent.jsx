import './TableroAnimeComponent.css';
import { useEffect, useState } from "react";
import axios from "axios";

export const TableroAnimeComponent = () => {
  
  const [listAnime, setListAnime] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/anime/getAll')
      .then(data => data.json())
      .then(json => {
        console.log(json)
        setListAnime(json)})
  },[])

  const createPost = (event) => {
    event.preventDefault();
     const name = document.getElementById('name').value
     const category = document.getElementById('category').value

     axios.post('http://localhost:8080/anime/create',{
      name : name,
      category : category
    })
    .then((json) => {
        setListAnime(json)
    })
  }


  const actualizarAnime = () => {
    axios.put('http://localhost:8080/anime/update')
    .then(() => {
      alert("Posted update")
      setListAnime(true)
    })
  }

  const deleteAnime = (json) => {
    axios.delete(`http://localhost:8080/anime/delete/${json}`)
    .then(() => {
      alert("Post deleted!")
      setListAnime(null)
    })
  }

  return (
    <div>

        <h1 className="titleCreador">Creador Anime</h1>

        <form className='contenedorFormulario'>
            <input className="inputCreadorName" id="name" type="text" placeholder="Name" required/>
            <input className="inputCreadorCategoria" id="category"  type="text" placeholder="Categoria" required />
            <button className="botonListarAnime" onClick={createPost}>Listar Anime</button>
        </form>
    

      <h1 className="tableroAnime">Tablero Anime</h1>
          <ul className="contenedor">
              {listAnime.map(list => (
                <div className='listado' key={list.name}>
                  <div className='contenidoListado'>
                    <li className='lista'>{list.id}</li>
                    <li className='lista'>{list.name}</li>
                    <li className='lista'>{list.category}</li>
                    <button className='botonDeActualizar' onClick={actualizarAnime}>ActualizarAnime</button>
                    <button className='botonDeEliminar' onClick={() => deleteAnime(list.id)}>DeleteAnime</button>
                  </div>
                </div>
              ))}
          </ul>
    </div>
  )
}
