import React from 'react';
import '../App.css';

export class Task_Edit_Name extends React.Component {    

	constructor(props) {
	    super(props);
	    this.state = {value: ''};
	    this.handleChange = this.handleChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
	    this.setState({value: event.target.value});
	}

	handleSubmit(event,task) {
	    this.props.taskChangeName(this.state.value,task.id)
		event.preventDefault();
	}

	render(){
		let task = this.props.task
		return(
			<div 		                            
		        onDragStart={(e)=>this.props.onDragStart(e, task)}                   
		        draggable                    
		        className="draggable">
				<div style={{borderBottom:"solid"}}>
					<form onSubmit={(e)=>this.handleSubmit(e,task)}>                       
					<input type='text'value={this.state.value} onChange={this.handleChange}/>
					</form>
				</div>
		        <a>{task.description}</a>
		    </div>
		)
	}
}