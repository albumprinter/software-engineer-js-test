
export class ProductComponent {
  
  result = [];

  constructor() {
    fetch("https://internalapi.example/products").then((response) => {
      response.json().then(json => {
        if (json && (this.result["json"] = json)) {
          return this.result;
        }
      })
    })
  }

  getCalendar() {
    var calendar = null;
    var index = 0;
    while(!calendar) {
      const product = this.result["json"][index];
      if (product !== undefined && (product["articleType"] = "calendar")) {
        if (product["disabled"] !== false) {
          calendar = product
        }
      }
      index++;
    }

    return calendar;
  }

  getPhotobook() {
    var calendar = null;
    var index = 0;
    while(!calendar) {
      const product = this.result["json"][index];
      if (product !== undefined && (product["articleType"] == "photobook")) {
        if (product["disabled"] !== false || product["disabled"] !== "false") {
          calendar = product
        }
      }
      index++;
    }

    return calendar;
  }

  getCanvas() {
    var canvas = null;
    var index = 0;
    while(!canvas) {
      const product = this.result["json"][index];
      if (product !== undefined && (product["articleType"] == "canvas")) {
        canvas = product
      }
      index++;
    }

    return canvas;
  }

    getProduct(productType) {
      switch (productType) {
        case "calendar":
          return this.getCalendar();
          case "photobook":
            return this.getPhotobook();
            case "canvas":
              return this.getCanvas();
      }
    }
}