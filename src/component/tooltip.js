import React, { cloneElement, Fragment } from 'react';
import { useTooltip, TooltipPopup } from "@reach/tooltip";
import { useTransition, animated } from "react-spring";


animated.TooltipPopup = animated(TooltipPopup);
animated.TooltipContent = animated(TooltipPopup);


const centered = (triggerRect, tooltipRect) => {
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const left = triggerCenter - tooltipRect.width / 2;
    const maxLeft = window.innerWidth - tooltipRect.width - 2;
    return triggerRect.bottom + 8 + tooltipRect.height < window.innerHeight
        ? {
            left: Math.min(Math.max(2, left), maxLeft),
            top: triggerRect.bottom + 8,
        }
        : {
            left: Math.min(Math.max(2, left), maxLeft),
            top: triggerRect.top - tooltipRect.height - 8,
        };
};

const AnimatedTooltip = ({ children, ...rest }) => {

    // get the props from useTooltip
    const [trigger, tooltip, isVisible] = useTooltip();
    const transitions = useTransition(isVisible ? tooltip : false, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 100 },
    });

    return (
        <Fragment>
            {cloneElement(children, trigger)}
            {transitions.map(
                ({ item: tooltip, props: styles, key }) =>
                    tooltip && (
                        <animated.TooltipContent
                            key={key}
                            {...tooltip}
                            {...rest}
                            style={{
                                ...styles,
                                background: "#eeeeee",
                                color: "black",
                                border: "none",
                                borderRadius: "3px",
                                padding: "0.5em 1em",
                                transition: "all 0.2s",
                                zIndex: "2000"
                            }}
                            position={centered}
                        />
                    )
            )}
        </Fragment>
    );
};

export default AnimatedTooltip;