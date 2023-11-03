import { ApiResultModel } from "@/config";
import { axiosInstance } from "..";
import { ProductType } from "@/components/table-example";

const getAll = async (): Promise<ApiResultModel<ProductType[]>> => {
  const response = await axiosInstance.get("api/product");
  return response.data;
};

export const ProductApi = {
  getAll,
};
