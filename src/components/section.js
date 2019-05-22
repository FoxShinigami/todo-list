import React from 'react';
import { Task } from './task'
import { Task_Edit_Name } from './task_edit_name'
import '../App.css';

export class Section extends React.Component {    

	constructor(props) {
			super(props);
			this.taskChangeName = this.taskChangeName.bind(this)
			this.taskChangeNameStart = this.taskChangeNameStart.bind(this)  
			this.onDragStart = this.onDragStart.bind(this)
			
	}

	taskChangeName(new_name,name){
    let tasks = this.state.tasks
    for (let task in tasks){
      if(tasks[task].name == name){
        tasks[task].name = new_name
        tasks[task].edit = false
      }
    }
    
    this.setState({tasks: tasks},function () {
    }); 
  }

  taskChangeNameStart(name){
    let tasks = this.state.tasks
    for (let task in tasks){
      if(tasks[task].name == name){
        tasks[task].edit = true
      }
    }
    console.log(tasks)
    this.setState({tasks: tasks},function () {
      console.log("this.state", this.state.tasks)
    }); 
	}

  onDragStart(ev, task){
    ev.dataTransfer.setData("name",task.name)
  }

  

	render(){
		let section = this.props.section
		let section_list = []
		section.list.forEach((t) => {    
      // console.log('dadas',sections)
      if(t.edit){
        section_list.push(
          <div key={t.name} >
              <Task_Edit_Name task={t} onDragStart={this.onDragStart} taskChangeName={this.taskChangeName} />
          </div>
        );
      }else{
        section_list.push(
          <div key={t.name} >
              <Task task={t} onDragStart={this.onDragStart} taskChangeNameStart={this.taskChangeNameStart} />
          </div>
        ); 
      }             
            
		});
		
		return(
			<div
				className="section"
        onDragOver={(e)=>this.props.onDragOver(e)}                    
        onDrop={(e)=>{this.props.onDrop(e, section.id)}}>                    
        <span className="task-header">{section.name}</span>         
        <div>                    
        {section_list}
        </div>                
      </div> 
		)
	}
}