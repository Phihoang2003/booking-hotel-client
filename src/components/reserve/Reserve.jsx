import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Reserve = ({ setOpen, hotelId }) => {
  const { loading, data, error } = useFetch(`/hotel/room/${hotelId}`);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const { dates } = useContext(SearchContext);
  const navigate=useNavigate()
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    
    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());

      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFind = roomNumber.unavailableDates.some((date) => {
      return allDates.includes(new Date(date).getTime());
    });
    return !isFind;
  };
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRoom(
      checked
        ? [...selectedRoom, value]
        : selectedRoom.filter((item) => item !== value)
    );
  };
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRoom.map((id) => {
          const res = axios.put(`/room/availability/${id}`, {dates:allDates});
          return res.data;
        })
      );
      setOpen(false);
      navigate("/")
      
    } catch (error) {}
  };

  console.log(selectedRoom);
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />

        <span>Selected your room:</span>
        {data.map((item) => {
          return (
            <div className="rItem">
              <div className="rInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people:<b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => {
                  return (
                    <div className="room">
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            
          );
        })}
      <button className="rButton" onClick={handleClick}>Reserve and Booking</button>
      </div>
    </div>
  );
};
export default Reserve;
