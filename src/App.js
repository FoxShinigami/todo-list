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
  }

  fetch(){
    axios.get('http://192.168.0.108:8000/list/api/section/').then(response => {
				this.setState({sections: response.data})
			})
			.catch(error => {
				console.log(error);
		});
  }

  onDrop(ev, id){    
    console.log("teste")
    let sections = this.state.sections
    let sections2 = []
    for(let section in sections){
      console.log('sections',sections)
      console.log('section',section)
      console.log('sections[section]',sections[section])
      sections2.push(sections[section])
      console.log('sections2',sections2)
      let i = 0
      for(let task of sections[section].list){
        console.log(task,sections2[section].id, id)
        break
        if(task){
          if(sections2[section].id == id){
            sections2[section].list.push(task)                       
          }else{
            var index = sections2[section].list.indexOf(sections2[section].list[i]);
            if (index > -1) {
              sections2[section].list.splice(index, 1);
            } 
          }
        }
        i++
        if(i>5){
          break
        }
      }         
    }
    this.setState({sections: sections2})   
    ev.preventDefault();
    ev.stopPropagation();     
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
          <Section section={sections[section]} onDragOver={this.onDragOver} onDrop={this.onDrop}/>
        </div>
      ); 
    }
    return (
      <div className="container-drag">
      <h2 className="header">To do List</h2>  
      <div style={{width:"100%",height:"100%"}}
      onDragOver={(e)=>this.onDragOver(e)}
      onDrop={(e)=>{this.onDropOut(e)}}>       
        {sections_list}
      </div>          
    </div>);
  }
}

export default App;