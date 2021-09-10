import React, {useEffect, useRef, useState} from 'react';
import HorizontalAlignment from "./HorizontalAlignment";
import VerticalAlignment from "./VerticalAlignment";

export default ({className, alignment, style, children, ...rest}) => {
    const horizontal = alignment?.horizontal ? alignment?.horizontal : 'center'
    const vertical = alignment?.vertical ? alignment?.vertical: 'center'
    console.log(`horizontal: ${horizontal}, vertical: ${vertical}`)
    const childRef = []
    const [size, setSize] = useState({width: undefined, height: undefined});
    useEffect(() => {
        let width = 0
        let height = 0
        childRef.map((ref, index) => {
            width = width > ref.current.offsetWidth ? width : ref.current.offsetWidth
            height = height > ref.current.offsetHeight ? width : ref.current.offsetHeight
        })
        setSize({width: width, height: height})
    },[size.height,size.width])
    return (<div
        {...rest}
        className={className}
        style={{
            display: 'flex',
            boxSizing: 'border-box',
            position: 'relative',
            alignContent: 'stretch',
            height: size.height,
            width: size.width,
            ...style
        }}
    >{
        React.Children.map(children, (child, i) => {
            const ref = useRef()
            childRef[i] = ref
            let childHorizontal = child.props.alignment?.horizontal ? child.props.alignment?.horizontal : horizontal
            let childVertical = child.props.alignment?.vertical ? child.props.alignment?.vertical : vertical
            let top = undefined
            let left = undefined
            if (size.width != undefined && size.height != undefined && ref.current) {
                if(childHorizontal === HorizontalAlignment.LEFT) {
                    left = 0;
                }else if(childHorizontal === HorizontalAlignment.RIGHT){
                    left = size.width - ref.current.offsetWidth
                }else{
                    left = (size.width - ref.current.offsetWidth) / 2
                }
                if(childVertical === VerticalAlignment.TOP) {
                    top = 0
                }else if(childVertical === VerticalAlignment.BOTTOM){
                    top = size.width - ref.current.offsetHeight
                }else{
                    top = (size.width - ref.current.offsetHeight) / 2
                }
            }
            const element = React.cloneElement(child, {
                key: i,
                style: {
                    position: 'absolute',
                    top: top,
                    left: left,
                    zIndex: i + 1,
                    ...child.props.style
                },
                ref: ref
            });
            return element;
        })
    }</div>)
}
