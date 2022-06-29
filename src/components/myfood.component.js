import React, { Component } from "react";
import FoodManagerDataService from "../services/food-manager.js";

export default class MyFood extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.getFoodItem = this.getFoodItem.bind(this);
    this.updateFoodItem = this.updateFoodItem.bind(this);
    this.deleteFoodItem = this.deleteFoodItem.bind(this);

    this.state = {
      currentFoodItem: {
        id: null,
        name: "",
        type: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getFoodItem(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentFoodItem: {
          ...prevState.currentFoodItem,
          name: name
        }
      };
    });
  }

  onChangeType(e) {
    const type = e.target.value;
    
    this.setState(prevState => ({
      currentFoodItem: {
        ...prevState.currentFoodItem,
        type: type
      }
    }));
  }

  getFoodItem(id) {
    FoodManagerDataService.get(id)
      .then(response => {
        this.setState({
          currentFoodItem: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFoodItem() {
    FoodManagerDataService.update(
      this.state.currentFoodItem.id,
      this.state.currentFoodItem
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The food item was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteFoodItem() {    
    FoodManagerDataService.delete(this.state.currentFoodItem.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/myfood')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentFoodItem } = this.state;

    return (
      <div>
        {currentFoodItem ? (
          <div className="edit-form">
            <h4>Food Item</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentFoodItem.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  value={currentFoodItem.type}
                  onChange={this.onChangeType}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteFoodItem}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFoodItem}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Food Item...</p>
          </div>
        )}
      </div>
    );
  }
}