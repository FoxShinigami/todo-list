import React from 'react';
import axios from 'axios';
import { FaPlus,FaTimes } from "react-icons/fa";
import { Task } from './task'
import { Task_Edit_Name } from './task_edit_name'
import { Task_Edit_Description } from './task_edit_description'
import '../App.css';



export class Section extends React.Component {    

	constructor(props) {
			super(props);
			this.taskChangeName = this.taskChangeName.bind(this)
      this.taskChangeNameStart = this.taskChangeNameStart.bind(this)  
      this.taskChangeDescription = this.taskChangeDescription.bind(this)
      this.taskChangeDescriptionStart = this.taskChangeDescriptionStart.bind(this)  
      this.onDragStart = this.onDragStart.bind(this)
      this.fetch = this.props.fetch.bind(this)
      this.state={
        tasks: this.props.section.job,
      }
      this.onClickName = this.onClickName.bind(this)
  }
  
  onClickName(e,section){
		e.preventDefault();
		this.props.sectionChangeNameStart(section.name)
	}

	taskChangeName(new_name,id){
    let tasks = this.state.tasks
    for (let task in tasks){
      if(tasks[task].id === id){
        tasks[task].name = new_name
        tasks[task].edit_name=false
        axios.patch('http://177.136.122.194:8000/list/api/job/'+tasks[task].id+'/',{name:new_name}).then(response => {
            this.props.fetch()
          })
          .catch(error => {
            console.log(error);
        });
      }
    }    
    this.setState({tasks: tasks},function () {
    });     
  }

  taskChangeNameStart(id){   
    let tasks = this.props.section.job
    for (let task in tasks){
        if(tasks[task].id === id){
          tasks[task].edit_name=true
        }
    }
    this.setState({tasks: tasks}); 
  }

  taskChangeDescription(new_description,id){
    let tasks = this.state.tasks
    for (let task in tasks){
      if(tasks[task].id === id){
        tasks[task].description = new_description
        tasks[task].edit_description=false
        axios.patch('http://177.136.122.194:8000/list/api/job/'+tasks[task].id+'/',{description:new_description}).then(response => {
            this.props.fetch()
          })
          .catch(error => {
            console.log(error);
        });
      }
    }    
    this.setState({tasks: tasks},function () {
    });     
  }

  taskChangeDescriptionStart(id){  
    let tasks = this.props.section.job
    for (let task in tasks){
      if(tasks[task].id === id){
        tasks[task].edit_description=true
      }
    }
    this.setState({tasks: tasks});     
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
      if(t.edit_name){
        section_list.push(
          <div key={t.id} >
              <Task_Edit_Name task={t} onDragStart={this.onDragStart} taskChangeName={this.taskChangeName} fetch={this.fetch} />
          </div>
        );
      }else if(t.edit_description){
        section_list.push(
          <div key={t.id} >
              <Task_Edit_Description task={t} onDragStart={this.onDragStart} taskChangeDescription={this.taskChangeDescription} fetch={this.fetch} />
          </div>
        );
      }else{
        section_list.push(
          <div key={t.id} >
              <Task task={t} onDragStart={this.onDragStart} taskChangeNameStart={this.taskChangeNameStart} taskChangeDescriptionStart={this.taskChangeDescriptionStart} fetch={this.fetch}/>
          </div>
        ); 
      }             
            
    });
		
		return(
			<div
        className="section"
        onDragOver={(e)=>this.props.onDragOver(e)}                    
        onDrop={(e)=>{this.props.onDrop(e, section.id)}}>
        <div>                    
          <div className="task-header">
          <a onClick={(e)=>this.onClickName(e, section)}>{section.name}</a>
            <FaTimes style={{float: 'inline-end', margin:"0.1em"}} onClick={()=>this.deleteSection(section.id)}></FaTimes>                  
          </div> 
          <FaPlus style={{float: 'inline-end', margin:"0.2em"}} onClick={()=>this.addJob(section.id)}></FaPlus>
        </div>        
        <div>                   
        {section_list}
        </div>                
      </div> 
		)
	}
}