import React from 'react';
import axios from 'axios';
import { FaPlus,FaTimes } from "react-icons/fa";
import { Task } from './task'
import { Task_Edit_Name } from './task_edit_name'
import { Task_Edit_Description } from './task_edit_description'
import '../App.css';



export class Section_edit_name extends React.Component {    

	constructor(props) {
	    super(props);
      this.onDragStart = this.onDragStart.bind(this)
      this.fetch = this.props.fetch.bind(this)
      this.handleChange = this.handleChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
      this.state={
        tasks: this.props.section.job,
        value: ''
      }
  }
  
  handleChange(event) {
    
    this.setState({value: event.target.value});
  }

  handleSubmit(event,section) {
    this.props.sectionChangeName(this.state.value,section.name)
    event.preventDefault();
  }

  onDragStart(ev, task){
    ev.dataTransfer.setData("id",task.id)
  } 

  addJob(id){
    axios.post('http://177.136.122.194:8000/list/api/job/',{
      "name": "New job",
      "description": "New job",
      "section": id
    }).then(response => {
        this.props.fetch()
      })
      .catch(error => {
        console.log(error);
    });
  }

  deleteSection(id){
    axios.delete('http://177.136.122.194:8000/list/api/section/'+id+'/').then(response => {
      this.fetch()
      })
      .catch(error => {
        console.log(error);
    });
  }

	render(){
		let section = this.props.section
    let section_list = []
		section.job.forEach((t) => {  
      section_list.push(
        <div key={t.id} >
            <Task task={t} onDragStart={this.onDragStart} allowed={true} fetch={this.fetch}/>
        </div>
      ); 
    });
		
		return(
			<div
        className="section"
        onDragOver={(e)=>this.props.onDragOver(e)}                    
        onDrop={(e)=>{this.props.onDrop(e, section.id)}}>
        <div>                    
          <form onSubmit={(e)=>this.handleSubmit(e,section)}> 
          <input type='text'value={this.state.value} onChange={this.handleChange}/>                  
          </form> 
        </div>        
        <div>                   
        {section_list}
        </div>                
      </div> 
		)
	}
}