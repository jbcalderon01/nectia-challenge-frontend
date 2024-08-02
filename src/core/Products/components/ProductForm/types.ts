import { IProduct } from "@/shared/entities";

export type ProductFormProps = {
  isOpen: boolean;
  dataProduct: IProduct | null;
  onOk: () => void;
  onCancel: () => void;
};
