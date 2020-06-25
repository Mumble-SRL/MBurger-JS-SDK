# 🍔 MBurger JavaScript SDK 🍔

This package provides a simple interface between your Laravel Project and the MBurger CMS, helping you to retrieve data easily.

## 1.0 - Installation

This package can be installed via Composer:

### 1.1 - NPM 

    npm i mburger --save

### 1.1 - Yarn 

    yarn add mburger --save

## 2.0 - Configuration

There is no need for configurations after installing the SDK.

## 3.0 - Methods reference 

In the current version of our JS SDK you can find only a few methods that you can implement in your code but they're so powerful that enable you to do pretty anything with MBurger CMS.

### 3.1 - Initiate the connection

Init the connection to MBurger with your API Key.

     const instance = mburger.createClient('a1b2c3d4');


### 3.2 - Retrieve a single Section

    async function getSection(section_id, original_media = false, cache_seconds = false, use_slug = false) {

| Specification | Data Type | Description |
|---|---|---|
| section_id | Integer | ID of the requested Section |
| original_media | Boolean | Indicate if you want the original media or the converted ones |
| cache_seconds | Integer | Number of seconds you want to keep the API response stored in your local cache |
| use_slug | Boolean | Declare if you want to use the section slug instead of the ID to retrieve data |

#### 3.2.1 - Sample code

     // Import MBurger SDK
     const mburger = require('mburger');
     
     // Init the connection
     const instance = mburger.createClient('a1b2c3d4a1b2c3d4a1b2c3d4a1b2c3d4a1b2c3d4');
     
     // Retrieve data from the section 1234
     instance.getSection(1234).then(result => console.log(result));

### 3.3 - Retrieve a single Block

    async function getBlock(block_id, original_media = false, params = {}, order_asc = true, cache_seconds = false) {

| Specification | Data Type | Description |
|---|---|---|
| block_id | Integer | ID of the requested Block |
| original_media | Boolean | Indicate if you want the original media or the converted ones |
| params | Object | The parameters you want to pass to the MBurger params variable. Check our API Reference for more informations |
| order_asc | Boolean | Declare if you want the data in ascendent or descendent order |
| cache_seconds | Integer | Number of seconds you want to keep the API response stored in your local cache |

#### 3.3.1 - Sample code

    // Import MBurger SDK
    const mburger = require('mburger');
    
    // Init the connection
    let instance = mburger.createClient('a1b2c3d4a1b2c3d4a1b2c3d4a1b2c3d4a1b2c3d4');
    
    // Retrieve data from the block
    instance.getBlock(798).then(result => console.log(result));

### 3.4 - Retrieve multiple Blocks

    async function getBlocks(block_ids, original_media = false, params = {}, filters = {}, order_asc = true, cache_seconds = false) {

| Specification | Data Type | Description |
|---|---|---|
| block_ids | Array | ID of the requested Blocks |
| original_media | Boolean | Indicate if you want the original media or the converted ones |
| params | Object | The parameters you want to pass to the MBurger params variable. Check our API Reference for more informations |
| filters | Object | The filters you want to pass to the MBurger params variable. Check our API Reference for more informations |
| order_asc | Boolean | Declare if you want the data in ascendent or descendent order |
| cache_seconds | Integer | Number of seconds you want to keep the API response stored in your local cache |

#### 3.4.1 - Sample code

    // Import MBurger SDK
    const mburger = require('mburger');
    
    // Init the connection
    let instance = mburger.createClient('a1b2c3d4a1b2c3d4a1b2c3d4a1b2c3d4a1b2c3d4');
    
    // Retrieve data from the block
    instance.getBlocks([798, 799]).then(result => console.log(result));


## 4.0 - Support & Feedback

For support regarding MBurger, the SDK or any kind of feedback please feel free to contact us via  [support.mburger.cloud](http://support.mburger.cloud/)

## 5.0 - License
The MIT License (MIT). Please see [License File](./LICENSE) for more information.