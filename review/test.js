import { ProductComponent } from "./productList";

describe("Product", () => {
  it("ProductComponent", () => {
    const productComponent = new ProductComponent();
    const photobookList = [
      { articleType: "photobook", PAP: 350, disabled: false },
      { articleType: "photobook", PAP: 316, disabled: false },
      { articleType: "photobook", PAP: 357, disabled: false }
    ]
    productComponent.getPhotobook = () => photobookList;

    const photobook = productComponent.getProduct("photobook")
    expect(photobook).toEqual(photobookList)
  })
})