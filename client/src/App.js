import { useState } from "react";
import "./App.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

function Home() {
  const [item_name, setItemName] = useState("");
  const [item_id, setItemID] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(-1);
  const [price, setPrice] = useState(-1);
  const [tags, setTags] = useState("");
  const [loadedData, setLoadedData] = useState(true);

  const [itemsList, setItemsList] = useState([]);

  const addItemToDB = () => {
    Axios.post("http://localhost:3001/create", {
      item_name: item_name.trim(),
      item_id: item_id.trim(),
      manufacturer: manufacturer.trim(),
      quantity: quantity.trim(),
      description: description.trim(),
      tags: tags.trim(),
      price: price.trim(),
    }).then(() => {
      console.log("Added Successfully");
      alert("Succesfully Added to Inventory");
      setItemsList([
        ...itemsList,
        {
          item_name: item_name.trim(),
          item_id: item_id.trim(),
          manufacturer: manufacturer.trim(),
          quantity: quantity.trim(),
          price: price.trim(),
          description: description.trim(),
          tags: tags.trim(),
        },
      ]);
    });
  };

  const getItemsList = () => {
    Axios.get("http://localhost:3001/getItemsList").then((response) => {
      console.log("Fetched List Successfully");
      setItemsList(response.data.rows);
    });
  };

  const deleteItem = (item_id) => {
    alert("Deleted Item Successfully");
    Axios.delete(`http://localhost:3001/delete/${item_id}`).then((response) => {
      setItemsList(
        itemsList.filter((val) => {
          return val.item_id !== item_id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="inputInformation">
        <h1 className="headerText">
          <Link
            className="headerText"
            to="/"
            style={{ textDecoration: "none" }}
          >
            Inventory Basics{" "}
          </Link>
        </h1>
        <label>Item Name:</label>
        <input
          placeholder="Required Field"
          className="form-control"
          type="text"
          onChange={(event) => {
            setItemName(event.target.value);
          }}
        />
        <label>Item ID:</label>
        <input
          className="form-control"
          type="text"
          placeholder="Unique Numeric ID between 1 and 999999999"
          onChange={(event) => {
            setItemID(event.target.value);
          }}
        />
        <label>Manufacturer:</label>
        <input
          placeholder="Required Field"
          className="form-control"
          type="text"
          onChange={(event) => {
            setManufacturer(event.target.value);
          }}
        />
        <label>Description:</label>
        <input
          className="form-control"
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <label>Price:</label>
        <input
          placeholder="Required Field"
          className="form-control"
          type="number"
          step=".01"
          onChange={(event) => {
            setPrice(event.target.value);
            if (event.target.value <= 0) {
              setLoadedData(true);
            } else {
              setLoadedData(false);
            }
          }}
        />
        <label>Quantity:</label>
        <input
          placeholder="Required Field"
          className="form-control"
          type="number"
          onChange={(event) => {
            setQuantity(event.target.value);
            if (event.target.value <= 0) {
              setLoadedData(true);
            } else {
              setLoadedData(false);
            }
          }}
        />
        <label>Tags:</label>
        <input
          className="form-control"
          type="text"
          onChange={(event) => {
            setTags(event.target.value);
          }}
        />
        <br></br>
        {(item_name.trim() !== "") &
        (item_id > 0) &
        (item_id < 99999999) &
        (manufacturer.trim() !== "") &
        (price >= 0) &
        (quantity >= 0) ? (
          <Button disabled={loadedData} onClick={addItemToDB}>
            Add to Inventory
          </Button>
        ) : (
          <Button disabled onClick={addItemToDB}>
            Add to Inventory
          </Button>
        )}
      </div>
      <br></br>
      <hr />
      <div className="items">
        <br></br>
        <Button onClick={getItemsList}>Expand Inventory + </Button>
        <br></br>
        {itemsList.length > 0 ? (
          <>
            <CSVLink data={itemsList}>
              <Button variant="secondary">Download Inventory</Button>
            </CSVLink>
            <br></br>
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Item ID</th>
                  <th>Item Name</th>
                  <th>Manufacturer</th>
                  <th>Description</th>
                  <th>Tags</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {itemsList.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.item_id}</td>
                      <td>{val.item_name}</td>
                      <td>{val.manufacturer}</td>
                      <td>{val.description}</td>
                      <td>{val.tags}</td>
                      <td>${val.price}</td>
                      <td>
                        <Link to={"/Update/" + val.item_id}>
                          <Button className="deleteBtn" variant="warning">
                            Update
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            deleteItem(val.item_id);
                          }}
                          className="deleteBtn"
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
