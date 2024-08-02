import { IUser } from "@/shared/entities";

export type UserFormProps = {
  isOpen: boolean;
  dataUser: IUser | null;
  onOk: () => void;
  onCancel: () => void;
};
