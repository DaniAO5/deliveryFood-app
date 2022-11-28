import { facebook, google } from "../Firebase/firebaseConfig";

export const inputList = [
  {
    label: "Name",
    type: "text",
    name: "name",
  },
  {
    label: "Category",
    type: "select",
    name: "category",
  },
  {
    label: "Description",
    type: "textarea",
    name: "description",
  },
  {
    label: "Time",
    type: "text",
    name: "time",
  },
  
  {
    label: "Image",
    type: "file",
    name: "image",
  },
];

export const category = [
  {
    label: "Fast Food",
   
  },
  {
    label: "Pizza",
    
  },
  {
    label: "Coffe",
    
  },
  {
    label: "Bakery",
    
  },
];

export const loginProvider = [
  {
    name: "google",
    image: "https://res.cloudinary.com/dlq9u0pml/image/upload/v1669134684/5847f9cbcef1014c0b5e48c8_rpk3nc.png",
    provider: google,
  },
  {
    name: "facebook",
    image: "https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png",
    provider: facebook,
  },
];
