import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import { useNavigate } from "react-router-dom";
const FeaturedProperties = () => {
  const { loading, data } = useFetch("/hotel?features=true");
  const [destination,setDestination]=useState("")
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const dates=[
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]
  
  const navigate=useNavigate()
  const handleItemClick = (itemId) => {
    navigate(`/hotels/${itemId}`,{ state: { dates } });
  };
  return (
    <div className="fp">
      {loading ? (
        "Loading please"
      ) : (
      
        <>
          {data?.map((item) => {
            return (
              <div className="fpItem" key={item._id} onClick={()=>handleItemClick(item._id)}>
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">
                  Staring from {item.cheapestPrice}
                </span>
                {item?.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
