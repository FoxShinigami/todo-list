import React from 'react';
import '../App.css';

export class Task_Edit_Description extends React.Component {    

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
	    this.props.taskChangeDescription(this.state.value,task.id)
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
				<a className='task-text'>{task.name}</a>
				</div>
                <form onSubmit={(e)=>this.handleSubmit(e,task)}>                       
		        <input type='text'value={this.state.value} onChange={this.handleChange}/>
		        </form>
		    </div>
		)
	}
}