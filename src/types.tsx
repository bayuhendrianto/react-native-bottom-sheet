import { ReactNode } from "react";
import { TextStyle } from "react-native";

export interface BottomSheetProps {
  heightValue?: number;
  isCloseIcon?: boolean;
  closeIcon?: ReactNode;
  closeIconColor?: string;
  iconPosition?: "left" | "right";
  isTitle?: boolean;
  title?: string;
  titleStyle?: TextStyle;
  children?: ReactNode | undefined;
}

export interface BottomSheetMethods {
  show: () => void;
  hide: () => void;
}
