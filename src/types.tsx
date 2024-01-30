import { ReactNode } from "react";

export interface BottomSheetProps {
  heightValue?: number;
  children?: ReactNode | undefined;
}

export interface BottomSheetMethods {
  show: () => void;
  hide: () => void;
}
