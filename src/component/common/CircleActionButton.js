import React from "react";
import AnimatedTooltip from "./AnimatedToolTip";
import "./CircleActionButton.css";

const CircleActionButton = props => (
    <AnimatedTooltip label={props.label}>
        <button className={`modal-${props.name}-btn`} onClick={props.onClick}>
            <i className={`fa fa-${props.icon}`} />
        </button>
    </AnimatedTooltip>
);

export default CircleActionButton;
