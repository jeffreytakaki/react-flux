import React from 'react'

export default class SavedItems extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		
		}
		this.handleDelete = this.handleDelete.bind(this)
		this.handleComplete = this.handleComplete.bind(this)
	}

	handleDelete(event) {
		let del_id = event.target.parentNode.parentNode.parentNode.parentNode.dataset.recipe_id
		let recipe_key = event.target.parentNode.parentNode.parentNode.parentNode.dataset.recipe_key
		let deleteObj = {
			recipe_key: recipe_key,
			recipe_id: del_id
		}
		this.props.deleteRecipe(deleteObj)
	}

	handleComplete(event) {
		this.props.completedRecipe()	
	}


	render() {
		return (
			<div className="row savedRow" data-recipe_key={this.props.recipe_key} data-recipe_id={this.props.recipe_id} data-title={this.props.title} data-url={this.props.url} data-image={this.props.image}>
				<div className="col-md-4 savedItem-col">
					<a href={this.props.url}><img src={this.props.image} alt={this.props.title} /></a>
				</div>
				<div className="col-md-6 savedItem-col">
					<a href={this.props.url}><h4>{this.props.title}</h4></a>
				</div>
				<div className="col-md-2 savedItem-col savedItemAction">
					<div className="row">
						<div className="col-md-12">
							<input type="checkbox" />
						</div>
						<div className="col-md-12">
							<i onClick={this.handleDelete} className="fa fa-trash-o" aria-hidden="true"></i>
						</div>
					</div>		
				</div>
			</div>	
		)
		
	}
}





