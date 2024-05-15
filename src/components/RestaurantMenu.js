import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { IMG_CDN_URL } from "../Constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    const params = useParams();

    const [restaurant, setRestaurant] = useState(null);

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        getRestaurantInfo();
    },[]);

    async function getRestaurantInfo() {
        try {
          const response = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.3149618&lng=84.7940911&restaurantId="+params.id);
          const json = await response.json();
    
          // Set restaurant data
          const restaurantData = json?.data?.cards?.map(x => x.card)?.
                                 find(x => x && x.card['@type'] ===  "type.googleapis.com/swiggy.presentation.food.v2.Restaurant")?.card?.info || null;
          setRestaurant(restaurantData);
    
          // Set menu item data
          const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
                                groupedCard?.cardGroupMap?.REGULAR?.
                                cards?.map(x => x.card?.card)?.
                                filter(x=> x['@type'] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")?.
                                map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];
          
          const uniqueMenuItems = [];
          menuItemsData.forEach((item) => {
            if (!uniqueMenuItems.find(x => x.id === item.id)) {
              uniqueMenuItems.push(item);
            }
          })
          setMenuItems(uniqueMenuItems);
         } catch (error) {
          setMenuItems([]);
          setRestaurant(null);
          console.log(error);
        }
      }
    return (!restaurant) ? <Shimmer /> : (
        <>
        <div>
            <h1>Restaurant id: {params.id}</h1>
            <h2>{restaurant?.name}</h2>
            <img src= {IMG_CDN_URL + restaurant?.cloudinaryImageId}></img>
            <h3>{restaurant?.city}</h3>
            <h3>{restaurant?.avgRating}</h3> 
        </div>

        <div className="restaurant-menu-content">
        <div className="menu-items-container">
        <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">
            {menuItems.length} ITEMS
            </p>
        </div>
        <div className="menu-items-list">
            {menuItems.map((item) => (
            <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                <h3 className="item-title">{item?.name}</h3>
                <p className="item-cost">
                    {item?.price > 0
                    ? new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        }).format(item?.price / 100)
                    : " "}
                </p>
                <p className="item-desc">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper">
                {item?.imageId && (
                    <img
                    className="menu-item-img"
                    src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + item?.imageId}
                    alt={item?.name}
                    />
                )}
                <button className="add-btn"> ADD +</button>
                </div>
            </div>
            ))}
        </div>
        </div>
        </div>

        </>
    )
}

export default RestaurantMenu;