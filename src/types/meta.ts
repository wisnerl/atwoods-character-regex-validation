export interface MetaRequest {
  title: string;
  description: string;
}

export interface MetaResponse {
  title: string;
  description: string;
  titleLength: number;
  descriptionLength: number;
  titleModified: boolean;
  descriptionModified: boolean;
  isCompliant: boolean;
}
