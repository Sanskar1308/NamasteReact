import { restaurants, IMG_CDN_URL } from "../Constants";

const RestaurantCard = ({name, cloudinaryImageId, cuisines, avgRating}) => {
    return (
        <div className="card">
            <img src={ IMG_CDN_URL + cloudinaryImageId} alt="Card image" />
            <h2>{name}</h2>
            <h3>{cuisines.join(", ")}</h3>
            <h3>{avgRating} star</h3>
        </div>
    )
}

export default RestaurantCard;