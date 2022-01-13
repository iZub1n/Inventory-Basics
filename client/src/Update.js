import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Update() {
  const { item_id } = useParams();
  const [itemSummary, setItemSummary] = useState([]);
  const [loadedData, setLoadedData] = useState(true);

  const [item_name, setItemName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");

  const getItemSummary = () => {
    Axios.get("http://localhost:3001/getItemSummary", {
      params: { item_id: item_id },
    }).then((response) => {
      console.log("Fetched Summary Successfully");
      if (response.data.rows.length > 0) {
        console.log(response.data.rows[0]);
        setItemSummary(response.data.rows[0]);
      }
    });
  };

  useEffect(() => {
    getItemSummary();
  }, []);

  const loadData = () => {
    setItemName(itemSummary.item_name);
    setManufacturer(itemSummary.manufacturer);
    setDescription(itemSummary.description);
    setPrice(itemSummary.price);
    setQuantity(itemSummary.quantity);
    setTags(itemSummary.tags);
    setLoadedData(false);
  };

  const updateItemRecord = () => {
    console.log("here");
    console.log(price, quantity);
    Axios.put("http://localhost:3001/updateItemRecord", {
      item_name: item_name,
      manufacturer: manufacturer,
      description: description,
      price: price,
      quantity: quantity,
      tags: tags,
      item_id: item_id,
    }).then((response) => {
      console.log("Updated Record");
      alert("Updated");
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
        <Button onClick={loadData}>Load Data</Button>
        <label>Item Name:</label>
        <input
          value={item_name}
          placeholder="Required Field"
          className="form-control"
          type="text"
          onChange={(event) => {
            setItemName(event.target.value);
          }}
        />
        <label>Manufacturer:</label>
        <input
          value={manufacturer}
          placeholder="Required Field"
          className="form-control"
          type="text"
          onChange={(event) => {
            setManufacturer(event.target.value);
          }}
        />
        <label>Description:</label>
        <input
          value={description}
          className="form-control"
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <label>Price:</label>
        <input
          value={price}
          placeholder="Required Field"
          className="form-control"
          type="number"
          step="0.01"
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
          value={quantity}
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
          value={tags}
          className="form-control"
          type="text"
          onChange={(event) => {
            setTags(event.target.value);
          }}
        />
        <br></br>
        {(item_name.trim() !== "") &
        (manufacturer.trim() !== "") &
        (price >= 0) &
        (quantity >= 0) ? (
          <Button onClick={updateItemRecord} variant="success">
            Update Record
          </Button>
        ) : (
          <Button disabled variant="success">
            Update Record
          </Button>
        )}
      </div>
    </div>
  );
}

export default Update;
