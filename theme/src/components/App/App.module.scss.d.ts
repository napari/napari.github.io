export type Styles = {
  content: string;
  search: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
