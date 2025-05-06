export interface ISong {
  id: number;
  title: string;
  defaultKey: string;
  songData: {
    key: string;
    pdfLink: string;
  }[];
}
