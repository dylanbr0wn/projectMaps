import React from "react";

const PlaceListItem = ({ place, onClick }) => (
    <li onClick={() => onClick(place)}>
        <svg
            className="mountain-icon"
            version="1.1"
            id="mountain-15"
            xmlns="http://www.w3.org/2000/svg"
            width="15px"
            height="15px"
            viewBox="0 0 15 15"
        >
            <path
                id="path5571"
                d="M7.5,2C7.2,2,7.1,2.2,6.9,2.4&#xA;&#x9;l-5.8,9.5C1,12,1,12.2,1,12.3C1,12.8,1.4,13,1.7,13h11.6c0.4,0,0.7-0.2,0.7-0.7c0-0.2,0-0.2-0.1-0.4L8.2,2.4C8,2.2,7.8,2,7.5,2z&#xA;&#x9; M7.5,3.5L10.8,9H10L8.5,7.5L7.5,9l-1-1.5L5,9H4.1L7.5,3.5z"
            />
        </svg>
        {place.name}
    </li>
);
export default PlaceListItem;
