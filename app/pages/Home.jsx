import React from 'react'
    
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: ''
        }

        this.saveItem = this.saveItem.bind(this)
    }

    saveItem(event) {
        this.setState({
            item: event.targe.value
        })
    }
 

    render () {
        return (
            
            <div className="container-fluid">
                <div className="row">
                    <div className="react-col col-md-12">
                      <input onChange={this.saveItem} placeholder="enter item here" />
                    </div>
                </div>
            </div>   
            
        )
    }
}






