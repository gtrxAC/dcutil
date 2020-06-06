Last updated: 2020-06-06

* `avatar [@user | userid | username]`
If user is not defined, it defaults to the command author. Sends the profile picture of the specified user.

* `border <top> [left] [bottom] [right]`
If left is not specified, it defaults to top. If bottom is not specified, it defaults to top. If right is not specified, it defaults to left. Draws a border of the specified width on each side, filled with your current color. Opposite of crop.

* `circle <x> <y> <width> [height] [strokeWidth]`
If height is not specified, it defaults to width. Draws a circle/ellipse starting at (x, y) with diameter (width × height). If strokeWidth is specified, the circle is not filled and the specified stroke width is used. Otherwise it's filled with your current color.

* `color [color]`
If color is not specified, your current color is shown. Sets your current color to the specified [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).

* `crop <top> [left] [bottom] [right]`
If left is not specified, it defaults to top. If bottom is not specified, it defaults to top. If right is not specified, it defaults to left. Crops away the specified amount of pixels on each side of the image. Opposite of border.

* `jpeg [quality 0-100]`
If quality is not specified, it defaults to 50. Converts the previous image to JPEG with the specified quality (0 = terrible, 100 = near perfect).

* `line <ax> <ay> <bx> <by> [strokeWidth]`
If strokeWidth is not specified, it defaults to 1. Draws a straight line of the specified stroke width, starting from (ax, ay) and ending at (bx, by).

* `metrics [rulerPrecision]`
If rulerPrecision is not specified, it defaults to 50. Sends a temporary image with the coordinates of the middle pixel marked and rulers every rulerPrecision pixels on the top and left side. This image will be ignored by future commands.

* `new [width] [height]`
If width is not specified, it defaults to 100. If height is not specified, it defaults to width. Creates a new (width × height) image filled with your current color.

* `paste <x> <y> [width] [height] [noSmoothing]`
If width is not specified, it defaults to the attached image's width. If height is not specified, it defaults to the attached image's height. Pastes the attached image over the previous image, scaled to (width × height) and starting at (x, y). If noSmoothing is specified, the pasted image will not be smoothed and will retain sharp pixels.

* `rect <x> <y> [width] [height] [strokeWidth]`
If width is not specified, it defaults to 1. If height is not specified, it defaults to 1. Draws a (width × height) pixel rectangle starting at (x, y) with your current color. If strokeWidth is specified, the rectangle is not filled and the specified stroke width is used. Otherwise it's filled with your current color.

* `scale <width> [height] [noSmoothing]`
If height is not specified, it defaults to width. Scales the previous image to (width × height) pixels. If noSmoothing is specified, the scaled image will not be smoothed and will retain sharp pixels.

* `text <x> <y> <size> [font]`
Available fonts: sans-serif, serif, monospace. If font is not specified, it defaults to sans-serif. Asks interactively for the text to be written. If no response is given in 30 seconds or "cancel" is sent, the command will exit. Draws the given text starting at (x, y) with the given font size and font, filled with your current color.

* `undo`
Undoes the last change to the image by deleting the previous image.