import React from "react";

export const isChildrenHaveSpacer = (children) => {
    if (!children) return false
    return React.Children
        .map(children, child => childrenIsSpacer(child) ? 1 : undefined)
        .find((checked) => checked)
}

export const childrenIsSpacer = (child) => {
    return child?.type?.toString()?.search("Spacer") > 0
}

export const getHorizontalAlignmentStyle = (alignment) => {
    switch (alignment) {
        case 'left':
        case 'flex-start':
            return 'flex-start';
        case 'right':
        case 'flex-end':
            return 'flex-end';
        case 'center':
            return 'center';
        case null:
        case undefined:
        default:
            return undefined;
    }
}

export const getVerticalAlignmentStyle = (alignment) => {
    switch (alignment) {
        case 'top':
        case 'flex-start':
            return 'flex-start';
        case 'bottom':
        case 'flex-end':
            return 'flex-end';
        case 'center':
            return 'center';
        case null:
        case undefined:
        default:
            return undefined;
    }
}
