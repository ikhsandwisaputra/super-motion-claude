---
source: https://paperjs.org/tutorials/images/working-with-rasters
title: "Paper.js — Working with Rasters"
fetched: 2026-10-28
---

# Working with Rasters

In Paper.js we refer to an image as a [Raster](https://paperjs.org/reference/raster). Rasters can be moved around and transformed in your project, just like any other item.

## Placing Images in your Project

To add an image to your project, embed the image in your page using a normal html image tag and give it an id. Then create the raster using [new Raster(id)](https://paperjs.org/reference/raster#raster-id) and pass the id to it.

#### Please note:

Images need to already be loaded when they are added to a Paper.js project. Working with local images or images hosted on other websites may throw security exceptions on certain browsers.

For our examples we will be using an image of the Mona Lisa, which is located at the bottom of this page and has mona as its id.

Source

![](https://paperjs.org/tutorials/images/working-with-rasters/mona.jpg)

## Rasterizing Items

You can rasterize any [Item](https://paperjs.org/reference/item) in your document to a [Raster](https://paperjs.org/reference/raster) item, by calling [item.rasterize()](https://paperjs.org/reference/item#rasterize). The item itself is not removed automatically after rasterizing, so if you don't want the item around anymore, you have to call [item.remove()](https://paperjs.org/reference/item#remove) on it yourself.

Source

By default [item.rasterize()](https://paperjs.org/reference/item#rasterize) rasterizes the item at 72 dpi. To rasterize at a different dpi, just pass the dpi as a number the rasterize function. For example to rasterize an item at 300 dpi, you would write: item.rasterize(300).
