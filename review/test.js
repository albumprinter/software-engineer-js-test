import { ProductComponent } from "./productList";

describe("Product", () => {
  it("ProductComponent", () => {
    const productComponent = new ProductComponent();
    productComponent.getPhotobook = function () {
      return { articleType: "photobook", PAP: 350, disabled: false }
    }

    const photobook = productComponent.getProduct("photobook")
    expect(photobook).toEqual({ articleType: "photobook", PAP: 350, disabled: false })
  })
})