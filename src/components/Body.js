import RestaurantCard from "./RestaurantCard";
import { restaurants } from "../Constants";
import React, { useState, useEffect  } from "react";
import Shimmer from "./Shimmer";

function searchFilter (searchText, restaurants) {
    const filterData = restaurants.filter ((restaurant) =>
        restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return filterData;
}


const Body = () => {
    const [searchText, setSearchText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [allRestaurantsData, setAllRestaurantsData] = useState([]);
    const [filteredRestaurantsData, setFilteredRestaurantsData] = useState([]);

    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants() {
        const data = await fetch (
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.3149618&lng=84.7940911&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        setAllRestaurantsData(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurantsData(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    function searchData (searchData, restaurants) {
        if (searchData !== "") {
            const filterData = searchFilter(searchData, restaurants);
            setFilteredRestaurantsData(filterData);
            setErrorMessage("");
            if (filterData?.length === 0) {
                setErrorMessage("No such restaurant found!!");
            }
        } else {
            setErrorMessage("");
            setFilteredRestaurantsData(restaurants);
        }
    };

    if (!allRestaurantsData) return null;

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
                        searchData(searchText, allRestaurantsData);
                    }}    
                >
                    Search
                </button>
                
            </div>
            {errorMessage && <div className="error-container">{errorMessage}</div>}
            {allRestaurantsData.length === 0 ? (<Shimmer />) : (
                <div className="restaurant-list">
                    {
                        filteredRestaurantsData.map((restaurant) => {
                        return <RestaurantCard {...restaurant.info} key={restaurant.info.id}/>
                        })
                    }
                </div>
            )}
            
        </>
        
    )
}

export default Body;