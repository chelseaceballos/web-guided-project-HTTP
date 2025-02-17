import React, { useEffect, useState } from 'react';
import { Route, NavLink, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';

function Item(props) {
  const [item, setItem] = useState({});
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(()=>{
    axios.get(`http://localhost:3333/items/${id}`)
      .then(res=>{
        setItem(res.data);
      });
  }, []);

  if (!item) {
    return <h2>Loading item data...</h2>;
  }

  
  const handleDelete = ()=> {
    //To Make a delete:
    //1. Capture the click of the delete button
    //2. Make an DELETE api call on the current item id.
    //3. If delete was successful, Update state to reflect deleted item
    //4. Redirect to item-list page.
    axios.delete(`http://localhost:3333/items/${item.id}`)
      .then(res => {
        props.setItems(res.data);
        push('/item-list');
      })
      .catch(err=>{
        console.log(err);
      })
  }

  const handleEdit = ()=> {
    //To Make An Edit:
    //1. Capture click of the edit button
    //2. Redirect to our edit form
    props.history.push(`/item-update/${item.id}`);
  }

  return (
    <div className="item-wrapper">
      <div className="item-header">
        <div className="image-wrapper">
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <div className="item-title-wrapper">
          <h2>{item.name}</h2>
          <h4>${item.price}</h4>
        </div>
      </div>
      <nav className="item-sub-nav">
        <NavLink exact to={`/item-list/${item.id}`}>
          the story
        </NavLink>
        <NavLink to={`/item-list/${item.id}/shipping`}>shipping</NavLink>
      </nav>
      <Route
        exact
        path="/item-list/:id"
        render={props => <ItemDescription {...props} item={item} />}
      />
      <Route
        path="/item-list/:id/shipping"
        render={props => <ItemShipping {...props} item={item} />}
      />
      <button onClick={handleEdit} className="md-button">
        Edit
      </button>
      <button onClick={handleDelete}className="md-button">
        Delete
      </button>
    </div>
  );
}

export default Item;
