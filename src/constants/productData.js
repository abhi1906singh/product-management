export const categories = [
    { id: 1, value: 'electronics', label: 'Electronics' },
    { id: 2, value: 'clothing', label: 'Clothing' },
    { id: 3, value: 'food_beverages', label: 'Food & Beverages' },
    { id: 4, value: 'home_garden', label: 'Home & Garden' },
    { id: 5, value: 'beauty_personal', label: 'Beauty & Personal Care' },
    { id: 6, value: 'other', label: 'Other' }
  ]
  
  export const subCategoriesMap = {
    electronics: [
      { id: 101, value: 'computers', label: 'Computers & Laptops' },
      { id: 102, value: 'phones', label: 'Phones & Tablets' },
      { id: 103, value: 'audio', label: 'Audio & Headphones' },
      { id: 104, value: 'tv_video', label: 'TV & Video' },
      { id: 105, value: 'cameras', label: 'Cameras & Photography' },
      { id: 106, value: 'wearables', label: 'Wearable Technology' }
    ],
    clothing: [
      { id: 201, value: 'tops', label: 'Tops & T-shirts' },
      { id: 202, value: 'bottoms', label: 'Bottoms' },
      { id: 203, value: 'footwear', label: 'Footwear' },
      { id: 204, value: 'outerwear', label: 'Outerwear' },
      { id: 205, value: 'accessories', label: 'Accessories' }
    ],
    food_beverages: [
      { id: 301, value: 'snacks', label: 'Snacks & Confectionery' },
      { id: 302, value: 'beverages', label: 'Beverages' },
      { id: 303, value: 'baking', label: 'Baking & Cooking' },
      { id: 304, value: 'organic', label: 'Organic & Health Foods' }
    ],
    home_garden: [
      { id: 401, value: 'furniture', label: 'Furniture' },
      { id: 402, value: 'decor', label: 'Home Decor' },
      { id: 403, value: 'kitchen', label: 'Kitchen & Dining' },
      { id: 404, value: 'garden', label: 'Garden & Outdoor' },
      { id: 405, value: 'bedding', label: 'Bedding & Bath' }
    ],
    beauty_personal: [
      { id: 501, value: 'skincare', label: 'Skincare' },
      { id: 502, value: 'makeup', label: 'Makeup' },
      { id: 503, value: 'haircare', label: 'Hair Care' },
      { id: 504, value: 'fragrance', label: 'Fragrance' },
      { id: 505, value: 'personal_care', label: 'Personal Care' }
    ],
    other: [
      { id: 999, value: 'custom', label: 'Custom Category' }
    ]
  }
  
  export const productTypesMap = {
    computers: [
      { id: 1001, value: 'laptop', label: 'Laptop' },
      { id: 1002, value: 'desktop', label: 'Desktop' },
      { id: 1003, value: 'tablet', label: 'Tablet' }
    ],
    phones: [
      { id: 1004, value: 'smartphone', label: 'Smartphone' },
      { id: 1005, value: 'tablet', label: 'Tablet' },
      { id: 1006, value: 'accessory', label: 'Phone Accessory' }
    ],
    audio: [
      { id: 1007, value: 'headphones', label: 'Headphones' },
      { id: 1008, value: 'speakers', label: 'Speakers' },
      { id: 1009, value: 'earbuds', label: 'Earbuds' }
    ],
    tv_video: [
      { id: 1010, value: 'tv', label: 'Television' },
      { id: 1011, value: 'projector', label: 'Projector' },
      { id: 1012, value: 'streaming', label: 'Streaming Device' }
    ],
    cameras: [
      { id: 1013, value: 'dslr', label: 'DSLR Camera' },
      { id: 1014, value: 'mirrorless', label: 'Mirrorless Camera' },
      { id: 1015, value: 'action', label: 'Action Camera' }
    ],
    wearables: [
      { id: 1016, value: 'smartwatch', label: 'Smartwatch' },
      { id: 1017, value: 'fitness', label: 'Fitness Tracker' },
      { id: 1018, value: 'vr', label: 'VR Headset' }
    ],
    tops: [
      { id: 2001, value: 'tshirt', label: 'T-Shirt' },
      { id: 2002, value: 'shirt', label: 'Shirt' },
      { id: 2003, value: 'sweater', label: 'Sweater' },
      { id: 2004, value: 'blouse', label: 'Blouse' }
    ],
    bottoms: [
      { id: 2005, value: 'jeans', label: 'Jeans' },
      { id: 2006, value: 'pants', label: 'Pants' },
      { id: 2007, value: 'shorts', label: 'Shorts' },
      { id: 2008, value: 'skirt', label: 'Skirt' }
    ],
    footwear: [
      { id: 2009, value: 'sneakers', label: 'Sneakers' },
      { id: 2010, value: 'boots', label: 'Boots' },
      { id: 2011, value: 'sandals', label: 'Sandals' },
      { id: 2012, value: 'formal', label: 'Formal Shoes' }
    ],
    outerwear: [
      { id: 2013, value: 'jacket', label: 'Jacket' },
      { id: 2014, value: 'coat', label: 'Coat' },
      { id: 2015, value: 'hoodie', label: 'Hoodie' }
    ],
    accessories: [
      { id: 2016, value: 'hat', label: 'Hat' },
      { id: 2017, value: 'scarf', label: 'Scarf' },
      { id: 2018, value: 'gloves', label: 'Gloves' },
      { id: 2019, value: 'belt', label: 'Belt' }
    ],
    custom: [
      { id: 9999, value: 'custom', label: 'Custom Type' }
    ]
  }
  
  export const availableColors = [
    { id: 1, value: 'black', label: 'Black' },
    { id: 2, value: 'white', label: 'White' },
    { id: 3, value: 'red', label: 'Red' },
    { id: 4, value: 'blue', label: 'Blue' },
    { id: 5, value: 'green', label: 'Green' },
    { id: 6, value: 'yellow', label: 'Yellow' },
    { id: 7, value: 'purple', label: 'Purple' },
    { id: 8, value: 'pink', label: 'Pink' },
    { id: 9, value: 'gray', label: 'Gray' },
    { id: 10, value: 'brown', label: 'Brown' }
  ]
  
  export const sizesMap = {
    tops: [
      { id: 1, value: 'xs', label: 'XS' },
      { id: 2, value: 's', label: 'S' },
      { id: 3, value: 'm', label: 'M' },
      { id: 4, value: 'l', label: 'L' },
      { id: 5, value: 'xl', label: 'XL' },
      { id: 6, value: 'xxl', label: 'XXL' }
    ],
    bottoms: [
      { id: 7, value: '28', label: '28' },
      { id: 8, value: '30', label: '30' },
      { id: 9, value: '32', label: '32' },
      { id: 10, value: '34', label: '34' },
      { id: 11, value: '36', label: '36' },
      { id: 12, value: '38', label: '38' },
      { id: 13, value: '40', label: '40' }
    ],
    footwear: [
      { id: 14, value: '6', label: '6' },
      { id: 15, value: '7', label: '7' },
      { id: 16, value: '8', label: '8' },
      { id: 17, value: '9', label: '9' },
      { id: 18, value: '10', label: '10' },
      { id: 19, value: '11', label: '11' },
      { id: 20, value: '12', label: '12' }
    ]
  }
  
  export const discountTypes = [
    { id: 1, value: 'none', label: 'No Discount' },
    { id: 2, value: 'percentage', label: 'Percentage' },
    { id: 3, value: 'fixed', label: 'Fixed Amount' }
  ]
  
  export const shippingOptions = [
    { id: 1, value: 'standard', label: 'Standard', default: true},
    { id: 2, value: 'express', label: 'Express' },
    { id: 3, value: 'next_day', label: 'Next Day' }
  ]
  
  export const publicationStatuses = [
    { id: 1, value: 'draft', label: 'Draft' },
    { id: 2, value: 'published', label: 'Published' },
    { id: 3, value: 'scheduled', label: 'Scheduled' }
  ]
  export const currencies = [
    { id: 1, value: 'usd', label: 'US Dollar (USD)' },
    { id: 2, value: 'eur', label: 'Euro (EUR)' },
    { id: 3, value: 'gbp', label: 'British Pound (GBP)' },
    { id: 4, value: 'jpy', label: 'Japanese Yen (JPY)' },
    { id: 5, value: 'aud', label: 'Australian Dollar (AUD)' },
    { id: 6, value: 'cad', label: 'Canadian Dollar (CAD)' }
  ]
  export const discountType=[
    {id: 1, value:"none", label:"No Discount" },
    {id: 2, value:"Percentage", label:"Percentage" },
    {id: 3, value:"Fixed Amount", label:"Fixed Amount" }
  ]
  export const materialOptions = [
    { id: 1, value: 'cotton', label: 'Cotton' },
    { id: 2, value: 'polyester', label: 'Polyester' },
    { id: 3, value: 'wood', label: 'Wood' },
    { id: 4, value: 'metal', label: 'Metal' }
  ];
  