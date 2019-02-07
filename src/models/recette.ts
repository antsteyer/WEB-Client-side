export default interface Recipe {
  _id: string;
  name: string;
  image: string;
  description: string;
  preparation: string;
  ingredients: string[];
  comments: string[];
}
