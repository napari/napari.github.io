export type Styles = {
  dayList: string;
  popup: string;
  popupMetadata: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
