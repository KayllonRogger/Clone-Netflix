import React, { useEffect, useState } from 'react';
import MovieRow from './Components/MovieRow.js';
import Tmdb from './Tmdb.js';
import './App.css'
import FeaturedMovie from './Components/FeaturedMovie.js';
import Header from './Components/Header.js';

export default () =>{

  const[movieList, setMovieList] = useState([]);
  const[featuredData, setFeaturedData] = useState(null);
  const[blackHeader, setBlackHeader] = useState(false)

  useEffect(() =>{  
    const loadAll = async () =>{
      //Pegando a lista
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length-1));
      let chosen = originals[0].items.results[randomChosen];
      console.log(chosen);
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, chosen.media_type);
      console.log(chosenInfo);
      setFeaturedData(chosenInfo);
    }

    loadAll();
  },[]);
  
  useEffect(()=>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
       
    window.addEventListener('scroll', scrollListener);

    return() =>{
      window.removeEventListener('scroll', scrollListener); 
    }
  },[]);
  
  return(
    <div className="page">
      <Header black={blackHeader}/>
      {
      featuredData && <FeaturedMovie item={featuredData}/>
      }
      <section className="lists">
        {movieList.map((item, key) =>(
          <div>
            <MovieRow key={key} title={item.title} items={item.items}/>
          </div>
        ))}
      </section>
      <footer>
        Desenvolvido com amor <span role="img" aria-label='coração'>❤️</span> por <a href="https://www.rogger.com.br">www.rogger.com.br</a><br/>
        Direitos de imagem da Netflix<br/>
        Dados Themoviedb.org
      </footer>
      
      {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando"/>
      </div>
      }
    </div>
  )
};
