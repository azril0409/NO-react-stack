import React from 'react';
import {isChildrenHaveSpacer, getHorizontalAlignmentStyle} from "./units";

export default ({className, alignment, style, children,...rest}) => {
    const height = isChildrenHaveSpacer(children) ? '100%' : undefined
    return(<div
        {...rest}
        className={className}
        style={{
            display: 'flex',
            boxSizing: 'border-box',
            flexDirection: 'column',
            alignContent: 'stretch',
            alignItems: getHorizontalAlignmentStyle(alignment),
            height: height,
            ...style
        }}
    >{
        React.Children.map(children, (child, i) => {
            return React.cloneElement(child, {
                key: i,
                style: {
                    alignSelf: getHorizontalAlignmentStyle(child.props.alignment),
                    ...child.props.style
                }
            });
        })
    }</div>)
}
