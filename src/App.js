import React from 'react';
import axios from 'axios';
import { FaPlus } from "react-icons/fa";
import './App.css';
import { Section } from './components/section'
import { Section_edit_name } from './components/section_edit_name'
import "babel-polyfill"

class App extends React.Component {    
  
  constructor(props) {
    super(props);
    this.state = {        
      sections: [],
      edit:true        
    }
    this.fetch()
    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.fetch = this.fetch.bind(this)
    this.sectionChangeNameStart = this.sectionChangeNameStart.bind(this)  
    this.sectionChangeName = this.sectionChangeName.bind(this)  
  }

  fetch(){
    axios.get('http://177.136.122.194:8000/list/api/section/').then(response => {
				this.setState({sections: response.data})
			})
			.catch(error => {
				console.log(error);
		});
  }

  onDrop(ev, id){    
    let id_job = ev.dataTransfer.getData("id");
    axios.patch('http://177.136.122.194:8000/list/api/job/'+id_job+'/',{section:id}).then(response => {
				this.fetch()
			})
			.catch(error => {
				console.log(error);
		});
  }

  onDragOver(ev){
    ev.preventDefault();
  }

  addSection(){
    axios.post('http://177.136.122.194:8000/list/api/section/',{"name":"New Section"}).then(response => {
      this.fetch()
			})
			.catch(error => {
				console.log(error);
		});
  }

  sectionChangeName(new_name,name){
    let sections = this.state.sections
    for (let section in sections){
      if(sections[section].name === name){
        sections[section].name = new_name
        sections[section].edit_name=false
        axios.patch('http://177.136.122.194:8000/list/api/section/'+sections[section].id+'/',{name:new_name}).then(response => {
            this.props.fetch()
          })
          .catch(error => {
            console.log(error);
        });
      }
    }    
    this.setState({sections: sections},function () {
    });     
  }

  sectionChangeNameStart(name){   
    let sections = this.state.sections
    for (let section in sections){
        if(sections[section].name === name){
          sections[section].edit_name=true
        }
    }
    this.setState({sections: sections}); 
  }

  render () { 
    let sections = this.state.sections
    let sections_list = []
    let edit = this.state.edit
    for (let section in sections) {
      if(sections[section].edit_name){
        sections_list.push(
          <div key={sections[section].id} className="section-out">
            <Section_edit_name section={sections[section]} sectionChangeName={this.sectionChangeName} onDragOver={this.onDragOver} onDrop={this.onDrop} fetch={this.fetch}/>
          </div>
        ); 
      }else{
        sections_list.push(
          <div key={sections[section].id} className="section-out">
            <Section section={sections[section]} sectionChangeNameStart={this.sectionChangeNameStart} onDragOver={this.onDragOver} onDrop={this.onDrop} fetch={this.fetch}/>
          </div>
        ); 
      }
      
    }
    return (
      <div className="container-drag">
      <h2 className="header">To do List <FaPlus style={{float: 'inline-end', margin:"0.2em"}} onClick={()=>this.addSection()}></FaPlus> </h2>
      
      <div style={{width:"100%",height:"100%"}}
      onDragOver={(e)=>this.onDragOver(e)}>       
        {sections_list}
      </div>      
    </div>);
  }
}

export default App;