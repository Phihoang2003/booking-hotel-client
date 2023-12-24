import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { loading, data } = useFetch("/hotel?features=true");
  console.log(data);
  return (
    <div className="fp">
      {loading ? (
        "Loading please"
      ) : (
        <></>
        // <>
        //   {data?.map((item) => {
        //     return (
        //       <div className="fpItem" key={item._id}>
        //         <img src={item.photos[0]} alt="" className="fpImg" />
        //         <span className="fpName">{item.name}</span>
        //         <span className="fpCity">{item.city}</span>
        //         <span className="fpPrice">
        //           Staring from {item.cheapestPrice}
        //         </span>
        //         {item?.rating && (
        //           <div className="fpRating">
        //             <button>{item.rating}</button>
        //             <span>Excellent</span>
        //           </div>
        //         )}
        //       </div>
        //     );
        //   })}
        // </>
      )}
    </div>
  );
};

export default FeaturedProperties;
