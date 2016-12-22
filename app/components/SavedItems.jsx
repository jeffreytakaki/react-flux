import React from 'react'

export default class SavedItems extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showcomplete: this.props.completed
		}
		this.handleDelete = this.handleDelete.bind(this)
		this.handleComplete = this.handleComplete.bind(this)
	}

	handleDelete(event) {
		let del_id = event.target.parentNode.parentNode.parentNode.parentNode.dataset.recipe_id
		this.props.deleteRecipe(del_id)
	}

	handleComplete(event) {
		let status = event.target.value
		status = (status == "true") ? false : true
		let recipeId = event.target.id

		this.props.completedRecipe(recipeId,status)	

		this.setState({
			showcomplete: status
		})
	}

	render() {

		return (
			<div className="row recipe-item" data-recipe_key={this.props.recipe_key} data-recipe_id={this.props.recipe_id} data-title={this.props.title} data-url={this.props.url} data-image={this.props.image}>
				<div className="col-md-2 recipe-col">
					<a href={this.props.url}><img src={this.props.image} alt={this.props.title} /></a>
				</div>
				<div className="col-md-6 recipe-col">
					<a href={this.props.url}><h4>{this.props.title}</h4></a>
				</div>
				<div className="col-md-2 recipe-col savedItemAction">
					<div className="row">
						<div className="col-md-6 saved-input">
							<input type="checkbox" visibility="hidden" checked={(this.state.showcomplete) ? 'checked' : ''} id={this.props.recipe_id}  onChange={this.handleComplete}  value = {this.state.showcomplete} />
							<label htmlFor={this.props.recipe_id} className="completed-recipe">
								<i className="fa fa-check-circle-o" aria-hidden="true"></i>
							</label>
						</div>
						<div className="col-md-6 saved-trash">
							<i onClick={this.handleDelete} className="fa fa-trash-o" aria-hidden="true"></i>
						</div>
					</div>		
				</div>
			</div>	
		)
		
	}
}





