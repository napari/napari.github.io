export type Styles = {
  dayList: string;
  fullWidth: string;
  popup: string;
  popupMetadata: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
