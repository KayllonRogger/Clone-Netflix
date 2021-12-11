import React from "react";
import "./FeaturedMovie.css";

export default ({item}) => {
    let firstDate = new Date(item.first_air_date);
    let releaseDate = new Date(item.release_date);
    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name);
    }

    let description = item.overview;
    if(description.length > 200){
        description = description.substring(0, 200)+'...';

    }

    return(    
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(http://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.title}{item.name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{isNaN(firstDate) == false ? firstDate.getFullYear() : releaseDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons}{item.number_of_seasons >= 1 ? ' Temporada' : 'Filme'}{item.number_of_seasons !== 1 && item.number_of_seasons == true ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured-watchButton">▶ Assistir</a>
                        <a href={`/list/add/${item.id}`} className="featured--myListButton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros:</strong> {genres.join(', ')} </div>
                </div>
            </div>
        </section>
    )
}