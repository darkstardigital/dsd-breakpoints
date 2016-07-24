# dsdBreakPoints

`dsdBreakPoints` Adds classes to elements based on their container's width whenever the screen size changes.

```
$('.responsive-element').dsdBreakPoints({
    breakPoints: {
        0: 'col-1',
        400: 'col-2',
        600: 'col-3',
        800: 'col-4',
        1000: 'col-5'
    }   
});
```

All matching elements will receive a single break point class based on the width of it's container. The class from the largest break point that is smaller than or equal to the width of the container will be applied to each matched element. All other classes associated with other break points will be removed. 

To react to a different event (such as the [jQuery Mobile](https://jquerymobile.com/) `throttledresize` event), change the `resizeEvent` option either in `$.fn.dsdBreakPoints.default_options` or when you call the plugin.

You can trigger the `resize` event on the element itself at any time to recalculate it's break point class.