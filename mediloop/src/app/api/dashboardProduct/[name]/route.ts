import ProductModel from "@/db/models/ProductModels";

export async function GET(
    request: Request,
    {params}: {params: {name: string}}
){
    const product = await ProductModel.getByName(params.name);
    return Response.json(product);
}