import React from 'react';
import '../App.css';

export class Task extends React.Component {    

	constructor(props) {
	    super(props);
		this.onClickName = this.onClickName.bind(this)
		this.onClickDescription = this.onClickDescription.bind(this)
	}

	onClickName(e,task){
		e.preventDefault();
		this.props.taskChangeNameStart(task.name)
	}
	onClickDescription(e,task){
		e.preventDefault();
		this.props.taskChangeDescriptionStart(task.description)
	}

	render(){
		let task = this.props.task
		return(
			<div 		                            
		        onDragStart={(e)=>this.props.onDragStart(e, task)}                    
		        draggable                    
		        className="draggable">                       
		        <p onClick={(e)=>this.onClickName(e, task)}>{task.name}</p>
		        <p onClick={(e)=>this.onClickDescription(e, task)}>{task.description}</p>                
		    </div>
		)
	}
}