## Requirements

Implement a component that handles retrieving a product list form internal api.

### technical breakdown
* the api returns a lit of all product objects
* the api output almost never changes
* example of api response

```
[
  { articleType: "calendar", PAP: 400, disabled: false },
  { articleType: "calendar", PAP: 444, disabled: false },
  { articleType: "calendar", PAP: 450, disabled: true },
  { articleType: "photobook", PAP: 350, disabled: false },
  { articleType: "photobook", PAP: 400, disabled: false },
  { articleType: "canvas", PAP: 800, disabled: false },
  { articleType: "canvas", PAP: 850, disabled: true },
]
```

### requirements
* a component should have minimum api requests as possible. Since api response is static, it is possible to cache it
* a component should be able to handle api error responses
* a consumer should be able to pass an argument to get list of specific product
* a component should return only not disabled products in the list
* all tests should pass
