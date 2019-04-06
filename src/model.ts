import { ArrayMinSize, IsInt, IsNotEmpty, IsNumber, Min, validate, ValidateNested } from "class-validator";

export class Model {
  public static async getModel(model, body, query?): Promise<Model> {
    try {
      const m2 = new model(body, query);
      const errors = await validate(m2);
      if (errors.length) {
        throw errors;
      }
      return m2;
    } catch (error) {
      throw error;
    }
  }
}

export class ContentMerchant {
  @IsInt()
  @Min(1)
  public merchantId: number;
  @ArrayMinSize(1)
  public contentProducts: number[];

  // constructor(body) {
  //   this.merchantId = body.merchantId;
  //   this.contentProducts = body.contentProducts;
  // }
}
export class Merchant {
  @IsInt()
  @Min(1)
  public merchantId: number;
  @IsNumber()
  public shippingAmount: number;
  @IsNotEmpty()
  public magentoProducts: number[];
  public contentProducts: number[];
}

export class Merchants extends Model {
  @ArrayMinSize(1)
  @ValidateNested()
  public merchants: Merchant[];

  constructor(body: any) {
    super();
    const merchantArr = [];
    if (body.merchants && body.merchants.length) {
      body.merchants.forEach((mer) => {
        const merchant = new Merchant();
        merchant.merchantId = mer.merchantId;
        merchant.shippingAmount = mer.shippingAmount;
        merchant.magentoProducts = mer.magentoProducts;
        merchant.contentProducts = mer.contentProducts;
        merchantArr.push(merchant);
      });
    }
    this.merchants = merchantArr;
  }
}
