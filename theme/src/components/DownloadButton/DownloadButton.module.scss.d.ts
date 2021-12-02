export type Styles = {
  downloadButton: string;
  menu: string;
  open: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
