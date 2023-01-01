import React from 'react';
import axios from 'axios';

export default class TopArtistList extends React.Component {
  
    state = {
      artists: []
    }

    componentDidMount() {
      axios.get(`http://localhost:8080/top_artists`)
        .then(res => {
          const artists = res.data;
          this.setState({ artists });
        })
    }
  
    render() {
      console.log('I was triggered during render')
      return (
        
        <div className="artists">
         {this.state.artists.map((artist) => (
           <div className="artist">{artist.name}</div>
        ))[this.props.number]}

        </div>  
        
      )
    }
  }