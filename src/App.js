import React from 'react';
import axios from 'axios';
import './App.css';
import { Section } from './components/section'
import "babel-polyfill"

class App extends React.Component {    
  
  constructor(props) {
    super(props);
    this.state = {        
      sections: []        
    }
    this.fetch()
    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.fetch = this.fetch.bind(this)
  }

  fetch(){
    axios.get('http://177.21.29.139:8000/list/api/section/').then(response => {
				this.setState({sections: response.data})
			})
			.catch(error => {
				console.log(error);
		});
  }

  onDrop(ev, id){    
    let id_job = ev.dataTransfer.getData("id");
    axios.patch('http://177.21.29.139:8000/list/api/job/'+id_job+'/',{section:id}).then(response => {
				this.fetch()
			})
			.catch(error => {
				console.log(error);
		});
  }

  onDragOver(ev){
    ev.preventDefault();
  }

  render () { 
    let sections = this.state.sections
    let sections_list = []
    for (let section in sections) {
      sections_list.push(
        <div key={sections[section].id} className="section-out">
          <Section section={sections[section]} onDragOver={this.onDragOver} onDrop={this.onDrop} fetch={this.fetch}/>
        </div>
      ); 
    }
    return (
      <div className="container-drag">
      <h2 className="header">To do List</h2>  
      <div style={{width:"100%",height:"100%"}}
      onDragOver={(e)=>this.onDragOver(e)}>       
        {sections_list}
      </div>      
    </div>);
  }
}

export default App;