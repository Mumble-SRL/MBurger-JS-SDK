# 🍔 MBurger JavaScript SDK 🍔

This package provides a simple interface between your Laravel Project and the MBurger CMS, helping you to retrieve data easily.

## 1.0 - Installation

This package can be installed via the most common Javascript package managers

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

    const instance = mburger.createClient({
        api_key: '1234567890'
    });


### 3.2 - Retrieve a single Section

| Specification | Data Type | Description |
|---|---|---|
| section_id | Integer | ID of the requested Section |
| original_media | Boolean | Indicate if you want the original media or the converted ones |
| use_slug | Boolean | Declare if you want to use the section slug instead of the ID to retrieve data |
| locale | String | Country code of the required locale |


#### 3.2.1 - Sample code

     // Import MBurger SDK
     const mburger = require('mburger');
     
    // Init the connection
    const instance = mburger.createClient({
        api_key: '1234567890'
    });

    // Get a specific block
    instance.getSection({
        section_id: 10088,
        locale: 'it',
        original_media: false
    }).then(result => console.log(result));

### 3.3 - Retrieve a single Block

| Specification | Data Type | Description |
|---|---|---|
| block_id | Integer | ID of the requested Block |
| force_locale_fallback | Boolean | Set the parameters force_locale_fallback as indicated in the documentation |
| locale | String | Country code of the required locale |
| original_media | Boolean | Indicate if you want the original media or the converted ones |
| params | Object | The parameters you want to pass to the MBurger params variable. Check our API Reference for more informations |
| order_asc | Boolean | Declare if you want the data in ascendent or descendent order |

#### 3.3.1 - Sample code

     // Import MBurger SDK
     const mburger = require('mburger');
     
    // Init the connection
    const instance = mburger.createClient({
        api_key: '1234567890'
    });

    // Retrieve a specific block
    instance.getBlock({
        block_id: 884,
        locale: 'it',
        original_media: false
    }).then(result => console.log(result));

### 3.4 - Retrieve multiple Blocks

| Specification | Data Type | Description |
|---|---|---|
| block_ids | Array | ID of the requested Blocks |
| filters | Object | The filters you want to pass to the MBurger params variable. Check our API Reference for more informations |
| order_asc | Boolean | Declare if you want the data in ascendent or descendent order |

#### 3.4.1 - Sample code

    // Import MBurger SDK
    const mburger = require('mburger');
    
    // Init the connection
    const instance = mburger.createClient({
        api_key: '1234567890'
    });
    
    // Retrieve data from the block
    instance.getBlocks({
        block_ids: [884, 886],
        locale: 'it'
    }).then(result => console.log(result));


## 4.0 - Support & Feedback

For support regarding MBurger, the SDK or any kind of feedback please feel free to contact us via  [support.mburger.cloud](http://support.mburger.cloud/)

## 5.0 - License
The MIT License (MIT). Please see [License File](./LICENSE) for more information.
