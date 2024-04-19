import RestaurantCard from "./RestaurantCard";
import { restaurants } from "../Constants";
import React, { useState } from "react";

function searchFilter (searchText, restaurantsData) {
    const filterData = restaurantsData.filter ((restaurant) =>
        restaurant.info.name.includes(searchText)
    );
    console.log(filterData)
    return filterData;
}


const Body = () => {
    const [searchText, setSearchText] = useState("Sai");

    const [restaurantsData, setRestaurantsData] = useState(restaurants);

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    value={searchText}
                    placeholder="Search"
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                />
                <button
                    className="search-button"
                    onClick={() => {
                        const data = searchFilter(searchText, restaurantsData);
                        setRestaurantsData(data);
                    }}    
                >
                    Search
                </button>
                
            </div>
            <div className="restaurant-list">
                {
                    restaurantsData.map((restaurant) => {
                    return <RestaurantCard {...restaurant.info} key={restaurant.info.id}/>
                    })
                }
            </div>
        </>
        
    )
}

export default Body;