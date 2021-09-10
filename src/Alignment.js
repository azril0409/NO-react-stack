import HorizontalAlignment from "./HorizontalAlignment";
import VerticalAlignment from "./VerticalAlignment";

const Alignment={
    BOTTOM: {horizontal:HorizontalAlignment.CENTER, vertical:VerticalAlignment.BOTTOM},
    BOTTOM_LEFT: {horizontal:HorizontalAlignment.LEFT, vertical:VerticalAlignment.BOTTOM},
    BOTTOM_RIGHT: {horizontal:HorizontalAlignment.RIGHT, vertical:VerticalAlignment.BOTTOM},
    LEFT: {horizontal:HorizontalAlignment.LEFT, vertical:VerticalAlignment.CENTER},
    RIGHT: {horizontal:HorizontalAlignment.RIGHT, vertical:VerticalAlignment.CENTER},
    TOP: {horizontal:HorizontalAlignment.CENTER, vertical:VerticalAlignment.TOP},
    TOP_LEFT: {horizontal:HorizontalAlignment.LEFT, vertical:VerticalAlignment.TOP},
    TOP_RIGHT: {horizontal:HorizontalAlignment.RIGHT, vertical:VerticalAlignment.TOP},
}
export default Alignment
