import React, { Component } from "react";
import FoodManagerDataService from "../services/food-manager.js";
import { Link } from "react-router-dom";

export default class MyFoodList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveFoodItems = this.retrieveFoodItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFoodItem = this.setActiveFoodItem.bind(this);
    this.removeAllFoodItems = this.removeAllFoodItems.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      foodItems: [],
      currentFoodItem: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveFoodItems();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveFoodItems() {
    FoodManagerDataService.getAll()
      .then(response => {
        this.setState({
          foodItems: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFoodItems();
    this.setState({
      currentFoodItem: null,
      currentIndex: -1
    });
  }

  setActiveFoodItem(foodItem, index) {
    this.setState({
      currentFoodItem: foodItem,
      currentIndex: index
    });
  }

  removeAllFoodItems() {
    FoodManagerDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentFoodItem: null,
      currentIndex: -1
    });

    FoodManagerDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          foodItems: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, foodItems, currentFoodItem, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Food Items List</h4>

          <ul className="list-group">
            {foodItems &&
              foodItems.map((foodItem, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFoodItem(foodItem, index)}
                  key={index}
                >
                  {foodItem.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllFoodItems}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentFoodItem ? (
            <div>
              <h4>Food Item</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentFoodItem.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentFoodItem.description}
              </div>

              <Link
                to={"/myfood/" + currentFoodItem.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Food Item...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}