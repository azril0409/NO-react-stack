import React from 'react';
import {getVerticalAlignmentStyle, isChildrenHaveSpacer} from "./units";

export default ({className, alignment, style, children, ...rest}) => {
    const width = isChildrenHaveSpacer(children) ? '100%' : undefined
    console.log(`width: ${width}`)
    return(<div
        {...rest}
        className={className}
        style={{
            display: 'flex',
            boxSizing: 'border-box',
            flexDirection: 'row',
            alignContent: 'stretch',
            alignItems: getVerticalAlignmentStyle(alignment),
            width: width,
            ...style
        }}
    >{
        React.Children.map(children, (child, i) => {
            return React.cloneElement(child, {
                key: i,
                style: {
                    alignSelf: getVerticalAlignmentStyle(child.props.alignment),
                    ...child.props.style
                }
            });
        })
    }</div>)
}
